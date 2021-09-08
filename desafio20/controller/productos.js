const ProductService = require('../services/products')

const product = new ProductService()

exports.addProduct = async (req,res,next) =>{
    const newProduct = await product.addProduct(req.body)
    res.json(newProduct)
}

exports.getAllProducts = async (req,res,next) =>{
    try {
        const products = await product.getAllProducts();
        res.json(products)
    } catch (error) {
        res.status(500).send(error);
    }

}

exports.getProduct = async (req,res,next) =>{
    res.json(await product.getProduct(req.params.id))
}

exports.updateProduct = async (req,res,next) =>{
    const {body, params} = req
    const updateProduct = await product.updateProduct(params.id, body)
    res.json(updateProduct)
}

exports.deleteProduct = async (req,res,next) =>{
    const productDeleted = await product.deleteProduct(req.params.id)
    res.json(productDeleted)
}