let mysql = require("mysql");
require('dotenv').config()

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth: true,
    multipleStatements: true,
    connectionLimit : 1000,
});

connection.connect(function(err) {
    if (err) {
        return console.error(err.message.red.underline.bold);
    }
    console.log("Connected to the MySQL server.".yellow.underline.bold);
});

module.exports = connection;