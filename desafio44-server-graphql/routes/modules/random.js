const express = require("express");
const randomNumberRouter = express.Router();

module.exports = (randomNumberController) => {
  randomNumberRouter.get("/randoms", randomNumberController);
  return randomNumberRouter;
};
