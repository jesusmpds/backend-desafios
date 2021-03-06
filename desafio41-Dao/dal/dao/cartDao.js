const logger = require("../../services/loggerService");
const { cartDTO } = require("../dto/cart.dto");
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getAllCartItems(userId) {
    try {
      const allItems = await this.model
        .findOne({ userId })
        .populate(["products"])
        .lean();

      return cartDTO(allItems);
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await this.model.create(cart);
      await newCart.populate(["products", "user"]);
      return newCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, newProduct) {
    try {
      const cartUpdated = await this.model.updateOne(
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
      const cartToDelete = await this.model.deleteOne(user);
      return cartToDelete;
    } catch (error) {
      logger.error(error);
    }
  }
};
