const { TWILIO_AUTH_TOKEN, ACCOUNT_TWILIO_SID } = require("../config/globals");
const twilioClient = require("twilio")(ACCOUNT_TWILIO_SID, TWILIO_AUTH_TOKEN);

module.exports = async(smsContent)=>{
    try {
      await twilioClient.messages.create({
        body: smsContent,
        from: "+13204002218",
        to: "+541127531612",
      });
      
    } catch (error) {
      console.log(error);
    }
}