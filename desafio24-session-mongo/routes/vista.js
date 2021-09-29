const express = require('express')
const productosVista = express.Router()
const sessionsRouter = require('./sessions')
let Products = require('../controller/productSocket')
let Chat = require('../controller/chat')

sessionsRouter.get('/login', (req,res)=>{
    res.render('partials/logIn')
})

sessionsRouter.get('/logout', (req,res) =>{
    console.log("Hasta luego")
    const loggedUsername = req.session.user
    const name = loggedUsername
    res.render('partials/logout', {name})
    return
})

productosVista.get('/', (req,res)=>{
    if (req.session.user === 'Jesus'){
        res.redirect('/productos')
        return
    }
    res.redirect('/productos/login')
})

productosVista.get('/productos', async (req,res)=>{
    if (req.session.user){
        const loggedUsername = req.session.user
        let listaDeProductos = await Products.getAllProducts();
        let chat = await Chat.getAllMessages();
        res.render('partials/productos',{listaDeProductos,chat, loggedUsername})
        return
    }
    res.redirect('/productos/login')
})

module.exports = productosVista;