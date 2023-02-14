const mysql = require("mysql");
require("dotenv").config();

// config for the db
let connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "restaurant_management",
  multipleStatements: true,
});

module.exports = connection;
