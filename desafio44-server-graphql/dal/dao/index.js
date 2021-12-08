const productDao = require("./modules/productDao");
const cartDao = require("./modules/cartDao");
let { productsModel, cartModel } = require("../models/index");

module.exports = {
  productDao: new productDao(productsModel),
  cartDao: new cartDao(cartModel),
};
