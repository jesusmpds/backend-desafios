const ProductService = require('../services/products')

const product = new ProductService()

exports.addProduct = async (socket,producto) =>{
    try {
        const newProduct = await product.addProduct(producto);
        socket.emit('newProduct', newProduct);
    } catch (error) {
        console.log(error);
    }
}

exports.getAllProducts = async () =>{
    try {
        const allProducts = await product.getAllProducts();
        return allProducts;
    } catch (error) {
        console.log(error)
    }
}

// exports.getProduct = async (req,res,next) =>{
//     try {
//         const oneProduct = await product.getProduct(req.params.id);
//         res.json(oneProduct);
//     } catch (error) {
//         res.json(error)
//     }
// }

// exports.updateProduct = async (req,res,next) =>{
//     try {
//         const {body, params} = req
//         const updateProduct = await product.updateProduct(params.id, body)
//         res.json(updateProduct)
//     } catch (error) {
//         res.json(error)
//     }
// }

// exports.deleteProduct = async (req,res,next) =>{
//     try {
//         const productDeleted = await product.deleteProduct(req.params.id)
//         res.json(productDeleted)
//     } catch (error) {
//         res.json(error)
//     }
// }