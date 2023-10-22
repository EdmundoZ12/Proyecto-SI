const pool = require("../db");

// get roles
const getRoles = async(req, res) => {
    try {
        const value = await pool.query("select * from rol");
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

const getRol = async(req, res) => {
    const { id } = req.params;

    try {
        const value = await pool.query(`select rol.id,rol.nombre,id_funcionalidad,funcionalidad.nombre,descripcion 
                                        from rol,permiso_rol,funcionalidad
                                        where rol.id=permiso_rol.id_rol and 
                                        permiso_rol.id_funcionalidad=funcionalidad.id and
                rol.id=$1`, [id]);
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};


const createRol = async(req, res) => {
    const { nombre, permisos } = req.body;

    try {
        const existingUser = await pool.query(
            "SELECT * FROM rol WHERE nombre = $1", [nombre]
        );

        if (existingUser.rowCount === 0) {

            const valor = await pool.query(
                "insert into rol (nombre,activo) values ($1, true) returning id", [nombre]
            );
            const id_new = valor.rows[0].id;

            for (const permisoId of permisos) {
                await pool.query(
                    "INSERT INTO Permiso_Rol (Id_Funcionalidad, Id_Rol) VALUES ($1,$2)", [permisoId, id_new]
                );
            }



            // res.json(valor.rows[0]);
            res.json({ succes: "Rol creado" });

        } else {
            res.status(400).json({ error: "El nombre del rol ya existe." });
        }


    } catch (error) {
        res.json(error);
    }
};


const updateRol = async(req, res) => {
    const { id, nombre, permisos } = req.body;

    try {
        const existingRol = await pool.query(
            "SELECT * FROM rol WHERE id = $1", [id]
        );

        if (existingRol.rowCount === 1) {
            await pool.query(
                "UPDATE rol SET nombre = $1 WHERE id = $2", [nombre, id]
            );


            await pool.query(
                "DELETE FROM Permiso_Rol WHERE Id_Rol = $1", [id]
            );


            for (const permisoId of permisos) {
                await pool.query(
                    "INSERT INTO Permiso_Rol (Id_Funcionalidad, Id_Rol) VALUES ($1, $2)", [permisoId, id]
                );
            }

            res.json({ success: "Rol actualizado" });
        } else {
            res.status(400).json({ error: "El rol con el ID proporcionado no existe." });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


const deleteRol = async(req, res) => {
    const { id } = req.params;

    try {

        const existingRol = await pool.query(
            "SELECT * FROM rol WHERE id = $1", [id]
        );

        if (existingRol.rowCount != 0) {

            const valor = await pool.query(
                "update rol set activo=false where id=$1", [id]
            );
            res.json({ succes: "Rol desactivado" });

        } else {
            res.status(400).json({ error: "El rol no existe." });
        }

    } catch (error) {
        res.json(error);
    }
};


const activateRol = async(req, res) => {
    const { id } = req.params;

    try {

        const existingRol = await pool.query(
            "SELECT * FROM rol WHERE id = $1", [id]
        );

        if (existingRol.rowCount != 0) {

            const valor = await pool.query(
                "update rol set activo=true where id=$1", [id]
            );
            res.json({ succes: "Rol activado" });

        } else {
            res.status(400).json({ error: "El rol no existe." });
        }

    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    getRoles,
    createRol,
    updateRol,
    deleteRol,
    activateRol,
    getRol
};