const ProductService = require("../services/products");

const logger = require("../services/loggerService");

exports.addProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductService.addProduct(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await ProductService.getAllProducts();
    return allProducts;
  } catch (error) {
    logger.error(`Error: ${error}`);
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const oneProduct = await ProductService.getProduct(req.params.id);
    res.status(200).json(oneProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProductByName = async (req, res, next) => {
  try {
    const oneProduct = await ProductService.getProductByName(req.params.name);
    return oneProduct;
  } catch (error) {
    next(error);
  }
};

exports.getProductByCode = async (req, res, next) => {
  try {
    const oneProduct = await ProductService.getProductByCode(req.params.code);
    return oneProduct;
  } catch (error) {
    next(error);
  }
};

exports.getProductsByPrice = async (req, res, next) => {
  try {
    const { min, max } = req.query;
    const products = await ProductService.getProductsByPrice(min, max);
    return products;
  } catch (error) {
    next(error);
  }
};

exports.getProductsByStock = async (req, res, next) => {
  try {
    const { min, max } = req.query;
    const products = await ProductService.getProductsByStock(min, max);
    return products;
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { body, params } = req;
    const updateProduct = await ProductService.updateProduct(params.id, body);
    res.json(updateProduct);
  } catch (error) {
    logger.error(`Error: ${error}`);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productDeleted = await ProductService.deleteProduct(req.params.id);
    res.json(productDeleted);
  } catch (error) {
    logger.error(`Error: ${error}`);
    next(error);
  }
};
