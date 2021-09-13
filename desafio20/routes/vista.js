const express = require('express')
const productosVista = express.Router()
let Products = require('../controller/productSocket')
let Chat = require('../controller/chat')

productosVista.get('/', (req,res)=>{
    res.redirect('/productos')
})

productosVista.get('/productos', (req,res)=>{
    let listaDeProductos = Products.getAllProducts();
    let chat = Chat.getAllMessages();
    res.render('partials/productos',{listaDeProductos,chat})
})

module.exports = productosVista;