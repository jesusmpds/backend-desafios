const express = require('express')
let productos = require('./controller/productos')
const APP = express();

//socket.io server
const http = require('http');
const server = http.createServer(APP);
const { Server } = require("socket.io");
const io = new Server(server);

//Handlebar Engine
let exphbs  = require('express-handlebars');
APP.engine('handlebars', exphbs());
APP.set('view engine', 'handlebars');


APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;

//Routes
const productosAPIRouter = express.Router();
const productosVista = express.Router();

APP.use('/api',productosAPIRouter)
APP.use(productosVista)
APP.use(express.static('./public'))
//Vistas
APP.get('/', (req,res)=>{
    res.redirect('/productos')
})

io.on('connection', (socket) => {
    console.log('¡Nuevo cliente conectado!');
    socket.on('newProduct', (producto) => {
        productos.guardar(producto.title, producto.price, producto.thumbnail)
        io.emit('newProduct', productos);
    });
  });

productosVista.get('/productos', (req,res)=>{
    let listaDeProductos = productos.leer()
    res.render('partials/productos',{listaDeProductos})
})

//API 
productosAPIRouter.get('/productos', (req,res)=> {
    if(productos.leer().length === 0) {
        res.json({'error': 'no hay productos cargados'})
    }
    res.json(productos.leer())
})

productosAPIRouter.get('/productos/:id', (req,res)=>{
    let productoByID = productos.leer().find(producto => producto.id === parseInt(req.params.id))
    if (productoByID === undefined){
        res.json({error : 'producto no encontrado'})
    }
    res.json(productoByID)
})

productosAPIRouter.post('/productos', (req,res)=>{
    let title = req.body.title
    let price = req.body.price
    let thumbnail = req.body.thumbnail
    productos.guardar(title, price, thumbnail)
    res.json('productos')
})

productosAPIRouter.put('/productos/:id',(req,res)=>{
    let foundIndex = productos.leer().findIndex(producto => producto.id === parseInt(req.params.id));
    productos.productos[foundIndex] = req.body;
    productos.productos[foundIndex].id = parseInt(req.params.id);
    res.json(productos.productos[foundIndex])
    
})

productosAPIRouter.delete('/productos/:id', (req,res)=>{
    productos.productos = productos.leer().filter(producto => producto.id !== parseInt(req.params.id))
    console.log(productos.leer())
    res.json(productos)
})

server.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))

server.on('error', error => console.log(error))
