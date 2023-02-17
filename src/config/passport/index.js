// config/passport.js
const bcrypt = require("bcrypt");
const saltRounds = 10;

// load all the things we need
const LocalStrategy = require("passport-local").Strategy;

const connection = require("../db");
// expose this function to our app using module.exports
function passportConfig(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    connection.query(
      "select * from users where id = " + id,
      function (err, rows) {
        done(err, rows[0]);
      }
    );
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query(
          "select * from users where email = '" + email + "'",
          function (err, rows) {
            console.log(rows);
            console.log("above row object");
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              // if there is no user with that email
              // create the user
              let newUserMysql = new Object();
              const hash = bcrypt.hashSync(password, saltRounds);
              let hashPassword = hash;
              newUserMysql.password = hash;

              const insertQuery =
                "INSERT INTO users ( email, password ) values (?, ?)";
              connection.query(
                insertQuery,
                [email, hashPassword],
                function (err, rows) {
                  console.log(rows);
                  newUserMysql.id = rows.insertId;

                  return done(null, newUserMysql);
                }
              );
            }
          }
        );
      }
    )
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, email, password, done) {
        // callback with email and password from our form

        connection.query(
          "SELECT * FROM `users` WHERE `email` = '" + email + "'",
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found.")
              ); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            const match = bcrypt.compareSync(password, rows[0].password);
            if (!match)
              return done(
                null,
                false,
                req.flash("loginMessage", "Oops! Wrong password.")
              ); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);
          }
        );
      }
    )
  );
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = {
  passportConfig,
  ensureAuthenticated,
};
