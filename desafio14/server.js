var express = require('express');
var productos = require('./controller/productos');
var Chat = require('./controller/chat');
var APP = express();
//socket.io server
var http = require('http');
var server = http.createServer(APP);
var Server = require("socket.io").Server;
var io = new Server(server);
//Handlebar Engine
var exphbs = require('express-handlebars');
APP.engine('handlebars', exphbs());
APP.set('view engine', 'handlebars');
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
var PORT = process.env.PORT || 8080;
//Routes
var productosAPIRouter = express.Router();
var productosVista = express.Router();
APP.use('/api', productosAPIRouter);
APP.use(productosVista);
APP.use(express.static('./public'));
//Websocket
// Productos
io.on('connection', function (socket) {
    console.log('¡Nuevo cliente conectado!');
    socket.on('newProduct', function (producto) {
        productos.guardar(producto.title, producto.price, producto.thumbnail);
        io.emit('newProduct', productos);
    });
});
//Chat
io.on('connection', function (socket) {
    console.log('¡Nuevo cliente conectado!');
    var messages = new Chat().leer();
    console.log(messages);
    socket.emit('allMessages', { messages: messages });
    //Recibir nuevo mensaje
    socket.on('newMessage', function (mensaje) {
        var messages = new Chat().enviarMensaje(mensaje.username, mensaje.message);
        console.log(mensaje);
        console.log(messages);
        //Emitir nuevo mensaje al cliente
        io.emit('newMessage', messages);
    });
});
//Vistas
APP.get('/', function (req, res) {
    res.redirect('/productos');
});
productosVista.get('/productos', function (req, res) {
    var listaDeProductos = productos.leer();
    var chat = new Chat().leer();
    res.render('partials/productos', { listaDeProductos: listaDeProductos, chat: chat });
});
//API 
productosAPIRouter.get('/productos', function (req, res) {
    if (productos.leer().length === 0) {
        res.json({ 'error': 'no hay productos cargados' });
    }
    res.json(productos.leer());
});
productosAPIRouter.get('/productos/:id', function (req, res) {
    var productoByID = productos.leer().find(function (producto) { return producto.id === parseInt(req.params.id); });
    if (productoByID === undefined) {
        res.json({ error: 'producto no encontrado' });
    }
    res.json(productoByID);
});
productosAPIRouter.post('/productos', function (req, res) {
    var title = req.body.title;
    var price = req.body.price;
    var thumbnail = req.body.thumbnail;
    productos.guardar(title, price, thumbnail);
    res.json('productos');
});
productosAPIRouter.put('/productos/:id', function (req, res) {
    var foundIndex = productos.leer().findIndex(function (producto) { return producto.id === parseInt(req.params.id); });
    productos.productos[foundIndex] = req.body;
    productos.productos[foundIndex].id = parseInt(req.params.id);
    res.json(productos.productos[foundIndex]);
});
productosAPIRouter["delete"]('/productos/:id', function (req, res) {
    productos.productos = productos.leer().filter(function (producto) { return producto.id !== parseInt(req.params.id); });
    console.log(productos.leer());
    res.json(productos);
});
server.listen(PORT, function () { return console.log("Servidor en el puerto " + PORT); });
server.on('error', function (error) { return console.log(error); });
