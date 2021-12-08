const { productsService } = require("../../services/index");

const getAllProducts = async (root, args, context, info) => {
  try {
    const allProducts = await productsService.getAllProducts();
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
    const newProduct = await productsService.addProduct(AddedData);
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async ({ _id, inputs }) => {
  try {
    console.log({ _id, inputs });
    const updateProduct = await productsService.updateProduct(_id, inputs);
    return updateProduct;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async ({ _id }) => {
  try {
    const productDeleted = await productsService.deleteProduct(_id);
    res.json(productDeleted);
  } catch (error) {
    console.log(error);
  }
};

var resolvers = {
  getAllProducts: getAllProducts,
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
module.exports = resolvers;
