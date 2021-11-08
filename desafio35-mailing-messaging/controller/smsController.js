const smsService = require('../services/smsService')

exports.sendSMS = async (req,res,next)=>{
    try {
        const {email,message} = req.body;
        const smsContent = `Solicitud: Admin, Usuario: ${email}, Mensaje: ${message}`
        await smsService(smsContent)
        res.send('Message send succesfully')
    } catch (error) {
        res.status(400).send('Message failed')
        console.log(error)
    }
}