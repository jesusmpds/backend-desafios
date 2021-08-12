const express = require('express')
const productosAPIRouter = express.Router()
let products = require('../controller/productos')

productosAPIRouter.get('/listar', (req,res)=> {
    if(products.read().length === 0) {
        res.json({'error': 'no hay productos cargados'})
    }
    res.json(products.read())
})

productosAPIRouter.get('/listar/:id', (req,res)=>{
    let productByID = products.read().find(product => product.id === parseInt(req.params.id))
    if (productByID === undefined){
        res.json({error : 'producto no encontrado'})
    }
    res.json(productByID)
})

productosAPIRouter.post('/agregar', (req,res)=>{
    const {name, description, imageURL, price, stock} = req.body
    products.guardar(name,description,imageURL,price,stock)
    res.json('products')
})

productosAPIRouter.put('/actualizar/:id',(req,res)=>{
    let foundIndex = products.read().findIndex(product => product.id === parseInt(req.params.id));
    products.products[foundIndex] = req.body;
    products.products[foundIndex].id = parseInt(req.params.id);
    res.json(products.products[foundIndex])
    
})

productosAPIRouter.delete('/borrar/:id', (req,res)=>{
    products.products = products.read().filter(product => product.id !== parseInt(req.params.id))
    console.log(products.read())
    res.json(products)
})

module.exports = productosAPIRouter;