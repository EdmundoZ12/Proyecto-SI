const pool = require("../db");

// get roles
const getClientes = async(req, res) => {
    try {
        const value = await pool.query(`select id,nombre,apellido, ci,telefono,fecha_nacimiento,activo 
                                        from persona, cliente
                                        where id_persona=id`);
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

const getCliente = async(req, res) => {
    const { id } = req.params;

    try {

        const rol = await pool.query('select nombre,id from rol where id=$1', [id]);

        const value = await pool.query(`select id_funcionalidad,funcionalidad.nombre,descripcion 
                                        from rol,permiso_rol,funcionalidad
                                        where rol.id=permiso_rol.id_rol and 
                                        permiso_rol.id_funcionalidad=funcionalidad.id and
                                        rol.id=$1`, [id]);

        const resultado = {
            "rol": rol.rows,
            "permisos": value.rows
        }

        res.json(resultado);
    } catch (error) {
        res.json(error);
    }
};


const createCliente = async(req, res) => {
    const { nombre, apellido, ci, telefono, fecha } = req.body;
    const pfecha = '1984-11-19';
    try {
        const existingUser = await pool.query(
            "SELECT * FROM persona WHERE nombre = $1", [nombre]
        );

        if (existingUser.rowCount === 0) {



            // Insertar el proveedor
            try {
                const persona = await pool.query(
                    "INSERT INTO Persona (Nombre, Apellido, CI, Telefono, Fecha_Nacimiento) VALUES ($1, $2,$3,$4,$5) RETURNING Id", [nombre, apellido, ci, telefono, fecha]
                );
                const Id_Persona = persona.rows[0].id;

                const activo = true;


                const insertResult = await pool.query("INSERT INTO Cliente (Id_Persona,Activo) VALUES ($1, $2)", [Id_Persona, activo]);
                console.log("cliente")

                // Devolver el resultado
                res.json({ message: "creado" });


            } catch (error) {
                console.log(error);
                throw error;

            }


            // res.json(valor.rows[0]);
            //    res.json({ succes: "cliente creado" });

        } else {
            res.status(400).json({ error: "El nombre del rol ya existe." });
        }


    } catch (error) {
        res.json(error);
    }
};


const updateCliente = async(req, res) => {
    const { id } = req.body;
    const { nombre, apellido, ci, telefono, fecha } = req.body;


    const activo = true;

    console.log(id);
    try {
        result = await pool.query(
            `
            UPDATE Persona
            SET Nombre=$1, Apellido=$2, Telefono=$3, CI=$4, Fecha_nacimiento=$5 WHERE id = $6;`, [nombre, apellido, telefono, ci, fecha, id]
        );

        res.json({ message: "actualizado" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }





    // try {
    //     const existingRol = await pool.query(
    //         "SELECT * FROM persona WHERE id = $1", [id]
    //     );

    //     if (existingRol.rowCount === 1) {
    //         await pool.query(
    //             "UPDATE rol SET nombre = $1 WHERE id = $2", [nombre, id]
    //         );


    //         await pool.query(
    //             "DELETE FROM Permiso_Rol WHERE Id_Rol = $1", [id]
    //         );


    //         for (const permisoId of permisos) {
    //             await pool.query(
    //                 "INSERT INTO Permiso_Rol (Id_Funcionalidad, Id_Rol) VALUES ($1, $2)", [permisoId, id]
    //             );
    //         }

    //         res.json({ success: "Rol actualizado" });
    //     } else {
    //         res.status(400).json({ error: "El rol con el ID proporcionado no existe." });
    //     }
    // } catch (error) {
    //     res.status(500).json({ error: "Error interno del servidor" });
    // }
};


const deleteCliente = async(req, res) => {
    const { id } = req.params;

    try {

        const existingRol = await pool.query(
            "SELECT * FROM persona WHERE id = $1", [id]
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


const activateCliente = async(req, res) => {
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
    getClientes,
    createCliente,
    updateCliente,
    deleteCliente,
    activateCliente,
    getCliente
};