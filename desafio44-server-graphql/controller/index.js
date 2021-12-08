const {
  cartService,
  chatService,
  productsService,
} = require("../services/index");
const cartController = require("./modules/cartController");
const chatController = require("./modules/chatController");
const productsController = require("./modules/productsController");
const productsWebSocketController = require("./modules/productSocket");
const authController = require("./modules/authController");
const randomNumberController = require("./modules/randomNumber");
const twilioController = require("./modules/twilioController");

module.exports = {
  cartController: new cartController(cartService),
  chatController: new chatController(chatService),
  productsController: new productsController(productsService),
  productsWebSocketController: new productsWebSocketController(productsService),
  authController,
  randomNumberController,
  twilioController,
};
