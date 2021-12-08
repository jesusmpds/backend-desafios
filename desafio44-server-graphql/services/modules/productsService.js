module.exports = class {
  constructor(productDao) {
    this.productDao = productDao;
  }
  async getProduct(id) {
    try {
      const Product = await this.productDao.getProduct(id);
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByName(name) {
    try {
      const Product = await this.productDao.getProductByName(name);
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByCode(code) {
    try {
      const Product = await this.productDao.getProductByCode(code);
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByPrice(min, max) {
    try {
      const Product = await this.productDao.getProductsByPrice(min, max);
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByStock(min, max) {
    try {
      const Product = await this.productDao.getProductsByStock(min, max);
      return Product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts(min, max) {
    try {
      const allProducts = await this.productDao.getAllProducts();
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(producto) {
    try {
      const product = await this.productDao.addProduct(producto);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(id, productUpdated) {
    try {
      const productToUpdate = await this.productDao.updateProduct(
        id,
        productUpdated
      );
      return productToUpdate;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      return await this.productDao.deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  }
};
