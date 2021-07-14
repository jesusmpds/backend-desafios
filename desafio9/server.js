import express from 'express'
import productos from './productos.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productosRouter = express.Router();
const APP = express();

APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

const PORT = 8080;

APP.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
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
    let nuevoProducto = productos.guardar(title, price, thumbnail)
    res.json(nuevoProducto)
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

const server = APP.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))

server.on('error', error => console.log(error))

