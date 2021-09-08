const express = require('express')
const productosVista = express.Router()
let Products = require('../controller/productos')
let Chat = require('../controller/chat')

productosVista.get('/productos', (req,res)=>{
    let listaDeProductos = Products.getAllProducts()
    console.log(listaDeProductos)
    res.render('partials/productos',{listaDeProductos})
})

module.exports = productosVista;