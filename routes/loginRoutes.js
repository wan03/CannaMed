const authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  app.get("/logout", authController.logout);
  app.post(
    "/signin",
    passport.authenticate(
      "local-signin",
      {
        successRedirect: "/dashboard",
        failureRedirect: "/signin"
      },
      authController.signIn
    )
  );
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("here!------------");
      return next();
    }
    console.log("NOT here!------------");
    res.redirect("/signin");
  }
};
