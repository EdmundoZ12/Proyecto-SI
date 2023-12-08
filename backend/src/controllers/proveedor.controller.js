const { json } = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require("../config");

// tabla global a usar
const tabla = "proveedor";

// get roles
const getProveedores = async (req, res) => {
  try {
    const value = await pool.query(`select * from ${tabla}`);
    res.json(value.rows);
  } catch (error) {
    res.json(error);
  }
};

const getProveedor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Funcionalidad = await pool.query(
      "SELECT * FROM Proveedor WHERE id=$1",
      [id]
    );
    if (Funcionalidad.rows.length === 0) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado." });
    }

    res.json(Funcionalidad.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createProveedor = async (req, res) => {
  const { empresa, telefono } = req.body;

  try {
    if (!empresa || !telefono) {
      return res
        .status(400)
        .json({ error: "Los campos empresa y teléfono son obligatorios." });
    }

    const existingProvider = await pool.query(
      `SELECT * FROM ${tabla} WHERE empresa = $1`,
      [empresa]
    );

    if (existingProvider.rowCount > 0) {
      return res.status(400).json({ error: "El proveedor ya existe." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insertar el proveedor
      const insertResult = await client.query(
        "INSERT INTO proveedor (empresa, telefono) VALUES ($1, $2) RETURNING *",
        [empresa, telefono]
      );

      // Confirmar la transacción

      // bitacora
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { token } = req.cookies;
      const accion = `Creo El Proveedor con ID = ${insertResult.rows[0].id}`;

      if (token) {
        console.log("entro");
        const decodedToken = jwt.verify(token, TOKEN_SECRET);
        await pool.query(
          "INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)",
          [fechaFormateada, decodedToken.id, accion]
        );
      }
      // bitacora
      await client.query("COMMIT");

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

const updateProveedor = async (req, res) => {
  const { id } = req.params;
  const { empresa, telefono } = req.body;

  try {
    if (!empresa || !telefono) {
      return res
        .status(400)
        .json({ error: "Los campos empresa y teléfono son obligatorios." });
    }

    const existingProvider = await pool.query(
      "SELECT * FROM proveedor WHERE empresa = $1 AND id <> $2",
      [empresa, id]
    );

    if (existingProvider.rowCount > 0) {
      return res.status(400).json({ error: "El proveedor ya existe." });
    }

    const updateResult = await pool.query(
      "UPDATE proveedor SET empresa = $1, telefono = $2 WHERE id = $3 RETURNING *",
      [empresa, telefono, id]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado." });
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

const deleteProveedor = async (req, res) => {
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

const activateProveedor = async (req, res) => {
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
      res.status(400).json({ error: "El proveedor no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
  activateProveedor,
  getProveedor,
};
