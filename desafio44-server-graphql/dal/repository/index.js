const chatRepository = require("./chatRepository");
let { messagesModel } = require("../models/index");

module.exports = {
  chatRepository: new chatRepository(messagesModel),
};
