const express = require("express");
const carritoRouter = express.Router();
let cart = require("../controller/cartController");

carritoRouter
  .get("/listar", cart.getCartByUserId)
  .post("/agregar", cart.addShoppingCartByUserId)
  .put("/actualizar", cart.updateorCreateShoppingCartByUserId)
  .delete("/borrar", cart.deleteShoppingCartByUserId)
  .post("/checkout", cart.checkout);

module.exports = carritoRouter;
