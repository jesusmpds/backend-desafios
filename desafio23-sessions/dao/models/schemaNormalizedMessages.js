const { schema, normalize } = require('normalizr')

// const userSchema = new schema.Entity('author',{},{idAttribute:'email'});

// const text = new schema.Entity('messages')

// const date = new schema.Entity('dates')

const chatSchema = new schema.Entity('chat',{},{idAttribute:'_id'})

const chat = [chatSchema]

module.exports = (originalData) => normalize(originalData,chat)