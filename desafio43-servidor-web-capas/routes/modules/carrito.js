const express = require("express");
const carritoRouter = express.Router();

module.exports = (cart) => {
  carritoRouter
    .get("/listar", cart.getCartByUserId)
    .post("/agregar", cart.addShoppingCartByUserId)
    .put("/actualizar", cart.updateorCreateShoppingCartByUserId)
    .delete("/borrar", cart.deleteShoppingCartByUserId)
    .post("/checkout", cart.checkout);
  return carritoRouter;
};
