const pool = require("../db");

const { TOKEN_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const getDisciplinas = async (req, res, next) => {
  try {
    const disciplinas = await pool.query(`SELECT
    DISCIPLINA.COD,
    DISCIPLINA.NOMBRE,
    DISCIPLINA.DESCRIPCION,
    DISCIPLINA.PRECIO,
    DISCIPLINA.ACTIVO,
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
    DISCIPLINA;
  `);
    res.json(disciplinas.rows);
  } catch (error) {
    next(error);
  }
};

const getDisciplina = async (req, res, next) => {
  try {
    const cod = req.params.cod;
    const disciplina = await pool.query(
      `SELECT
      DISCIPLINA.COD,
      DISCIPLINA.NOMBRE,
      DISCIPLINA.DESCRIPCION,
      DISCIPLINA.PRECIO,
      DISCIPLINA.ACTIVO,
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
      DISCIPLINA
    WHERE
      DISCIPLINA.COD = $1;
    `,
      [cod]
    );
    if (disciplina.rows.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "La Disciplina no fue encontrada." });
    }

    res.json(disciplina.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createDisciplina = async (req, res, next) => {
  const { cod, nombre, descripcion, precio, activo } = req.body;

  try {
    if (!cod || !nombre || !precio || !activo) {
      return res
        .status(400)
        .json({ error: "Faltan datos obligatorios en la solicitud." });
    }

    const nuevaDisciplina = await pool.query(
      "INSERT INTO Disciplina (cod, nombre, descripcion, precio, activo) VALUES ($1, $2, $3, $4, $5) RETURNING cod",
      [cod, nombre, descripcion, precio, activo]
    );

    // bitacora
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { token } = req.cookies;
    const accion = `creo la disciplina con ID = ${nuevaDisciplina.rows[0].cod}`;

    if (token) {
      console.log("entro");
      const decodedToken = jwt.verify(token, TOKEN_SECRET);
      await pool.query(
        "INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)",
        [fechaFormateada, decodedToken.id, accion]
      );
    }
    // bitacora

    return res.status(201).json({ success: "Disciplina creada exitosamente." });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateDisciplina = async (req, res, next) => {
  try {
    const cod = req.params.cod;
    const { nombre, descripcion, precio, activo } = req.body;

    const result = await pool.query(
      "UPDATE Disciplina SET NOMBRE = $1, DESCRIPCION = $2, PRECIO = $3,ACTIVO=$4 WHERE cod = $5 RETURNING *",
      [nombre, descripcion, precio, activo, cod]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "La Disciplina no fue encontrada." });
    }

    // bitacora
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { token } = req.cookies;
    const accion = `actualizo la disciplina con ID = ${cod}`;

    if (token) {
      console.log("entro");
      const decodedToken = jwt.verify(token, TOKEN_SECRET);
      await pool.query(
        "INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)",
        [fechaFormateada, decodedToken.id, accion]
      );
    }
    // bitacora

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDisciplina,
  getDisciplinas,
  createDisciplina,
  updateDisciplina,
};
