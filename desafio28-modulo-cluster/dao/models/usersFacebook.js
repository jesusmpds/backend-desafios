const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: String,
  last_name: String,
  first_name: String,
  middle_name: String,
  picture: String,
});

module.exports = model("User", userSchema);