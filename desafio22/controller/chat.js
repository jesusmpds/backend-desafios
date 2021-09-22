const MessageService = require('../services/chat')
const message = new MessageService()
const normalizeData = require('../dao/models/schemaNormalizedMessages')

exports.saveMessage = async (socket, mensaje) =>{
    try {
        let messages = await message.saveMessage(mensaje);
        //Emitir nuevo mensaje al cliente
        socket.emit('newMessage', messages);
    } catch (error) {
        console.log(error)
    }
}

exports.getAllMessages = async () =>{
    try {
        const allMessages = await message.getAllMessages();
        // console.log(allMessages)
        const normalizedAllMessages = normalizeData(allMessages);
        // console.log(JSON.stringify(normalizeData(normalizedAllMessages), null, '\t'))
        return allMessages;
    } catch (error) {
        console.log(error)
    }
}

// exports.editMessage = async (req,res,next) =>{
//     try {
//         const {body, params} = req
//         const editMessage = await message.editMessage(params.id, body)
//         res.json(editMessage)
//     } catch (error) {
//         res.json(error)
//     }
// }

// exports.deleteMessage = async (req,res,next) =>{
//     try {
//         const deletedMessage = await message.deleteMessage(req.params.id)
//         res.json(deletedMessage)
//     } catch (error) {
//         res.json(error)
//     }
// }