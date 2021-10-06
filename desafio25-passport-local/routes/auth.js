const express = require("express");
const passport = require("passport");
const sessionsRouter = express.Router()
const {logIn, logOut, signUp, failureSignUp, failureLogIn} = require('../controller/auth')

sessionsRouter
            .post('/login', passport.authenticate('login', {failureRedirect: '/productos/wrong-login', successRedirect: '/productos'}))
            .post('/signup', passport.authenticate('signup', {failureRedirect: '/productos/user-exist', successRedirect: '/productos'}))
            .get('/login', logIn)
            .get('/logout', logOut)
            .get('/signup', signUp)
            .get('/user-exist', failureSignUp)
            .get('/wrong-login', failureLogIn)

module.exports = sessionsRouter;