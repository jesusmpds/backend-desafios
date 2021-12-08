const {
  sendSMS,
  sendWhatsApp,
} = require("../../services/modules/twilioService");

exports.sendSMS = async (req, res, next) => {
  try {
    const { email, message } = req.body;
    const smsContent = `Solicitud: Admin, Usuario: ${email}, Mensaje: ${message}`;
    await sendSMS(smsContent);
    res.send("Message send succesfully");
  } catch (error) {
    res.status(400).send("Message failed");
    console.log(error);
  }
};

exports.sendWhatsApp = async (req, res) => {
  try {
    const { email, message } = req.body;
    const content = `Solicitud: Admin, Usuario: ${email}, Mensaje: ${message}`;
    await sendWhatsApp(content);
    res.send("Message send succesfully");
  } catch (error) {
    res.status(400).send("Message failed");
    console.log(error);
  }
};
