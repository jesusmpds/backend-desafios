const ProductService = require('../services/products')

const product = new ProductService()

const logger = require('../services/loggerService');
const { Console } = require('winston/lib/winston/transports');

exports.addProduct = async (req ,res,next) =>{
    try {
        const newProduct = await product.addProduct(req.body);
        res.json(newProduct);
    } catch (error) {
        res.json(error);
    }
}

exports.getAllProducts = async (req,res,next) =>{
    try {
        const allProducts = await product.getAllProducts();
        return allProducts;
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.json(error);
    }
}

exports.getProduct = async (req,res,next) =>{
    try {
        const oneProduct = await product.getProduct(req.params.id);
        res.json(oneProduct);
    } catch (error) {
        res.json(error)
    }
}

exports.getProductByName = async (req,res,next) =>{
    try {
        const oneProduct = await product.getProductByName(req.params.name);
        return oneProduct;
    } catch (error) {
        console.log(error)
    }
}

exports.getProductByCode = async (req,res,next) =>{
    try {
        const oneProduct = await product.getProductByCode(req.params.code);
        return oneProduct;
    } catch (error) {
        console.log(error)
    }
}

exports.getProductsByPrice = async (req,res,next) =>{
    try {
        const {min, max} = req.query;
        const products = await product.getProductsByPrice(min,max);
        return products;
    } catch (error) {
        console.log(error)
    }
}

exports.getProductsByStock = async (req,res,next) =>{
    try {
        const {min, max} = req.query;
        const products = await product.getProductsByStock(min,max);
        return products;
    } catch (error) {
        console.log(error)
    }
}

exports.updateProduct = async (req,res,next) =>{
    try {
        const {body, params} = req
        const updateProduct = await product.updateProduct(params.id, body)
        return updateProduct;
    } catch (error) {
        console.log(error)
    }
}

exports.deleteProduct = async (req,res,next) =>{
    try {
        const productDeleted = await product.deleteProduct(req.params.id)
        return productDeleted;
    } catch (error) {
        logger.error(`Error: ${error}`)
    }
}