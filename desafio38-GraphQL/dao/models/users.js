const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  first_name: String,
  last_name: String,
  age: Number,
  phone: String,
  address:String,
  password: String,
  avatarUrl: String,
  facebookID: String,
});

module.exports = model("User", userSchema);