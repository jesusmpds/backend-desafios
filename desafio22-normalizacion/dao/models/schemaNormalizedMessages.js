const { schema, normalize } = require('normalizr')

const userSchema = new schema.Entity('author',{},{idAttribute:'email'});

const documentSchema = new schema.Entity('messages',{
    author: userSchema,
},{idAttribute:(value) => value._id.toString()})

const chatSchema = new schema.Entity('chat', {
    content: [documentSchema]
  })


module.exports = (originalData) => normalize(originalData,chatSchema)