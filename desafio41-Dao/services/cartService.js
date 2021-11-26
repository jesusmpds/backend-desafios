const { cartDao } = require("../dal/dao/index");
const logger = require("./loggerService");

exports.getAllCartItems = async (userId) => {
  try {
    return cartDao.getAllCartItems(userId);
  } catch (error) {
    logger.error(error);
  }
};

exports.addCart = async (cart) => {
  try {
    const newCart = await cartDao.addCart(cart);
    await newCart.populate(["products", "user"]);
    return newCart;
  } catch (error) {
    logger.error(error);
  }
};

exports.updateCart = async (id, newProduct) => {
  try {
    const cartUpdated = await cartDao.updateCart(id, newProduct);
    return cartUpdated;
  } catch (error) {
    logger.error(error);
  }
};

exports.deleteCart = async (user) => {
  try {
    const cartToDelete = await cartDao.deleteCart(user);
    return cartToDelete;
  } catch (error) {
    logger.error(error);
  }
};
