let Chat = require('../controller/chat');
let productos = require('../controller/productos')

module.exports = (io)=>{
    // Productos
    io.on('connection', (socket) => {
        console.log('¡Nuevo cliente conectado!');
        socket.on('newProduct', (producto) => {
            productos.guardar(producto.title, producto.price, producto.thumbnail)
            io.emit('newProduct', productos);
        });
      });
    
      //Chat
      io.on('connection', (socket) => {
        console.log('¡Nuevo cliente conectado!');
        let messages = new Chat().leer()
        console.log(messages)
        socket.emit('allMessages',{messages})
    
        //Recibir nuevo mensaje
        socket.on('newMessage', (mensaje) => {
            let messages = new Chat().enviarMensaje(mensaje.username, mensaje.message);
            console.log(mensaje)
            console.log(messages)
            //Emitir nuevo mensaje al cliente
            io.emit('newMessage', messages);
        });
      });
}