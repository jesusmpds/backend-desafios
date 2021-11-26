const productDao = require("./productDao");
const cartDao = require("./cartDao");
let { productsModel, cartModel } = require("../models/index");

module.exports = {
  productDao: new productDao(productsModel),
  cartDao: new cartDao(cartModel),
};
