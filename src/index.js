const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const pug = require("pug");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const route = require("./routes");
const dbconnection = require("./config/db");
const passport = require("passport");
const { passportConfig } = require("./config/passport");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(flash());

//Connect to db
dbconnection.connect((err) => {
  if (err) return err;
  console.log("Successfully connected to MySQL database");
});

// override with POST having ?_method=method
app.use(methodOverride("_method"));

// set up express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    key: "express.sid",
  })
);

// set up passportjs
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//template engine
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(3000, () => console.log("listening on port 3000"));
