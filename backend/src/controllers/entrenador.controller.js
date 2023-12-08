const { json } = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");

const CreateEntrenador = async (req, res) => {
  //insertar datos
  console.log(req.body);
  const { id_usuario, cod_disciplina, horarios } = req.body;
  try {
    // Verificar si ya existe una tarea con el mismo título

    const existingPersona = await pool.query(
      `SELECT *
      FROM ENTRENADOR_DISCIPLINA
      WHERE ID_ENTRENADOR=$1 AND COD_DISCIPLINA=$2`,
      [id_usuario, cod_disciplina]
    );
    console.log(existingPersona);

    if (existingPersona.rowCount === 0) {
      // Si no existe, insertar usuario y persona

      const disciplina = await pool.query(
        "INSERT INTO ENTRENADOR_DISCIPLINA (ID_ENTRENADOR,COD_DISCIPLINA) VALUES ($1,$2) RETURNING *",
        [id_usuario, cod_disciplina]
      );

      const idNuevaDisciplina = disciplina.rows[0].cod;

      for (const horario of horarios) {
        await pool.query(
          "INSERT INTO Disciplina_Horario (cod_disciplina, id_horario) VALUES ($1, $2)",
          [idNuevaDisciplina, horario.id_horario]
        );
      }
      // bitacora
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { token } = req.cookies;
      const accion = `unio la disciplina ID = ${cod_disciplina} y entrenador ID = ${id_usuario}`;

      if (token) {
        console.log("entro");
        const decodedToken = jwt.verify(token, TOKEN_SECRET);
        await pool.query(
          "INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)",
          [fechaFormateada, decodedToken.id, accion]
        );
      }
      // bitacora

      return res
        .status(201)
        .json({ success: "Disciplina creada exitosamente." });
    } else {
      // La tarea ya existe, puedes devolver un mensaje personalizado si lo deseas
      res.status(400).json({ error: "Los datos ya existen." });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const getEntrenadores = async (req, res, next) => {
  try {
    const entrenadores = await pool.query(`SELECT
      USUARIO.ID_PERSONA AS ID_USUARIO,
      DISCIPLINA.COD AS COD_DISCIPLINA,
      PERSONA.NOMBRE AS NOMBRE_ENTRENADOR,
      DISCIPLINA.NOMBRE AS NOMBRE_DISCIPLINA,
      (
        SELECT
          json_agg(json_build_object(
            'id_horario', HORARIO.ID,
            'hora_inicio', HORARIO.HORA_INICIO,
            'hora_fin', HORARIO.HORA_FIN,
            'dia', HORARIO.DIA
          ))
        FROM
          HORARIO,
          DISCIPLINA_HORARIO
        WHERE
          DISCIPLINA.COD = DISCIPLINA_HORARIO.COD_DISCIPLINA
          AND DISCIPLINA_HORARIO.ID_HORARIO = HORARIO.ID
      ) AS horarios
    FROM PERSONA,USUARIO,ROL,DISCIPLINA,ENTRENADOR,ENTRENADOR_DISCIPLINA
    WHERE PERSONA.ID=USUARIO.ID_PERSONA AND USUARIO.ID_ROL=ROL.ID AND ROL.NOMBRE='ENTRENADOR' AND USUARIO.ID_PERSONA=ENTRENADOR.ID_USUARIO
            AND ENTRENADOR.ID_USUARIO=ENTRENADOR_DISCIPLINA.ID_ENTRENADOR AND DISCIPLINA.COD=ENTRENADOR_DISCIPLINA.COD_DISCIPLINA ;
    `);
    res.json(entrenadores.rows);
  } catch (error) {
    next(error);
  }
};

const getSoloEntrenadores = async (req, res) => {
  try {
    const value = await pool.query(
      "SELECT Persona.Id,Persona.nombre FROM PERSONA,USUARIO,ROL WHERE PERSONA.ID=USUARIO.ID_PERSONA AND USUARIO.ID_ROL=ROL.ID AND ROL.NOMBRE='ENTRENADOR'"
    );
    res.json(value.rows);
  } catch (error) {
    res.json(error);
  }
};

const getEntrenador = async (req, res) => {
  const ID_ENTRENADOR = req.params.id;
  try {
    const result = await pool.query(
      `SELECT
      USUARIO.ID_PERSONA AS ID_USUARIO,
      DISCIPLINA.COD AS COD_DISCIPLINA,
          PERSONA.NOMBRE AS NOMBRE_ENTRENADOR,
          DISCIPLINA.NOMBRE AS NOMBRE_DISCIPLINA,
          (
            SELECT
              json_agg(json_build_object(
                'id_horario', HORARIO.ID,
                'hora_inicio', HORARIO.HORA_INICIO,
                'hora_fin', HORARIO.HORA_FIN,
                'dia', HORARIO.DIA
              ))
            FROM
              HORARIO,
              DISCIPLINA_HORARIO
            WHERE
              DISCIPLINA.COD = DISCIPLINA_HORARIO.COD_DISCIPLINA
              AND DISCIPLINA_HORARIO.ID_HORARIO = HORARIO.ID
          ) AS horarios
        FROM
          PERSONA,
          USUARIO,
          ROL,
          DISCIPLINA,
          ENTRENADOR,
          ENTRENADOR_DISCIPLINA
        WHERE
          PERSONA.ID = USUARIO.ID_PERSONA
          AND USUARIO.ID_ROL = ROL.ID
          AND ROL.NOMBRE = 'ENTRENADOR'
          AND USUARIO.ID_PERSONA = ENTRENADOR.ID_USUARIO
          AND ENTRENADOR.ID_USUARIO = ENTRENADOR_DISCIPLINA.ID_ENTRENADOR
          AND DISCIPLINA.COD = ENTRENADOR_DISCIPLINA.COD_DISCIPLINA
          AND ENTRENADOR.ID_USUARIO = $1`,
      [ID_ENTRENADOR]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "No encontrado." });
    }

    const entrenador = result.rows[0];
    res.json(entrenador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEntrenador = async (req, res, next) => {
  try {
    const id_usuario = req.params.id;
    const { cod_disciplina, horarios } = req.body;

    // Verificar si el entrenador existe
    const existingEntrenador = await pool.query(
      "SELECT * FROM ENTRENADOR_DISCIPLINA WHERE ID_ENTRENADOR = $1",
      [id_usuario]
    );

    if (existingEntrenador.rows.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "El Entrenador no fue encontrado." });
    }

    // Actualizar la disciplina asociada al entrenador
    const result = await pool.query(
      "UPDATE ENTRENADOR_DISCIPLINA SET COD_DISCIPLINA = $1 WHERE ID_ENTRENADOR = $2 RETURNING *",
      [cod_disciplina, id_usuario]
    );

    // Eliminar horarios existentes asociados a la disciplina
    await pool.query(
      "DELETE FROM Disciplina_Horario WHERE cod_disciplina = $1",
      [cod_disciplina]
    );

    // Insertar nuevos horarios asociados a la disciplina
    for (const horario of horarios) {
      await pool.query(
        "INSERT INTO Disciplina_Horario (cod_disciplina, id_horario) VALUES ($1, $2)",
        [cod_disciplina, horario.id_horario]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateEntrenador,
  updateEntrenador,
  getEntrenadores,
  getEntrenador,
  getSoloEntrenadores,
};
