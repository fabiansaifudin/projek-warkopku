const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host: (process.env.DB_HOST !== null) ? process.env.DB_HOST : "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: (process.env.DB_PORT !== null) ? process.env.DB_PORT : 3306
})

module.exports = conn;