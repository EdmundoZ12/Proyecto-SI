const {Pool} = require('pg');
const {db} = require('./config');
const { config } = require("dotenv");
config()

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
    /*user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database*/
});

module.exports=pool;