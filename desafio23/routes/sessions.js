const express = require("express");
const sessionsRouter = express.Router()
const { logIn, goodBye, logOut} = require('../controller/auth')

sessionsRouter
            .post('/login', logIn)
            .post('/logout', logOut)

module.exports = sessionsRouter;