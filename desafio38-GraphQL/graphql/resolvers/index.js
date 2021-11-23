const ProductService = require("../../services/products");
const product = new ProductService();

const getAllProducts = async (root, args, context, info) => {
  try {
    const allProducts = await product.getAllProducts();
    return allProducts;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (root, args, context, info) => {
  // root contains all the input params
  const AddedData = {
    name: root.inputs.name,
    description: root.inputs.description,
    code: root.inputs.code,
    imageURL: root.inputs.imageURL,
    price: root.inputs.price,
    stock: root.inputs.stock,
  };
  try {
    const newProduct = await product.addProduct(AddedData);
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

var resolvers = {
  getAllProducts: getAllProducts,
  addProduct: addProduct,
};
module.exports = resolvers;
