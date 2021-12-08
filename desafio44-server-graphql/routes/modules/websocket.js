const {
  productsController,
  chatController,
} = require("../../controller/index");

module.exports = (io) => {
  // Productos
  io.on("connection", async (socket) => {
    let products = await productsController.getAllProducts();
    socket.emit("allProducts", products);

    //Nuevo Producto
    socket.on("newProduct", async (producto) => {
      const productNew = await productsController.addProduct(socket, {
        name: producto.name,
        description: producto.description,
        code: producto.code,
        imageURL: producto.imageURL,
        price: producto.price,
        stock: producto.stock,
      });
    });
  });

  //Chat
  io.on("connection", async (socket) => {
    console.log("¡Nuevo cliente conectado!");
    let messages = await chatController.getAllMessages();
    socket.emit("allMessages", messages);

    //Recibir nuevo mensaje
    socket.on("newMessage", async (mensaje) => {
      let messages = await chatController.saveMessage(socket, mensaje);
    });
  });
};
