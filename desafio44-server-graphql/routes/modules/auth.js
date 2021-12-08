const passport = require("passport");
const upload = require("../../utils/fileUpload");
const express = require("express");
const router = express.Router();

module.exports = ({ logIn, logOut, signUp, failureSignUp, failureLogIn }) => {
  router
    .post(
      "/login",
      passport.authenticate("login", {
        failureRedirect: "/wrong-login",
        successRedirect: "/productos",
      })
    )
    .post(
      "/signup",
      upload.single("avatarFile"),
      passport.authenticate("signup", {
        failureRedirect: "/user-exist",
        successRedirect: "/productos",
      })
    )
    .get(
      "/auth/facebook",
      passport.authenticate("facebook", { scope: "email" })
    )
    .get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", {
        failureRedirect: "/wrong-login",
        successRedirect: "/productos",
      })
    )
    .get("/login", logIn)
    .get("/logout", logOut)
    .get("/signup", signUp)
    .get("/user-exist", failureSignUp)
    .get("/wrong-login", failureLogIn);

  return router;
};
