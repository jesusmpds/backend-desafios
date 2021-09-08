const express = require('express')
const productosAPIRouter = express.Router()
let productController = require('../controller/productos')

productosAPIRouter
    .get('/listar', productController.getAllProducts)
    .get('/listar/:id',productController.getProduct)
    .post('/agregar',productController.addProduct)
    .patch('/actualizar/:id',productController.updateProduct)
    .delete('/borrar/:id',productController.deleteProduct);

module.exports = productosAPIRouter;