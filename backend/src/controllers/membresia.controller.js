

const { json } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require('../config');

// get roles
const getClientes = async(req, res) => {

    // const { token } = req.cookies;
    // TOKEN = req.cookies.token;
    // console.log("token obtenido")
    // console.log(TOKEN)
    // const { token } = req.cookies;
    // console.log(token)
    // const decodedToken = jwt.verify(token, TOKEN_SECRET);
    // console.log(decodedToken.id)
    try {
        const value = await pool.query(`select *
                                        from persona,membresia
                                        where persona.id=id_cliente`);
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

const getCliente = async(req, res) => {
    const { id } = req.params;

    // console.log("token obtenido solo")
    // console.log(req.cookies.token)

    // const decodedToken = jwt.verify(token, TOKEN_SECRET);
    // console.log(decodedToken.id)

    try {

        const datos = await pool.query(`select *
                                        from persona,membresia
                                        where persona.id=id_cliente and persona.id=$1`, [id]);

        const actos = await pool.query(`select disciplina.nombre as disciplina,dia, hora_inicio,hora_fin
                                        from membresia,persona, disciplina_membresia, disciplina, disciplina_horario, horario
                                        where id_cliente=persona.id and
                                        membresia.id=id_membresia and
                                        disciplina_membresia.cod_disciplina = disciplina.cod and
                                        disciplina.cod=disciplina_horario.cod_disciplina and
                                        horario.id=disciplina_horario.id_horario and
                                        persona.id=$1`, [id]);

        const resultado = {
            "datos": datos.rows,
            "valores": actos.rows
        }

        res.json(resultado);
    } catch (error) {
        res.json(error);
    }
};


const createCliente = async(req, res) => {
    const { pago, monto, fechaI, fechaF, cliente, disciplina } = req.body;
    // const { nombre } = req.body;
    const idUser = 1;



    try {

        const pagoId = await pool.query("INSERT INTO Pago (Tipo,Monto) VALUES ($1, $2) returning id ", [pago, monto]);


        const membresiaId = await pool.query("INSERT INTO Membresia (Fecha_Inicio, Fecha_Fin, Id_Cliente, Id_Pago, Id_Usuario) VALUES ($1, $2, $3, $4, $5) returning id", [fechaI, fechaF, cliente, pagoId.rows[0].id, idUser]);

        // console.log(membresiaId.rows[0].id);

        const listDisciplinaCod = [];

        for (const nombre of disciplina) {
            const consulta = `SELECT Cod FROM disciplina WHERE Nombre = $1`;
            const resultadoConsulta = await pool.query(consulta, [nombre]);
            if (resultadoConsulta.rows.length > 0) {
                listDisciplinaCod.push(resultadoConsulta.rows[0].cod);
            }
        }


        for (const cod of listDisciplinaCod) {
            // const consulta = `SELECT Cod FROM disciplina WHERE Nombre = $1`;
            const resultadoConsulta = await pool.query("INSERT INTO Disciplina_Membresia (Cod_Disciplina, Id_Membresia) VALUES ($1, $2)", [cod, membresiaId.rows[0].id]);
        }

        // bitacora
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString();
        const { token } = req.cookies;
        const accion = `creo la membresia con ID = ${membresiaId.rows[0].id}`;

        if (token) {
            console.log("entro");
            const decodedToken = jwt.verify(token, TOKEN_SECRET);
            await pool.query("INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)", [fechaFormateada, decodedToken.id, accion]);
        }
        // bitacora


        res.json({ succes: "creado" });


    } catch (error) {
        res.json(error);
    }
};


// const updateCliente = async(req, res) => {
//     const { id } = req.body;
//     const { nombre, apellido, ci, telefono, fecha } = req.body;


//     const activo = true;

//     console.log(id);
//     try {
//         result = await pool.query(
//             `
//             UPDATE Persona
//             SET Nombre=$1, Apellido=$2, Telefono=$3, CI=$4, Fecha_nacimiento=$5 WHERE id = $6;`, [nombre, apellido, telefono, ci, fecha, id]
//         );

//         res.json({ message: "actualizado" });


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }





//     // try {
//     //     const existingRol = await pool.query(
//     //         "SELECT * FROM persona WHERE id = $1", [id]
//     //     );

//     //     if (existingRol.rowCount === 1) {
//     //         await pool.query(
//     //             "UPDATE rol SET nombre = $1 WHERE id = $2", [nombre, id]
//     //         );


//     //         await pool.query(
//     //             "DELETE FROM Permiso_Rol WHERE Id_Rol = $1", [id]
//     //         );


//     //         for (const permisoId of permisos) {
//     //             await pool.query(
//     //                 "INSERT INTO Permiso_Rol (Id_Funcionalidad, Id_Rol) VALUES ($1, $2)", [permisoId, id]
//     //             );
//     //         }

//     //         res.json({ success: "Rol actualizado" });
//     //     } else {
//     //         res.status(400).json({ error: "El rol con el ID proporcionado no existe." });
//     //     }
//     // } catch (error) {
//     //     res.status(500).json({ error: "Error interno del servidor" });
//     // }
// };


// const deleteCliente = async(req, res) => {
//     const { id } = req.params;

//     try {

//         const existingRol = await pool.query(
//             "SELECT * FROM persona WHERE id = $1", [id]
//         );

//         if (existingRol.rowCount != 0) {

//             const valor = await pool.query(
//                 "update rol set activo=false where id=$1", [id]
//             );
//             res.json({ succes: "Rol desactivado" });

//         } else {
//             res.status(400).json({ error: "El rol no existe." });
//         }

//     } catch (error) {
//         res.json(error);
//     }
// };


// const activateCliente = async(req, res) => {
//     const { id } = req.params;

//     try {

//         const existingRol = await pool.query(
//             "SELECT * FROM rol WHERE id = $1", [id]
//         );

//         if (existingRol.rowCount != 0) {

//             const valor = await pool.query(
//                 "update rol set activo=true where id=$1", [id]
//             );
//             res.json({ succes: "Rol activado" });

//         } else {
//             res.status(400).json({ error: "El rol no existe." });
//         }

//     } catch (error) {
//         res.json(error);
//     }
// };

module.exports = {
    getClientes,
    createCliente,
    // updateCliente,
    // deleteCliente,
    // activateCliente,
    getCliente
};