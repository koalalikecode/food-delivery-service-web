const mysql = require("mysql");

// config for the db
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "duy1681993",
  database: "restaurant_management",
});

module.exports = connection;
