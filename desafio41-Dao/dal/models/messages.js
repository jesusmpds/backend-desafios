const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    author: {
      email: String,
      firstName: String,
      lastName: String,
      age: String,
      avatar: String,
    },
    text: String,
  },
  { collection: "mensajes" }
);

module.exports = model("Message", messageSchema);
