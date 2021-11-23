const CartModel = require("../dao/models/cart");
const logger = require("../services/loggerService");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = class {
  async getAllCartItems(userId) {
    try {
      return CartModel.findOne({ userId })
        .populate(["products", "user"])
        .lean();
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await CartModel.create(cart);
      await newCart.populate(["products", "user"]);
      return newCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, newProduct) {
    try {
      const cartUpdated = await CartModel.updateOne(
        { user: id },
        { $push: { products: newProduct } },
        {
          new: true,
        }
      );
      return cartUpdated;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(user) {
    try {
      const cartToDelete = await CartModel.deleteOne(user);
      return cartToDelete;
    } catch (error) {
      logger.error(error);
    }
  }
};
