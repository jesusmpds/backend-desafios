const ProductService = require("../services/products");

exports.addProduct = async (socket, producto) => {
  try {
    const newProduct = await ProductService.addProduct(producto);
    socket.emit("newProduct", newProduct);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProducts = async () => {
  try {
    const allProducts = await ProductService.getAllProducts();
    return allProducts;
  } catch (error) {
    console.log(error);
  }
};

// exports.getProduct = async (req,res,next) =>{
//     try {
//         const oneProduct = await ProductService.getProduct(req.params.id);
//         res.json(oneProduct);
//     } catch (error) {
//         res.json(error)
//     }
// }

// exports.updateProduct = async (req,res,next) =>{
//     try {
//         const {body, params} = req
//         const updateProduct = await ProductService.updateProduct(params.id, body)
//         res.json(updateProduct)
//     } catch (error) {
//         res.json(error)
//     }
// }

// exports.deleteProduct = async (req,res,next) =>{
//     try {
//         const productDeleted = await ProductService.deleteProduct(req.params.id)
//         res.json(productDeleted)
//     } catch (error) {
//         res.json(error)
//     }
// }
