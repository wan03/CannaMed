const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const db = require("./models");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();
require("./config/passport")(passport);

// Middleware
app.use(express.static("public"));
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "vidyapathaisalwaysrunningintheworld",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./config/passport.js")(passport, db.user);
require("./routes/loginRoutes")(app, passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize
  .sync(syncOptions)
  .then(function() {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  })
  .catch(function(error) {
    console.error(error);
  });

module.exports = app;
