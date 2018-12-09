//load bcrypt
const bCrypt = require("bcrypt-nodejs");
const db = require("../models");

module.exports = function(passport, user) {
  var User = db.User;
  var LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.log("deserialize outer");
    console.log(id + "deserialize outer id");
    
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
        console.log("deserialize good");
      } else {
        done(user.errors, null);
        console.log(user.errors);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, username, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({ where: { username: username } }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That username is already taken"
            });
          } else {
            var userPassword = generateHash(password);
            var data = { username: username, password: userPassword };

            User.create(data).then(function(newUser) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, username, password, done) {
        var User = user;
console.log("login in outer");
        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        db.User.findOne({ where: { username: username } })
          .then(function(user) {
            if (!user) {
              console.log("Username does not exist");
              return done(null, false, { message: "Username does not exist" });
            }

            if (!isValidPassword(user.password, password)) {
              console.log("Incorrect password.");
              return done(null, false, { message: "Incorrect password." });
            }

            var userinfo = user.get();

            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);
            console.log("Something went wrong with your Signin");
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};
