import express from 'express'
import productos from './productos.js'

const APP = express();

APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

const PORT = 8080;

APP.get('/api/productos', (req,res)=> {
    if(productos.leer().length === 0) {
        res.json({'error': 'no hay productos cargados'})
    }
    res.json(productos.leer())
})

APP.get('/api/productos/:id', (req,res)=>{
    let productoByID = productos.leer().find(producto => producto.id === parseInt(req.params.id))
    if (productoByID === undefined){
        res.json({error : 'producto no encontrado'})
    }
    res.json(productoByID)
})

APP.post('/api/productos', (req,res)=>{
    console.log(req.body)
    let title = req.body.title
    let price = req.body.price
    let thumbnail = req.body.thumbnail
    let nuevoProducto = productos.guardar(title, price, thumbnail)
    res.json(nuevoProducto)
})

const server = APP.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))

server.on('error', error => console.log(error))