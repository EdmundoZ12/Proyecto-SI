const { config } = require("dotenv");
config();

module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTPG,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
  TOKEN_SECRET: 'some_secret_key3', // Clave secreta del token de acceso
  REFRESH_TOKEN_SECRET: 'some_refresh_secret_key', // Clave secreta del refresh token
};
