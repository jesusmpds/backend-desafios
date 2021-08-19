const express = require('express')
const cors = require('cors')
const compression = require('compression');
const app = express();

//Routes
const productosAPIRouter = require('./routes/productos')
const carritoRouter = require('./routes/carrito')
const ChatWebsocket = require('./routes/websocket')

//socket.io server
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Handlebar Engine
let exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Middlewares  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(compression());
app.use(express.static('./public'))

//Admin
let ADMIN = false;

app.use((req, res, next) => {
    let paths = ['agregar', 'borrar', 'actualizar']
    if(paths.some( currentPath => req.path.includes(currentPath))){
        let admin = req.query.admin
        console.log(admin)
        admin === 'true' ? ADMIN = true : null;
        ADMIN === true ? next() : res.json({ error : -1, descripcion: `ruta ${req.path}`, metodo: `${req.method} no autorizado`})
    }
  });

//Routes
app.use('/productos',productosAPIRouter)
app.use('/carrito', carritoRouter)
app.use('/', ChatWebsocket(io))
module.exports = server;
