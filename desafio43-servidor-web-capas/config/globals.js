require("dotenv").config();
const { argvVariables } = require("../utils/processInfo");

module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "",
  SECRET: process.env.SECRET,
  FACEBOOK_APP_ID: parseInt(argvVariables[1]) || process.env.FACEBOOK_APP_ID,
  FACEBOOK_SECRET_ID: argvVariables[2] || process.env.FACEBOOK_SECRET_ID,
  PASS_GMAIL: process.env.PASS_GMAIL,
  ACCOUNT_TWILIO_SID: process.env.ACCOUNT_TWILIO_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
