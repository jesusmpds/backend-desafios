const express = require('express')
const productosAPIRouter = express.Router()
let productController = require('../controller/productos')

productosAPIRouter
    .get('/', productController.getAllProducts)
    .post('/',productController.addProduct)
    .patch('/:id',productController.updateProduct)
    .delete('/:id',productController.deleteProduct)
    .get('/name/:name', productController.getProductByName)
    .get('/code/:code', productController.getProductByCode)
    .get('/price', productController.getProductsByPrice)
    .get('/stock', productController.getProductsByStock)
    .get('/:id', productController.getProduct)
    

module.exports = productosAPIRouter;