const express = require('express')
const randomNumberRouter = express.Router()
const randomNumberController = require("../controller/randomNumber")

randomNumberRouter.get("/randoms", randomNumberController);

module.exports = randomNumberRouter;