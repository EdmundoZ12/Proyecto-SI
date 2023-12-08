const { json } = require("express");
const pool = require("../db");

const CreateNota_Entrada = async (req, res) => {
  try {
    const { id_usuario, id_proveedor, productos } = req.body;

    // Validar la existencia de datos obligatorios
    if (!id_usuario || !id_proveedor || !productos) {
      return res
        .status(400)
        .json({ error: "Faltan datos obligatorios en la solicitud." });
    }

    // Insertar nueva Nota de Entrada
    const nuevaNota = await pool.query(
      "INSERT INTO Nota_de_Entrada (id_usuario, id_proveedor,MONTO) VALUES ($1, $2,0) RETURNING id",
      [id_usuario, id_proveedor]
    );

    const id_new = nuevaNota.rows[0].id;

    // Insertar detalles de productos asociados a la Nota de Entrada
    for (const producto of productos) {
      await pool.query(
        "INSERT INTO Detalle_Entrada (Id_Nota_Entrada, Cod_Producto, Cantidad,Precio,FECHA,MONTO_PRODUCTO) VALUES ($1, $2, $3,$4,CURRENT_DATE,0)",
        [id_new, producto.cod_producto, producto.cantidad, producto.precio]
      );
    }

    return res
      .status(201)
      .json({ success: "Nota de Entrada creada exitosamente." });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const Notas_Entrada = async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT
    PERSONA.NOMBRE,
    PROVEEDOR.EMPRESA,
    NOTA_DE_ENTRADA.MONTO,
    (
      SELECT
        json_agg(json_build_object(
          'fecha', DETALLE_ENTRADA.FECHA,
          'cod_producto', PRODUCTO.COD,
          'nombre', PRODUCTO.NOMBRE,
          'cantidad', DETALLE_ENTRADA.CANTIDAD,
          'precio', DETALLE_ENTRADA.PRECIO,
          'monto_producto', DETALLE_ENTRADA.MONTO_PRODUCTO
          
        ))
      FROM
        PRODUCTO,
        DETALLE_ENTRADA
      WHERE
        PRODUCTO.COD = DETALLE_ENTRADA.COD_PRODUCTO
        AND DETALLE_ENTRADA.ID_NOTA_ENTRADA = NOTA_DE_ENTRADA.ID
    ) AS productos
  FROM
    PERSONA,
    USUARIO,
    NOTA_DE_ENTRADA,
    PROVEEDOR
  WHERE
    PERSONA.ID = USUARIO.ID_PERSONA
    AND NOTA_DE_ENTRADA.ID_USUARIO = USUARIO.ID_PERSONA
    AND NOTA_DE_ENTRADA.ID_PROVEEDOR = PROVEEDOR.ID;
          `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error en ObtenerInformacion:", error);
    res.status(500).json({ message: "Error en la solicitud." });
  }
};

module.exports = {
  CreateNota_Entrada,
  Notas_Entrada,
};
