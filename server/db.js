const dotenv = require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
});


pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
    console.log("Connected to PostgreSQL database!");
    release();
});


module.exports = pool;
