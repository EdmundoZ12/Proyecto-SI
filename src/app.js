const express = require("express");
const pool = require('pg');
const morgan = require('morgan');
const cors = require('cors');


const taskRoute = require('./routes/auth.routes.js');

const rolRoute = require('./routes/rol.routes.js');
const funcionalidadesRoute = require('./routes/funcionalidades.routes.js');



const app = express()


const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

app.use(taskRoute);
app.use('/rol', rolRoute);
app.use('/permiso', funcionalidadesRoute);




module.exports = app;