const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require("../config");
// tabla global a usar
const tabla = "producto";

// get roles
const getProductos = async (req, res) => {
  try {
    const value =
      await pool.query(`select producto.cod,producto.nombre,producto.descripcion,producto.precio,categoria.nombre as categoria,categoria.id as id_categoria
                                        from producto, categoria 
                                        where categoria.id=producto.id_categoria
                                        ORDER BY producto.cod ASC;`);
    res.json(value.rows);
  } catch (error) {
    res.json(error);
  }
};

const getProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const rol = await pool.query(
      `select producto.cod,producto.nombre,producto.descripcion,producto.precio,categoria.nombre as categoria
                                        from producto
                                        join categoria on categoria.id=producto.cod
                                        where producto.cod = $1`,
      [id]
    );

    res.json(rol.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, id_categoria } = req.body;

  try {
    if (!nombre || !descripcion || !precio || !id_categoria) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingProduct = await pool.query(
      "SELECT * FROM producto WHERE nombre = $1",
      [nombre]
    );

    if (existingProduct.rowCount > 0) {
      return res.status(400).json({ error: "El producto ya existe." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertResult = await client.query(
        "INSERT INTO producto (nombre, descripcion, precio, id_categoria) VALUES ($1, $2, $3, $4) RETURNING *",
        [nombre, descripcion, precio, id_categoria]
      );

      await client.query("COMMIT");

      // bitacora
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { token } = req.cookies;
      const accion = `creo EL PRODUCTO con ID = ${insertResult.rows[0].cod}`;

      if (token) {
        console.log("entro");
        const decodedToken = jwt.verify(token, TOKEN_SECRET);
        const a = await pool.query(
          "INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)",
          [fechaFormateada, decodedToken.id, accion]
        );
      }
      // bitacora
      res.json(insertResult.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      // Manejar errores específicos aquí según tus necesidades
      res.status(500).json({ error: "Error en la creación del producto." });
    } finally {
      client.release();
    }
  } catch (error) {
    // Manejar errores específicos aquí según tus necesidades
    res.status(500).json({ error: "Error en la creación del producto." });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, id_categoria } = req.body;

  try {
    if (!nombre || !descripcion || !precio || !id_categoria) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingProvider = await pool.query(
      "SELECT * FROM producto WHERE nombre = $1 AND cod <> $2",
      [nombre, id]
    );

    if (existingProvider.rowCount > 0) {
      return res.status(400).json({ error: "El producto ya existe." });
    }

    const updateResult = await pool.query(
      "UPDATE producto SET nombre=$1, descripcion=$2, precio=$3, id_categoria=$4 where cod=$5 RETURNING *",
      [nombre, descripcion, precio, id_categoria, id]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const existingRol = await pool.query(
      `SELECT * FROM ${tabla} WHERE cod = $1`,
      [id]
    );

    if (existingRol.rowCount != 0) {
      const valor = await pool.query(`delete from ${tabla} where cod=$1`, [id]);
      res.json({ succes: "Producto desactivado" });
    } else {
      res.status(400).json({ error: "El Producto no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

const activateProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const existingRol = await pool.query(
      `SELECT * FROM ${tabla} WHERE cod = $1`,
      [id]
    );

    if (existingRol.rowCount != 0) {
      // const valor = await pool.query(
      //     `update ${tabla} set activo=true where cod=$1`, [id]
      // );
      res.json({ succes: "Producto activado" });
    } else {
      res.status(400).json({ error: "El Producto no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  activateProducto,
  getProducto,
};
