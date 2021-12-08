const express = require("express");
const twilioRouter = express.Router();

module.exports = ({ sendSMS, sendWhatsApp }) => {
  twilioRouter.post("/send-sms", sendSMS).post("/send-whatsapp", sendWhatsApp);

  return twilioRouter;
};
