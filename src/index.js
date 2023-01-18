const express = require("express");
const pug = require("pug");
const path = require("path");
const app = express();
const route = require("./routes");

//template engine
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "public")));

route(app);

app.listen(3000, () => console.log("listening on port 3000"));
