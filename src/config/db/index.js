const mysql = require("mysql");

// config for the db
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "duy1681993",
  database: "duy",
});

module.exports = connection;
