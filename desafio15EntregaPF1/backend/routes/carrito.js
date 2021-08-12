const express = require('express')
const carritoRouter = express.Router()
let cart = require('../controller/carrito')

carritoRouter.get('/listar', (req,res)=> {
    if(cart.read().length === 0) {
        res.json({'error': 'no hay productos cargados'})
    }
    res.json(cart.read())
})

carritoRouter.get('/listar/:id', (req,res)=>{
    let productByID = cart.read().find(product => product.id === parseInt(req.params.id))
    if (productByID === undefined){
        res.json({error : 'producto no encontrado'})
    }
    res.json(productByID)
})

carritoRouter.post('/agregar', (req,res)=>{
    const {name, description, imageURL, price, stock} = req.body
    cart.guardar(name,description,imageURL,price,stock)
    res.json('cart')
})

carritoRouter.put('/actualizar/:id',(req,res)=>{
    let foundIndex = cart.read().findIndex(product => product.id === parseInt(req.params.id));
    cart.cart[foundIndex] = req.body;
    cart.cart[foundIndex].id = parseInt(req.params.id);
    res.json(cart.cart[foundIndex])
    
})

carritoRouter.delete('/borrar/:id', (req,res)=>{
    cart.cart = cart.read().filter(product => product.id !== parseInt(req.params.id))
    console.log(cart.read())
    res.json(cart)
})

module.exports = carritoRouter;
