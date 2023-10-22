const express = require("express");
const pool = require('pg');
const morgan = require('morgan');


const taskRoute = require('./routes/auth.routes.js');
const rolRoute = require('./routes/rol.routes.js');


const app = express()

app.use(morgan("dev"));
app.use(express.json())

app.use(taskRoute);
app.use('/rol', rolRoute);



module.exports = app;