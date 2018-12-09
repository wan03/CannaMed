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

  app.post("/signin", passport.authenticate("local-signin"), function(
    req,
    res
  ) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(req.user, "req.user ---------------");
    console.log("right before redirect");
    res.redirect("/dashboard");
  });
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("here!------------");
      return next();
    }
    console.log("NOT here!------------");
    res.redirect("/signin");
  }
};
