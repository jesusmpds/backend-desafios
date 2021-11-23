const express = require("express");
const twilioRouter = express.Router();
const { sendSMS, sendWhatsApp } = require("../controller/twilioController");

twilioRouter.post("/send-sms", sendSMS).post("/send-whatsapp", sendWhatsApp);

module.exports = twilioRouter;
