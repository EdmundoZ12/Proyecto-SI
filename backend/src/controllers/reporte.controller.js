const pool = require("../db");

// get roles
const getClientes = async(req, res) => {
    try {
        /*const value = await pool.query(`select *
                                        from persona,membresia  
                                        where persona.id=id_cliente`);*/ //eliminar pago
        const value = await pool.query(`SELECT
        M.Id AS Id_Membresia,
        M.Fecha_Inicio,
        M.Fecha_Fin,
        C.Id_Persona AS Id_Cliente,
        P.Nombre AS Nombre_Cliente,
        P.Apellido AS Apellido_Cliente,
        P.CI,
        P.Telefono,
        P.Fecha_Nacimiento,
        PG.Id AS Id_Pago,
        PG.Tipo,
        PG.Monto
    FROM
        Membresia M
    JOIN
        Cliente C ON M.Id_Cliente = C.Id_Persona
    JOIN
        Persona P ON C.Id_Persona = P.Id
    JOIN
        Pago PG ON M.Id_Pago = PG.Id; `);           
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

const getClienteMembresia=async(req,res)=>{
    try{
        const value=await pool.query(`SELECT
            C.Id_Persona AS Id_Cliente,
            P.Nombre,
            P.Apellido,
            D.Cod AS Cod_Disciplina,
            D.Nombre AS Nombre_Disciplina
        FROM
            Cliente C
        JOIN
            Membresia M ON C.Id_Persona = M.Id_Cliente
        JOIN
            Disciplina_Membresia DM ON M.Id = DM.Id_Membresia
        JOIN
            Disciplina D ON DM.Cod_Disciplina = D.Cod
        JOIN
            Persona P ON C.Id_Persona = P.Id;`);
        res.json(value.rows);  

    }catch(error){
        res.json(error);
    }
}
const getEntrenadorEstudiante=async(req,res)=>{
    try{
        const value=await pool.query(`SELECT
        E.ID_Usuario AS ID_Entrenador,
        PEntrenador.Nombre AS Nombre_Entrenador,
        PEntrenador.Apellido AS Apellido_Entrenador,
        C.Id_Persona AS ID_Cliente,
        PCliente.Nombre AS Nombre_Cliente,
        PCliente.Apellido AS Apellido_Cliente,
        DM.Cod_Disciplina,
        D.Nombre AS Nombre_Disciplina
    FROM
        Entrenador E
    JOIN
        Usuario UEntrenador ON E.ID_Usuario = UEntrenador.Id_Persona
    JOIN
        Persona PEntrenador ON UEntrenador.Id_Persona = PEntrenador.Id
    JOIN
        Entrenador_Disciplina ED ON E.ID_Usuario = ED.Id_Entrenador
    JOIN
        Disciplina_Membresia DM ON ED.Cod_Disciplina = DM.Cod_Disciplina
    JOIN
        Membresia M ON DM.Id_Membresia = M.Id
    JOIN
        Cliente C ON M.Id_Cliente = C.Id_Persona
    JOIN
        Persona PCliente ON C.Id_Persona = PCliente.Id
    JOIN
        Disciplina D ON DM.Cod_Disciplina = D.Cod;
    `);
        res.json(value.rows);  

    }catch(error){
        res.json(error);
    }
}



const getCliente = async(req, res) => {
    const { id } = req.params;

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
      //  const pago=await pool.query()                                        

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
    const idUser = 2;



    try {

        const pagoId = await pool.query("INSERT INTO Pago (Tipo,Monto) VALUES ($1, $2) returning id ", [pago, monto]);


        const membresiaId = await pool.query("INSERT INTO Membresia (Fecha_Inicio, Fecha_Fin, Id_Cliente, Id_Pago, Id_Usuario) VALUES ($1, $2, $3, $4, $5) returning id", [fechaI, fechaF, cliente, pagoId.rows[0].id, idUser]);

        console.log(membresiaId.rows[0].id);

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


        res.json({ succes: "creado" });


    } catch (error) {
        res.json(error);
    }
};

const getPago = async(req, res) => {
    const { id } = req.params;

    try {
        const datos=await pool.query(`select pago.monto
                                      from pago,membresia
                                      where pago.id=membresia.id_pago and membresia.id=$1`, [id]);
        const resultado = {
        "datos": datos.rows,
        } 
        res.json(resultado);                             
    }catch{
        res.json(error);
    }
}



module.exports = {
    getClientes,
    createCliente,
    // updateCliente,
    // deleteCliente,
    // activateCliente,
    getCliente,
    getClienteMembresia,
    getEntrenadorEstudiante,
    getPago,
};