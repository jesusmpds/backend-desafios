const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    username: String,
    date: { type: Date, default: Date.now },
    msg: String
},{ collection: 'mensajes' })

module.exports = model('Message', messageSchema)