const express = require("express");
const pug = require("pug");
const path = require("path");
const app = express();
const route = require("./routes");

//template engine
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(3000);
