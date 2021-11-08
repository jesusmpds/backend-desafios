const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  last_name: String,
  first_name: String,
  middle_name: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
  picture: String,
  facebookID: String,
});

module.exports = model("User", userSchema);