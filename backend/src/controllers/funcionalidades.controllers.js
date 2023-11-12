const pool = require("../db");

const getFuncionalidades = async (req, res, next) => {
  try {
    const Id_User=req.user.id;
    const allFunts = await pool.query("SELECT * FROM funcionalidad");
    res.json(allFunts.rows);
  } catch (error) {
    next(error);
  }
};

const getFuncionalidad = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Funcionalidad = await pool.query("SELECT * FROM funcionalidad WHERE id=$1", [id]);
    if (Funcionalidad.rows.length === 0) {
      return res.status(404).json({ mensaje: "La Funcionalidad no fue encontrada." });
    }

    res.json(Funcionalidad.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createFuncionalidad = async (req, res, next) => {
  const { nombre, descripcion,activo } = req.body;
  try {
    //const Id_User=req.user.id;
    const existingFunc = await pool.query(
      "SELECT * FROM funcionalidad WHERE nombre = $1",
      [nombre]
    );
    if (existingFunc.rowCount === 0) {
      const result = await pool.query(
        "INSERT INTO funcionalidad (nombre, descripcion,activo) VALUES ($1, $2,$3) RETURNING *",
        [nombre, descripcion,activo]
      );
      res.json(result.rows[0]);
    } else {
      res
        .status(400)
        .json({ error: "La Funcionalidad con el mismo nombre ya existe." });
    }
  } catch (error) {
    // res.status(500).json({ error: "Error interno del servidor." });
    next(error);
  }
};

const deleteFuncionalidad= async (req, res, next) => {
  try {
    const  id  = req.params.id;
    
    const deleteF = await pool.query("DELETE FROM funcionalidad WHERE id=$1", [
      //DELETE FROM task WHERE id=$1 RETURNING *
      id,
    ]);
    if (deleteF.rowCount === 0) {
      return res.status(404).json({ mensaje: "La Funcionalidad no fue encontrada." });
    }

    return res.sendStatus(204);
  } catch (error) {
    //res.status(500).json({ error: "Error interno del servidor." });
    next(error);
  }
};

const updateFuncionalidad = async(req, res, next) => {
  try {
    const id=req.params.id;
    const { nombre, descripcion ,activo} = req.body;

    const result = await pool.query(
      "UPDATE funcionalidad SET nombre=$1 , descripcion=$2 , activo=$3 WHERE id=$4 RETURNING*",
      [nombre, descripcion,activo,id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "La Funcionalidad no fue encontrada." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
getFuncionalidad,
getFuncionalidades,
createFuncionalidad,
deleteFuncionalidad,
updateFuncionalidad
};