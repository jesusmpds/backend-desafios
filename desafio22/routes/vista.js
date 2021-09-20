const express = require('express')
const productosVista = express.Router()
let Products = require('../controller/productSocket')
let Chat = require('../controller/chat')

productosVista.get('/', (req,res)=>{
    res.redirect('/productos')
})

productosVista.get('/productos', async (req,res)=>{
    let listaDeProductos = await Products.getAllProducts();
    let chat = await Chat.getAllMessages();
    res.render('partials/productos',{listaDeProductos,chat})
})

module.exports = productosVista;