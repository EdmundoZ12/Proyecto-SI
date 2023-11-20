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


const clienteRoute = require('./routes/cliente.routes');
const MembresiaRoute = require('./routes/membresia.routes');




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


app.use('/cliente', clienteRoute);
app.use('/membresia', MembresiaRoute);









const getDisciplina = async(req, res) => {
    try {
        const value = await pool.query("select cod,nombre from disciplina");
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

const getTipo = async(req, res) => {
    try {
        const value = await pool.query("select id,tipo from pago");
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

app.get('/disciplina', getDisciplina);
app.get('/proveedor', getproveedor);
app.get('/tipo', getTipo);









module.exports = app;