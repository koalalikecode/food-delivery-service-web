const express = require("express");
const pug = require("pug");
const path = require("path");
const app = express();
const route = require("./routes");
const dbconnection = require("./config/db");

//Connect to db
dbconnection.connect((err) => {
  if (err) return err;
  console.log("Successfully connected to MySQL database");
});

//template engine
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(3000, () => console.log("listening on port 3000"));
