const cartService = require("./modules/cartService");
const chatService = require("./modules/chatService");
const twilioService = require("./modules/twilioService");
const productsService = require("./modules/productsService");
const { productDao, cartDao } = require("../dal/dao/index");
const { chatRepository } = require("../dal/repository/index");
const emailService = require("./modules/emailService");

module.exports = {
  cartService: new cartService(cartDao),
  chatService: new chatService(chatRepository),
  productsService: new productsService(productDao),
  twilioService,
};
