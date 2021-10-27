const express = require('express')
const productosVista = express.Router()
let Products = require('../controller/productSocket')
let Chat = require('../controller/chat')
const isAuthenticated = require('../middleware/isAuthenticated')


// --------------------------Vistas Productos
productosVista.get('/',isAuthenticated, (req,res)=>{
        res.redirect('/productos');
        return
})

productosVista.get('/productos',isAuthenticated, async (req,res)=>{
        try {
            const loggedUsername = req.user.toJSON()
            let listaDeProductos = await Products.getAllProducts();
            let chat = await Chat.getAllMessages();
            res.render('partials/productos',{listaDeProductos,chat, loggedUsername})
            return
        } catch (error) {
            console.log(error)
            res.status(500)
        }
        
})

productosVista.get('/politica', async (req,res)=>{
    try {
        res.render('partials/politica')
        return
    } catch (error) {
        console.log(error)
        res.status(404).send("Could not find page")
    }
    
})

module.exports = productosVista;