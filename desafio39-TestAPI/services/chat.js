const MessageModel = require('../dao/models/messages')

module.exports = class {

    async getAllMessages(){
        try {
            return MessageModel.find({}).lean()
        } catch (error) {
            console.log(error)
        }
    }

    async saveMessage(message){
        try {
            const newMessage = await MessageModel.create(message);
            return newMessage;
        } catch (error) {
            console.log(error)
        }
        
    }
    async editMessage(id, messageUpdated){
        const messageToUpdate = await MessageModel.findByIdAndUpdate(id,messageUpdated, {new:true,})
        return messageToUpdate;

    }
    async deleteMessage(id){
        await MessageModel.findByIdAndDelete(id)
    }
}