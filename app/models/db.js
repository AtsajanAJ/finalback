const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

//Connection with database models
// const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

// db.js
require("dotenv").config()
const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect((error)=>{
    if(error) console.log("MySQL Connection: " +error);
    else console.log("Suscessfully connected to the database.");
});
module.exports = connection;