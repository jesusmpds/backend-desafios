const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    username: String,
    date: { type: Date, default: Date.now },
    message: String
})

module.exports = model('Message', messageSchema)