const {transporterEthereal,transporterGmail} = require('../services/emailService')
const { emailHTML } = require('../utils/emailHTML');
const nodemailer = require("nodemailer");

exports.etherealSendMail = async ({username,date,message}) =>{
    try {
        let info = await transporterEthereal.sendMail({
            from: "rachael.connelly@ethereal.email",
            to: 'jesusmpds18@gmail.com',
            subject: `${message} ${date}`,
            html: emailHTML({username,date,message})
        });
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error)
    }
    
}

exports.gmailSendMail = async ({username,date,message,picture}) =>{
    try {
        await transporterGmail.sendMail({
            from: "Servidor",
            to: 'jesusmpds18@gmail.com',
            subject: `${message} ${date}` ,
            html: emailHTML({username,date,message}),
            attachments: 
                {   // use URL as an attachment
                    filename: 'profilepic.jpeg',
                    path: picture,
                }
        });
    } catch (error) {
        console.log(error)
    }
}