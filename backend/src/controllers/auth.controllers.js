const { json } = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken } = require("../libs/jwt");
const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config');

const login = async (req, res) => {
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
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const accessToken = createAccessToken({ id: user.id_persona });
    const refreshToken = createRefreshToken({ id: user.id_persona });

    res.cookie("token", accessToken, { httpOnly: true, secure: true, sameSite: "None" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None" });

    res.json({ id: user.id_persona, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
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
    username: userFound.rows[0].username,
  });
};

const verifyToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No Autorizado" });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const usuario = await pool.query("SELECT * FROM Usuario WHERE id_persona = $1", [
      decodedToken.id
    ]);

    if (usuario.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    const accessToken = createAccessToken({ id: usuario.rows[0].id_persona });

    res.cookie("token", accessToken, { httpOnly: true, secure: true, sameSite: "None" });

    res.json({ id: usuario.rows[0].id_persona, username: usuario.rows[0].username });
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
