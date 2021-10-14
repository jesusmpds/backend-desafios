const express = require('express')
const productosVista = express.Router()
let Products = require('../controller/productSocket')
let Chat = require('../controller/chat')
const checkAuthentication = require('../middleware/isAuthenticated')


// --------------------------Vistas Productos
productosVista.get('/',checkAuthentication, (req,res)=>{
        res.redirect('/productos')
        return
})

productosVista.get('/productos',checkAuthentication, async (req,res)=>{
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

module.exports = productosVista;