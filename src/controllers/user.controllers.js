const { json } = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");

const CreateUsuario = async (req, res) => {
  //insertar datos
  const {
    nombre,
    apellido,
    CI,
    telefono,
    fecha_nacimiento,
    username,
    password,
    id_Rol,
    direccion,
    activo,
  } = req.body;
  try {
    // Verificar si ya existe una tarea con el mismo título

    const existingPersona = await pool.query(
      "SELECT * FROM Persona WHERE CI= $1",
      [CI]
    );
    

        if (existingPersona.rowCount === 0) {
        // Si no existe, insertar la tarea
            const existingUser = await pool.query(
            "SELECT * FROM Usuario WHERE username = $1",
            [username]
            );
            if (existingUser.rowCount === 0) {
                // Si no existe, insertar usuario y persona
                const persona = await pool.query(
                    "INSERT INTO Persona (Nombre, Apellido, CI, Telefono, Fecha_Nacimiento) VALUES ($1, $2,$3,$4,$5) RETURNING Id",
                    [nombre, apellido, CI, telefono, fecha_nacimiento]
                    );
                const Id_Persona = persona.rows[0].id;
                const passwordhash = await bcrypt.hash(password, 10);
                const result = await pool.query(
                "INSERT INTO Usuario (Id_Persona,Username, Password, Id_Rol, Direccion, Activo) VALUES ($1, $2,$3,$4,$5,$6) RETURNING  Id_Persona,Username,Direccion,Activo",
                [Id_Persona,username,passwordhash,id_Rol,direccion,activo]
                );
                const newUser = result.rows[0];
                const token = await createAccessToken({ id: newUser.Id_Persona });

                res.cookie("token", token);
                res.json(newUser);
            } else {
                // La tarea ya existe, puedes devolver un mensaje personalizado si lo deseas
                res.status(400).json({ error: "El nombre de Usuario ya existe." });
            }
                
        } else {
        // La tarea ya existe, puedes devolver un mensaje personalizado si lo deseas
            res
                .status(400)
                .json({ error: "El numero de Carnet de Identidad ya existe." });
        }
    } catch (error) {
    // Otros errores
    res.status(500).json({ message: error.message });
  }
};



const getUsers = async (req, res) => {
    try {
      const result = await pool.query("SELECT Persona.*,Usuario.Username,Usuario.Id_Rol,Usuario.Direccion,Usuario.Activo FROM Usuario,Persona Where Persona.Id=Usuario.Id_Persona");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  const getUser = async (req, res) => {
    const  username  = req.params.username;
    try {
      const result = await pool.query(
        "SELECT Persona.*,Usuario.Username,Usuario.Id_Rol,Usuario.Direccion,Usuario.Activo FROM Usuario,Persona Where Persona.Id=Usuario.Id_Persona and Usuario.Username = $1",
        [username]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado." });
      }
  
      const user = result.rows[0];
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteUser = async (req, res) => {
    const username = req.params.username;
    try {
      const result = await pool.query("DELETE FROM Usuario WHERE Username = $1", [
        username
      ]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado." });
      }
  
      res.sendStatus(204); // Indica que la eliminación se realizó con éxito
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updatePersonAndUser = async (req, res) => {
    const CI  = req.params.CI; // Obtén el número de cédula del parámetro de la ruta
    const { nombre, apellido, telefono, direccion, username, password, id_Rol, activo, newCI } = req.body;
  
    try {
      const result = await pool.query(
        `
        UPDATE Persona
        SET Nombre=$1, Apellido=$2, Telefono=$3, Direccion=$4, CI=$10
        WHERE CI = $5;
  
        UPDATE Usuario
        SET Username=$6, Password=$7, Id_Rol=$8, Activo=$9
        WHERE Id_Persona IN (SELECT Id FROM Persona WHERE CI = $5)
        RETURNING Usuario.Id_Persona, Username, Direccion, Activo;
        `,
        [nombre, apellido, telefono, direccion, CI, username, password, id_Rol, activo, newCI]
      );
  
      if (result[1].rowCount === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado." });
      }
  
      const updatedUser = result[1].rows[0];
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
  
  
  

module.exports = {
 CreateUsuario,
 updatePersonAndUser,
 deleteUser,
 getUsers,
 getUser,
};
