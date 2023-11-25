const { Pool } = require('pg');
const { db } = require('./config');

// const pool=new Pool({
//     connectionString:'postgres://edmundo:O9TaecdxXFPRfGxjTB40ME4h9IqqoI99@dpg-cl8jmjn6e7vc73a7449g-a.oregon-postgres.render.com/dbgimmasio',
//     ssl:true
// });

const pool = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'dbgimnasio'
})



module.exports = pool;