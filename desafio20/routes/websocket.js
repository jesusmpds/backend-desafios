let messagesController = require('../controller/chat')

module.exports = (io)=>{
    // Productos
    // io.on('connection', (socket) => {
    //     console.log('¡Nuevo cliente conectado!');
    //     socket.on('newProduct', async (producto) => {
    //       const productNew = await productController.addProduct({
    //         name: producto.name,
    //         description: producto.description,
    //         code: producto.code,
    //         imageURL: producto.thumbnail,
    //         price: producto. price,
    //         stock:producto.stock
    //       })
    //         io.emit('newProduct', productNew);
    //     });
    //   });
    
      //Chat
      io.on('connection', async (socket) => {
        console.log('¡Nuevo cliente conectado!');
        let messages = await messagesController.getAllMessages()
        console.log(messages)
        socket.emit('allMessages',messages)
    
        //Recibir nuevo mensaje
        socket.on('newMessage', async (mensaje) => {
            let messages = await messagesController.saveMessage({
              username:mensaje.username, 
              msg: mensaje.messageBody
            });
            console.log(mensaje)
            console.log(messages)
        });
      });
}