const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require("../config");
// tabla global a usar
// tabla global a usar
const tabla = "categoria";

// get roles
const getCategorias = async (req, res) => {
  try {
    const value = await pool.query(`select * from ${tabla}`);
    res.json(value.rows);
  } catch (error) {
    res.json(error);
  }
};

const getCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const rol = await pool.query(`select * from ${tabla} where id=$1`, [id]);

    res.json(rol.rows);
  } catch (error) {
    res.json(error);
  }
};

const createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    if (!nombre || !descripcion) {
      return res
        .status(400)
        .json({ error: "Los campos nombre y descripcion son obligatorios." });
    }

    const existingProvider = await pool.query(
      `SELECT * FROM ${tabla} WHERE nombre = $1`,
      [nombre]
    );

    if (existingProvider.rowCount > 0) {
      return res.status(400).json({ error: "La categoria ya existe." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insertar el proveedor
      const insertResult = await client.query(
        "INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2) RETURNING id",
        [nombre, descripcion]
      );

      // Confirmar la transacción
      await client.query("COMMIT");

      // bitacora
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { token } = req.cookies;
      const accion = `creo la categoria con ID = ${insertResult.rows[0].id}`;

      if (token) {
        console.log("entro");
        const decodedToken = jwt.verify(token, TOKEN_SECRET);
        const a = await pool.query(
          "INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)",
          [fechaFormateada, decodedToken.id, accion]
        );
      }
      // bitacora

      // Devolver el resultado
      res.json(insertResult.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    res.json(error);
  }
};

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    if (!nombre || !descripcion) {
      return res
        .status(400)
        .json({ error: "Los campos nombre y empresa son obligatorios." });
    }

    const existingProvider = await pool.query(
      "SELECT * FROM categoria WHERE nombre = $1 AND id <> $2",
      [nombre, id]
    );

    if (existingProvider.rowCount > 0) {
      return res.status(400).json({ error: "La categoria ya existe." });
    }

    const updateResult = await pool.query(
      "UPDATE categoria SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
      [nombre, descripcion, id]
    );
    // bitacora
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { token } = req.cookies;
    const accion = `actualizo la categoria con ID = ${id}`;

    if (token) {
      const decodedToken = jwt.verify(token, TOKEN_SECRET);
      const a = await pool.query(
        "INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)",
        [fechaFormateada, decodedToken.id, accion]
      );
    }
    // bitacora

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "categoria no encontrada." });
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const existingRol = await pool.query(
      `SELECT * FROM ${tabla} WHERE id = $1`,
      [id]
    );

    if (existingRol.rowCount != 0) {
      const valor = await pool.query(`delete from ${tabla} where id=$1`, [id]);
      res.json({ succes: "Proveedor desactivado" });
    } else {
      res.status(400).json({ error: "El proveedor no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

const activateCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const existingRol = await pool.query(
      `SELECT * FROM ${tabla} WHERE id = $1`,
      [id]
    );

    if (existingRol.rowCount != 0) {
      // const valor = await pool.query(
      //     `update ${tabla} set activo=true where id=$1`, [id]
      // );
      res.json({ succes: "Proveedor activado" });
    } else {
      res.status(400).json({ error: "El Categoria no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  activateCategoria,
  getCategoria,
};
