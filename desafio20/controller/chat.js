const MessageService = require('../services/chat')
const message = new MessageService()

exports.saveMessage = async (mensaje) =>{
    try {
        let messages = await message.saveMessage({
            username:mensaje.username, 
            msg: mensaje.messageBody
          });
        console.log(mensaje)
        console.log(messages)
        //Emitir nuevo mensaje al cliente
        io.emit('newMessage', messages);
    } catch (error) {
        console.log(error)
    }
}

exports.getAllMessages = async () =>{
    try {
        const allMessages = await message.getAllMessages();
        console.log(allMessages)
        return allMessages;
    } catch (error) {
        console.log(error)
    }
}

exports.editMessage = async (req,res,next) =>{
    try {
        const {body, params} = req
        const editMessage = await message.editMessage(params.id, body)
        res.json(editMessage)
    } catch (error) {
        res.json(error)
    }
}

exports.deleteMessage = async (req,res,next) =>{
    try {
        const deletedMessage = await message.deleteMessage(req.params.id)
        res.json(deletedMessage)
    } catch (error) {
        res.json(error)
    }
}