const express = require("express");
const passport = require("passport");
const sessionsRouter = express.Router()
const {logIn, logOut, signUp, failureSignUp, failureLogIn} = require('../controller/auth')

sessionsRouter
            .post('/login', passport.authenticate('login', {failureRedirect: '/wrong-login', successRedirect: '/productos'}))
            .post('/signup', passport.authenticate('signup', {failureRedirect: '/user-exist', successRedirect: '/productos'}))
            .get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}))
            .get('/auth/facebook/callback',passport.authenticate('facebook', {failureRedirect: '/wrong-login', successRedirect: '/productos'}))
            .get('/login', logIn)
            .get('/logout', logOut)
            .get('/signup', signUp)
            .get('/user-exist', failureSignUp)
            .get('/wrong-login', failureLogIn)

module.exports = sessionsRouter;