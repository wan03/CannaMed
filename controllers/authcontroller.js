const path = require("path");
var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.sendFile(path.join(__dirname + "/../public" + "/index.html"));
};

exports.signin = function(req, res) {
  res.sendFile(path.join(__dirname + "/../public" + "/index.html"));
};

exports.signIn = function(req, res) {
  console.log(res);
};

exports.dashboard = function(req, res) {
  res.sendFile(path.join(__dirname + "/../public" + "/dashboard.html"));
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
};
