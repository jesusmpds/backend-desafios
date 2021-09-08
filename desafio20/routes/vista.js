const express = require('express')
const productosAPIRouter = express.Router()
let Products = require('../controller/productos')
let Chat = require('../controller/chat')

productosVista.get('/productos', (req,res)=>{
    let listaDeProductos = Products.leer()
    let chat = new Chat().leer();
    res.render('partials/productos',{listaDeProductos,chat})
})