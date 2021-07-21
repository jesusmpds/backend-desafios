const express = require('express')
let productos = require('./productos')
const productosRouter = express.Router();
const productosVista = express.Router();
const APP = express();

//EJS Engine
APP.set('views','./views');
APP.set('view engine', 'ejs');

APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

const PORT = 8080;

//Routes

APP.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

productosVista.get('/productos/vista', (req,res)=>{
    let listaDeProductos = productos.leer()
    res.render('main',{listaDeProductos})
})

productosRouter.get('/productos', (req,res)=> {
    if(productos.leer().length === 0) {
        res.json({'error': 'no hay productos cargados'})
    }
    res.json(productos.leer())
})

productosRouter.get('/productos/:id', (req,res)=>{
    let productoByID = productos.leer().find(producto => producto.id === parseInt(req.params.id))
    if (productoByID === undefined){
        res.json({error : 'producto no encontrado'})
    }
    res.json(productoByID)
})

productosRouter.post('/productos', (req,res)=>{
    let title = req.body.title
    let price = req.body.price
    let thumbnail = req.body.thumbnail
    productos.guardar(title, price, thumbnail)
    res.redirect('back')
})

productosRouter.put('/productos/:id',(req,res)=>{
    let foundIndex = productos.leer().findIndex(producto => producto.id === parseInt(req.params.id));
    productos.productos[foundIndex] = req.body;
    productos.productos[foundIndex].id = parseInt(req.params.id);
    res.json(productos.productos[foundIndex])
    
})

productosRouter.delete('/productos/:id', (req,res)=>{
    productos.productos = productos.leer().filter(producto => producto.id !== parseInt(req.params.id))
    console.log(productos.leer())
    res.json(productos)
})

APP.use('/api',productosRouter)
APP.use(productosVista)

const server = APP.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))

server.on('error', error => console.log(error))

