const express=require("express");
const pool = require('pg');
const morgan=  require('morgan');
const authRoutes=require('./routes/auth.routes');
const rolesRoutes = require('./routes/rol.routes');
const taskRoutes = require('./routes/tasks.routes');
const userRoutes = require('./routes/users.routes');
const funcionalidadRoutes = require('./routes/funcionalidades.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const proveedorRoute = require('./routes/proveedor.routes');
const inventarioRoute = require('./routes/inventario.routes');
const productoRoute = require('./routes/producto.routes');
const categoriaRoute = require('./routes/categoria.routes');
const nota_de_entradaRoute = require('./routes/nota_de_entrada.routes');
const horario = require('./routes/horario.routes');
const disciplina = require('./routes/disciplina.routes');
const entrenadores = require('./routes/entrenador.routes');
const clienteRoute = require('./routes/cliente.routes');
const clienteRoute2 = require('./routes/clientes.routes');
const MembresiaRoute = require('./routes/membresia.routes');
const BitacoraRoute=require('./routes/bitacora.routes');
const ReportesRoute=require('./routes/reporte.routes');
const FacturasRoute=require('./routes/factura.routes');
const app=express()

app.use(cors({
    origin:"https://wilsongym-b7e6c.web.app",
    credentials:true
}));

app.use(morgan("dev"));
app.use(express.json( ))
app.use(cookieParser());

app.use('/api',authRoutes)
app.use('/api',ReportesRoute)
app.use('/api',FacturasRoute)
app.use('/api',nota_de_entradaRoute)
app.use('/api',BitacoraRoute)
app.use('/api',entrenadores)
app.use('/api',disciplina)
app.use('/api',rolesRoutes)
app.use('/api',horario)
app.use('/api',funcionalidadRoutes)
app.use('/api',taskRoutes) 
app.use('/api',userRoutes)
app.use('/api', proveedorRoute);
app.use('/api', inventarioRoute);
app.use('/api', productoRoute);
app.use('/api', categoriaRoute);
app.use('/cliente', clienteRoute);
app.use('/api', clienteRoute2);
app.use('/membresia', MembresiaRoute);


module.exports=app;
