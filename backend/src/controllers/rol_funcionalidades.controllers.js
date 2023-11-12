const pool = require("../db");

const getPermisos_Rols = async (req, res, next) => {
  try {
    const allRsFunts = await pool.query("SELECT * FROM Permiso_Rol ");
    res.json(allRsFunts.rows);
  } catch (error) {
    next(error);
  }
};

const getPermiso_Rol = async (req, res, next) => {
  try {
    const id_Rol = req.params.id_Rol;
    const id_Funcionalidad = req.params.id_Funcionalidad;
    const Funcionalidades = await pool.query(
      "SELECT * FROM Permiso_Rol WHERE Id_Rol=$1 and  Id_Funcionalidad=$2",
      [id_Rol, id_Funcionalidad]
    );
    if (Funcionalidades.rows.length === 0) {
      return res.status(404).json({ mensaje: "Permiso no Encontrados." });
    }

    res.json(Funcionalidades.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createPermiso_Rol = async (req, res, next) => {
  const { id_Funcionalidad, id_Rol } = req.body;
  try {
    //const Id_User=req.user.id;
    const existinPermiso = await pool.query(
      "SELECT * FROM Permiso_Rol WHERE Id_Funcionalidad = $1 and iId_Rol=$2",
      [id_Funcionalidad, id_Rol]
    );

    if (existinPermiso.rowCount === 0) {
      const result = await pool.query(
        "INSERT INTO Permiso_Rol (Id_Funcionalidad,Id_Rol) VALUES ($1, $2) RETURNING *",
        [id_Funcionalidad, id_Rol]
      );
      res.json(result.rows[0]);
    } else {
      res.status(400).json({ error: "El Permiso ya existe." });
    }
  } catch (error) {
    // res.status(500).json({ error: "Error interno del servidor." });
    next(error);
  }
};

const deletePermiso_Rol = async (req, res, next) => {
  try {
    const id_Rol = req.params.id_Rol;
    const id_Funcionalidad = req.params.id_Funcionalidad;

    const deleteF = await pool.query(
      "DELETE FROM Permiso_Rol WHERE id_Rol=$1 and id_Funcionalidad=$2",
      [
        //DELETE FROM task WHERE id=$1 RETURNING *
        id_Rol,
        id_Funcionalidad,
      ]
    );
    if (deleteF.rowCount === 0) {
      return res.status(404).json({ mensaje: "El Permiso no fue encontrado." });
    }

    return res.sendStatus(204);
  } catch (error) {
    //res.status(500).json({ error: "Error interno del servidor." });
    next(error);
  }
};

const updatePermiso_Rol = async (req, res, next) => {
  try {
    const id_Rol = req.params.id;
    const id_Funcionalidad = req.params.id;
    const { idrol, idfuncionalidad } = req.body;

    const result = await pool.query(
      "UPDATE Permiso_Rol SET Id_Funcionalidad=$1 , Id_Rol=$2  WHERE Id_Funcionalidad=$3 and Id_Rol=$4 RETURNING*",
      [idfuncionalidad, idrol]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "El Permiso no fue encontrado." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPermisos_Rols,
  getPermiso_Rol,
  createPermiso_Rol,
  deletePermiso_Rol,
  updatePermiso_Rol,
};
