const { productDao } = require("../dal/dao/index");

exports.getProduct = async (id) => {
  try {
    const Product = await productDao.getProduct(id);
    return Product;
  } catch (error) {
    console.log(error);
  }
};

exports.getProductByName = async (name) => {
  try {
    const Product = await productDao.getProductByName(name);
    return Product;
  } catch (error) {
    console.log(error);
  }
};

exports.getProductByCode = async (code) => {
  try {
    const Product = await productDao.getProductByCode(code);
    return Product;
  } catch (error) {
    console.log(error);
  }
};

exports.getProductsByPrice = async (min, max) => {
  try {
    const Product = await productDao.getProductsByPrice(min, max);
    return Product;
  } catch (error) {
    console.log(error);
  }
};

exports.getProductsByStock = async (min, max) => {
  try {
    const Product = await productDao.getProductsByStock(min, max);
    return Product;
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProducts = async () => {
  try {
    const allProducts = await productDao.getAllProducts();
    return allProducts;
  } catch (error) {
    console.log(error);
  }
};
exports.addProduct = async (producto) => {
  try {
    const product = await productDao.addProduct(producto);
    return product;
  } catch (error) {
    console.log(error);
  }
};
exports.updateProduct = async (id, productUpdated) => {
  try {
    const productToUpdate = await productDao.updateProduct(id, productUpdated);
    return productToUpdate;
  } catch (error) {
    console.log(error);
  }
};
exports.deleteProduct = async (id) => {
  try {
    return await productDao.deleteProduct(id);
  } catch (error) {
    console.log(error);
  }
};
