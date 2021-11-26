let messagesController = require('../controller/chat')
let productController = require('../controller/productSocket')

module.exports = (io)=>{
    // Productos
    io.on('connection', async (socket) => {
      let products = await productController.getAllProducts()
      socket.emit('allProducts',products)

      //Nuevo Producto
      socket.on('newProduct', async (producto) => {
        const productNew = await productController.addProduct(socket,{
          name: producto.name,
          description: producto.description,
          code: producto.code,
          imageURL: producto.imageURL,
          price: producto.price,
          stock:producto.stock
        })
      });
    });
    
    //Chat
    io.on('connection', async (socket) => {
      console.log('¡Nuevo cliente conectado!');
      let messages = await messagesController.getAllMessages()
      socket.emit('allMessages',messages)
  
      //Recibir nuevo mensaje
      socket.on('newMessage', async (mensaje) => {
          let messages = await messagesController.saveMessage(socket, mensaje);
      });
    });
}