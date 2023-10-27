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

const app=express()

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}));
app.use(morgan("dev"));
app.use(express.json( ))
app.use(cookieParser());

app.use('/api',authRoutes)
app.use('/api',rolesRoutes)
app.use('/api',funcionalidadRoutes)
app.use('/api',taskRoutes)
app.use('/api',userRoutes)

module.exports=app;
