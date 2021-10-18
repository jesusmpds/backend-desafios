const express = require('express')
const productosAPIRouter = express.Router()
let productController = require('../controller/productos')

productosAPIRouter
    .get('/listar', productController.getAllProducts)
    .post('/agregar',productController.addProduct)
    .patch('/actualizar/:id',productController.updateProduct)
    .delete('/borrar/:id',productController.deleteProduct)
    .get('/listar/:id', productController.getProduct);

module.exports = productosAPIRouter;