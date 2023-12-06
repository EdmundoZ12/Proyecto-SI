const pool = require("../db");

const { TOKEN_SECRET } = require('../config');
const jwt = require("jsonwebtoken");

const getHorarios = async(req, res, next) => {
    try {
        const horarios = await pool.query("SELECT * FROM Horario");
        res.json(horarios.rows);
    } catch (error) {
        next(error);
    }
};

const getHorario = async(req, res, next) => {
    try {
        const id = req.params.id;
        const horario = await pool.query("SELECT * FROM Horario WHERE id=$1", [id]);
        if (horario.rows.length === 0) {
            return res.status(404).json({ mensaje: "El Horario no fue encontrado." });
        }

        res.json(horario.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createHorario = async(req, res, next) => {
    const { hora_inicio, hora_fin, dia } = req.body;

    // Verificar que los campos no estén vacíos
    if (!hora_inicio || !hora_fin || !dia) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios." });
    }

    try {
        const existingHorario = await pool.query(
            "SELECT * FROM Horario WHERE hora_inicio = $1 AND hora_fin = $2 AND dia = $3", [hora_inicio, hora_fin, dia]
        );
        if (existingHorario.rows.length === 0) {
            const result = await pool.query(
                "INSERT INTO Horario (hora_inicio, hora_fin, dia) VALUES ($1, $2, $3) RETURNING id", [hora_inicio, hora_fin, dia]
            );

            // bitacora
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toISOString();
            const { token } = req.cookies;
            const accion = `creo el horario con ID = ${result.rows[0].id}`;

            if (token) {
                console.log("entro");
                const decodedToken = jwt.verify(token, TOKEN_SECRET);
                await pool.query("INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)", [fechaFormateada, decodedToken.id, accion]);
            }
            // bitacora



            res.json(result.rows[0]);
        } else {
            res.status(400).json({ error: "El Horario ya existe" });
        }
    } catch (error) {
        next(error);
    }
};

const deleteHorario = async(req, res, next) => {
    try {
        const id = req.params.id;

        const deleteH = await pool.query("DELETE FROM Horario WHERE id = $1", [id]);
        if (deleteH.rowCount === 0) {
            return res.status(404).json({ mensaje: "El Horario no fue encontrado." });
        }

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateHorario = async(req, res, next) => {
    try {
        const id = req.params.id;
        const { hora_inicio, hora_fin, dia } = req.body;

        const result = await pool.query(
            "UPDATE Horario SET hora_inicio = $1, hora_fin = $2, dia = $3 WHERE id = $4 RETURNING *", [hora_inicio, hora_fin, dia, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: "El Horario no fue encontrado." });
        }

        // bitacora
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString();
        const { token } = req.cookies;
        const accion = `actualizo el horario con ID = ${id}`;

        if (token) {
            console.log("entro");
            const decodedToken = jwt.verify(token, TOKEN_SECRET);
            await pool.query("INSERT INTO Bitacora (Fecha_Hora, Id_Usuario,accion) VALUES ($1, $2, $3)", [fechaFormateada, decodedToken.id, accion]);
        }
        // bitacora

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHorario,
    getHorarios,
    createHorario,
    deleteHorario,
    updateHorario,
};