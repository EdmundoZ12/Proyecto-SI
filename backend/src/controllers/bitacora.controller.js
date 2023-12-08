const pool = require("../db");

const { json } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require('../config');

// get roles
const getBitacoras = async(req, res) => {

    // const { token } = req.cookies;
    // console.log(token)

    try {
        const value = await pool.query(`select fecha_hora, username, accion
                                        from bitacora, usuario
                                        where id_persona=id_usuario`);
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};



module.exports = {
    getBitacoras,

};