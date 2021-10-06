const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

module.exports = model("User", userSchema);