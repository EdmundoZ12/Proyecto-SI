const pool = require("../db");

// get roles
const getFuncionalidades = async(req, res) => {
    try {
        const value = await pool.query("select * from funcionalidad");
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

const getFuncionalidad = async(req, res) => {
    const { id } = req.params;

    try {
        const value = await pool.query(`select * from funcionalidad where id=$1`, [id]);
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};


const createFuncionalidad = async(req, res) => {
    const { nombre, descripcion } = req.body;
    // console.log(nombre);
    try {
        const existingUser = await pool.query(
            "SELECT * FROM funcionalidad WHERE nombre = $1", [nombre]
        );

        if (existingUser.rowCount === 0) {

            const valor = await pool.query(
                "insert into funcionalidad (nombre,descripcion,activo) values ($1,$2, true) returning id", [nombre, descripcion]
            );


            res.json({ succes: "Funcionalidad creado" });

        } else {
            res.status(400).json({ error: "El nombre de la funcionalidad ya existe." });
        }


    } catch (error) {
        res.json(error);
    }
};


const updateFuncionalidad = async(req, res) => {
    const { id, nombre, descripcion } = req.body;

    try {
        const existingRol = await pool.query(
            "SELECT * FROM funcionalidad WHERE id = $1", [id]
        );

        const existingName = await pool.query(
            "SELECT * FROM funcionalidad WHERE nombre = $1", [nombre]
        );

        if (existingRol.rowCount === 1) {

            await pool.query(
                "UPDATE funcionalidad SET nombre = $1, descripcion = $3 WHERE id = $2", [nombre, id, descripcion]
            );
            res.json({ success: "funcionalidad actualizada" });

        } else {
            res.status(400).json({ error: "La funcionalidad con el ID proporcionado no existe" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


const deleteFuncionalidad = async(req, res) => {
    const { id } = req.params;

    try {

        const existingRol = await pool.query(
            "SELECT * FROM funcionalidad WHERE id = $1", [id]
        );

        if (existingRol.rowCount != 0) {

            const valor = await pool.query(
                "update funcionalidad set activo=false where id=$1", [id]
            );
            res.json({ succes: "Funcionalidad desactivada" });

        } else {
            res.status(400).json({ error: "La funcionalidad no existe." });
        }

    } catch (error) {
        res.json(error);
    }
};


const activateFuncionalidad = async(req, res) => {
    const { id } = req.params;

    try {

        const existingRol = await pool.query(
            "SELECT * FROM funcionalidad WHERE id = $1", [id]
        );

        if (existingRol.rowCount != 0) {

            const valor = await pool.query(
                "update funcionalidad set activo=true where id=$1", [id]
            );
            res.json({ succes: "Funcionalidad activada" });

        } else {
            res.status(400).json({ error: "La Funcionalidad no existe." });
        }

    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    getFuncionalidades,
    createFuncionalidad,
    updateFuncionalidad,
    deleteFuncionalidad,
    activateFuncionalidad,
    getFuncionalidad
};