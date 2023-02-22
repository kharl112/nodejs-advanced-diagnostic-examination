const mysql = require("mysql2");

require("dotenv").config()

// Open the connection to MySQL server
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

// Run create database statement
connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`,
    function (err, results) {
        if (err) return console.error(err);
        return console.log(`database created`);
    }
);

// Close the connection
connection.end();
