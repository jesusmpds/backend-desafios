module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getProduct(id) {
    try {
      const Product = await this.model.findById(id);
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByName(name) {
    try {
      const Product = await this.model.findOne({ name: name }).lean();
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByCode(code) {
    try {
      const Product = await this.model.findOne({ code: code }).lean();
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByPrice(min, max) {
    try {
      const Product = await this.model
        .find({ price: { $gte: min, $lte: max } })
        .lean();
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByStock(min, max) {
    try {
      const Product = await this.model
        .find({ stock: { $gte: min, $lte: max } })
        .lean();
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    try {
      const allProducts = await this.model.find().lean();
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(producto) {
    try {
      const product = await this.model.create(producto);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(id, productUpdated) {
    try {
      const productToUpdate = await this.model.findByIdAndUpdate(
        id,
        productUpdated,
        { new: true }
      );
      return productToUpdate;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    await this.model.findByIdAndDelete(id);
  }
};
