const { json } = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const {TOKEN_SECRET} = require('../config');

const login = async (req, res) => {
  //obtener datos de una tarea especifica
  const { username, password } = req.body;
  try {
    const usuario = await pool.query(
      "SELECT * FROM Usuario WHERE username=$1 ",
      [username]
    );

    if (usuario.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
   
    const user = usuario.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = await createAccessToken({ id: user.id_persona });

    res.cookie("token", token, { sameSite: "None", secure: true });

    res.json({ id: user.id_persona, username: user.username });
    // La tarea ya existe, puedes devolver un mensaje personalizado si lo deseas
  } catch (error) {
    // Otros errores
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await pool.query("SELECT * FROM Usuario WHERE id=$1", [
    req.user.id,
  ]);

  if (userFound.rows.length === 0) {
    return res.status(400).json({ message: "Usuario no encontrado." });
  }

  return res.json({
    id: userFound.rows[0].id,
    ussername: userFound.rows[0].ussername,
  });
};


const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  console.log(token)
  
  if (!token) {
    return res.status(401).json({ message: "No Autorizado" });
  }

  try {
    const decodedToken = jwt.verify(token, TOKEN_SECRET);
    console.log(decodedToken.id)
    const usuario = await pool.query("SELECT * FROM Usuario WHERE Id_Persona = $1", [
      decodedToken.id
    ]);

    if (usuario.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }
    console.log(usuario.id)

    const user = {
      id: usuario.rows[0].id_persona, // Assuming id is a property of the user
      username: usuario.rows[0].username // Assuming username is a property of the user
    };

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};



module.exports = {
  login,
  logout,
  profile,
  verifyToken
};
