const { json } = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require("../config");
const Create_Factura = async (req, res) => {
  try {
    const { id_usuario, id_cliente, productos } = req.body;

    // Validar la existencia de datos obligatorios
    if (!id_usuario || !id_cliente || !productos) {
      return res
        .status(400)
        .json({ error: "Faltan datos obligatorios en la solicitud." });
    }

    // Insertar nueva Nota de Entrada
    const nuevaNota = await pool.query(
      "INSERT INTO FACTURA (monto,id_usuario,id_cliente) VALUES (0,$1,$2) RETURNING Nit",
      [id_usuario, id_cliente]
    );

    const nit_new = nuevaNota.rows[0].nit;

    // Insertar detalles de productos asociados a la Nota de Entrada
    for (const producto of productos) {
      await pool.query(
        "INSERT INTO Detalle_Factura (Cod_Producto,Nit_Factura, Cantidad,Precio,FECHA,MONTO_PRODUCTO) VALUES ($1, $2, $3,$4,CURRENT_DATE,0)",
        [producto.cod_producto, nit_new, producto.cantidad, producto.precio]
      );
    }

     // bitacora
     const fechaActual = new Date();
     const fechaFormateada = fechaActual.toISOString();
     const { token } = req.cookies;
     const accion = `Creo la Factura con NIT = ${nit_new}`;
 
     if (token) {
         console.log("entro");
         const decodedToken = jwt.verify(token, TOKEN_SECRET);
         await pool.query("INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)", [fechaFormateada, decodedToken.id, accion]);
     }
     // bitacora

    return res.status(201).json({ success: "Factura creada exitosamente." });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const getFacturas = async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT
    (SELECT Nombre FROM Persona WHERE Id = Factura.Id_Usuario) AS nombreusuario,
    (SELECT Nombre FROM Persona WHERE Id = Factura.Id_Cliente) AS nombrecliente,
    CAST(Factura.MONTO AS numeric) AS monto,
    (
        SELECT 
            JSON_AGG(JSON_BUILD_OBJECT(
                'cod_producto', Detalle_Factura.Cod_Producto,
                'nombre', Producto.Nombre,
                'cantidad', Detalle_Factura.Cantidad,
                'precio', Detalle_Factura.Precio,
                'fecha', Detalle_Factura.Fecha,
                'monto_producto', Detalle_Factura.Monto_Producto
            ))
        FROM Detalle_Factura
        JOIN Producto ON Producto.Cod = Detalle_Factura.Cod_Producto
        WHERE Detalle_Factura.Nit_Factura = Factura.Nit
    ) AS Productos
FROM Factura
GROUP BY Factura.Id_Usuario, Factura.Id_Cliente, Factura.Monto, Factura.Nit;
          `);

    result.rows.forEach((row) => {
      row.monto = parseFloat(row.monto);
    });

    res.json(result.rows);
  } catch (error) {
    console.error("Error en ObtenerInformacion:", error);
    res.status(500).json({ message: "Error en la solicitud." });
  }
};

module.exports = {
  Create_Factura,
  getFacturas,
};
