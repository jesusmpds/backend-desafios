const express = require('express')
const productosAPIRouter = express.Router()
let products = require('../controller/productos')

productosAPIRouter.get('/listar', (req,res)=> {
    if(products.read().length === 0) {
        return res.json({'error': 'no hay productos cargados'})
    }
    res.json(products.read())
})

productosAPIRouter.get('/listar/:id', (req,res)=>{
    let productById = products.findProduct(parseInt(req.params.id))
    if (productById === undefined){
        return res.json({error : 'producto no encontrado'})
    }
    res.json(productById)
})

productosAPIRouter.post('/agregar', (req,res)=>{
    const {name, description, imageURL, price, stock} = req.body
    products.save(name,description,imageURL,parseInt(price),stock)
    res.json(products.read())
})

productosAPIRouter.put('/actualizar/:id',(req,res)=>{
    let productsUpdated = products.update(parseInt(req.params.id), req.body.name,req.body.description, req.body.imageURL, req.body.price,req.body.stock);

    res.json(productsUpdated)
})

productosAPIRouter.delete('/borrar/:id', (req,res)=>{
    let productsUpdated = products.delete(parseInt(req.params.id))
    res.json(productsUpdated)
})

module.exports = productosAPIRouter;