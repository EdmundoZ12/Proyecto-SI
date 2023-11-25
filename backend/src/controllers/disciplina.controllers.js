const pool = require("../db");

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

    /* const idNuevaDisciplina = nuevaDisciplina.rows[0].cod;

    for (const horario of horarios) {
      await pool.query(
        "INSERT INTO Disciplina_Horario (cod_disciplina, id_horario) VALUES ($1, $2)",
        [idNuevaDisciplina, horario.id_horario]
      );
    }*/

    return res.status(201).json({ success: "Disciplina creada exitosamente." });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateDisciplina = async (req, res, next) => {
  try {
    const cod = req.params.cod;
    const {  nombre, descripcion, precio, activo } = req.body;

    const result = await pool.query(
      "UPDATE Disciplina SET NOMBRE = $1, DESCRIPCION = $2, PRECIO = $3,ACTIVO=$4 WHERE cod = $5 RETURNING *",
      [nombre, descripcion, precio,activo, cod]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "La Disciplina no fue encontrada." });
    }

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
