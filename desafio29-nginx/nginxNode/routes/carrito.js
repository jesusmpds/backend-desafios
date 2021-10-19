const express = require('express')
const carritoRouter = express.Router()
let cart = require('../controller/carrito')

carritoRouter.get('/listar', (req,res)=> {
    if(cart.showProducts().length === 0) {
        return res.json({'error': 'no hay productos cargados'})
    }
    res.json(cart.showProducts())
})

carritoRouter.get('/listar/:id', (req,res)=>{
    let productsCart = cart.showProducts();
    let cartProductByID = productsCart.find(product => product.id === parseInt(req.params.id))
    if (cartProductByID === undefined){
        return res.json({error : 'producto no encontrado'})
    }
    res.json(cartProductByID)
})

carritoRouter.post('/agregar/:id', (req,res)=>{
    cart.addProduct(parseInt(req.params.id))
    res.json(cart.showProducts())
})

carritoRouter.delete('/borrar/:id', (req,res)=>{
    cart.removeProduct(parseInt(req.params.id))
    res.json(cart.showProducts())
})

module.exports = carritoRouter;
