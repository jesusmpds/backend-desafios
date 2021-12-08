const express = require("express");
const processInfoRouter = express.Router();
const { processInfo } = require("../../utils/processInfo");

processInfoRouter.get("/info", (req, res, next) => {
  return res.status(200).json(processInfo);
});

module.exports = processInfoRouter;
