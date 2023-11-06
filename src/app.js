const express = require("express");
// const pool = require('pg');
const pool = require("../src/db");
const morgan = require('morgan');
const cors = require('cors');


const taskRoute = require('./routes/auth.routes.js');

const rolRoute = require('./routes/rol.routes.js');
const funcionalidadesRoute = require('./routes/funcionalidades.routes.js');
const proveedorRoute = require('./routes/proveedor.routes.js');
const inventarioRoute = require('./routes/inventario.routes.js');
const productoRoute = require('./routes/producto.routes.js');
const categoriaRoute = require('./routes/categoria.routes.js');



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
app.use('/proveedor', proveedorRoute);
app.use('/inventario', inventarioRoute);
app.use('/producto', productoRoute);
app.use('/categoria', categoriaRoute);






const getRoles = async(req, res) => {
    try {
        const value = await pool.query("select * from categoria");
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

const getproveedor = async(req, res) => {
    try {
        const value = await pool.query("select * from proveedor");
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

app.get('/categoria', getRoles);
app.get('/proveedor', getproveedor);








module.exports = app;