const express = require('express')
const smsRouter = express.Router()
const {sendSMS}= require('../controller/smsController')

smsRouter.post('/send-sms', sendSMS)

module.exports = smsRouter;