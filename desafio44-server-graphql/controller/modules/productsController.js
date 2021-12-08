const logger = require("../../services/modules/loggerService");

module.exports = class {
  constructor(productService) {
    this.productService = productService;
  }

  async addProduct(req, res, next) {
    try {
      const newProduct = await this.productService.addProduct(req.body);
      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const oneProduct = await this.productService.getProduct(req.params.id);
      res.status(200).json(oneProduct);
    } catch (error) {
      next(error);
    }
  }

  async getProductByName(req, res, next) {
    try {
      const oneProduct = await this.productService.getProductByName(
        req.params.name
      );
      return oneProduct;
    } catch (error) {
      next(error);
    }
  }

  async getProductByCode(req, res, next) {
    try {
      const oneProduct = await this.productService.getProductByCode(
        req.params.code
      );
      return oneProduct;
    } catch (error) {
      next(error);
    }
  }

  async getProductsByPrice(req, res, next) {
    try {
      const { min, max } = req.query;
      const products = await this.productService.getProductsByPrice(min, max);
      return products;
    } catch (error) {
      next(error);
    }
  }

  async getProductsByStock(req, res, next) {
    try {
      const { min, max } = req.query;
      const products = await this.productService.getProductsByStock(min, max);
      return products;
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { body, params } = req;
      const updateProduct = await this.productService.updateProduct(
        params.id,
        body
      );
      res.json(updateProduct);
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const productDeleted = await this.productService.deleteProduct(
        req.params.id
      );
      res.json(productDeleted);
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }
};
