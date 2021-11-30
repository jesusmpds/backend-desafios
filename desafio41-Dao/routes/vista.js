const express = require("express");
const Vistas = express.Router();
let Products = require("../controller/productos");
let Chat = require("../controller/chat");
const isAuthenticated = require("../middleware/isAuthenticated");
const cart = require("../controller/cartController");
const logger = require("../services/loggerService");

// --------------------------Vistas Productos
Vistas.get("/", isAuthenticated, (req, res) => {
  res.redirect("/productos");
  return;
});

Vistas.get("/productos", isAuthenticated, async (req, res) => {
  try {
    const userInfo = req.user.toJSON();
    let listaDeProductos = await Products.getAllProducts(req, res);
    let chat = await Chat.getAllMessages();
    res.render("pages/productos", { listaDeProductos, userInfo });
    return;
  } catch (error) {
    console.log(error);
  }
});

Vistas.get("/productos/name/:name", isAuthenticated, async (req, res) => {
  try {
    const userInfo = req.user.toJSON();
    let listaDeProductos = await Products.getProductByName(req);
    listaDeProductos._id = listaDeProductos._id.toString();
    res.render("pages/productos", {
      listaDeProductos: [listaDeProductos],
      userInfo,
    });
    return;
  } catch (error) {
    console.log(error);
  }
});

Vistas.get("/productos/code/:code", isAuthenticated, async (req, res) => {
  try {
    const userInfo = req.user.toJSON();
    let listaDeProductos = await Products.getProductByCode(req);
    listaDeProductos._id = listaDeProductos._id.toString();
    res.render("pages/productos", {
      listaDeProductos: [listaDeProductos],
      userInfo,
    });
    return;
  } catch (error) {
    console.log(error);
  }
});

Vistas.get("/productos/price", isAuthenticated, async (req, res) => {
  try {
    const userInfo = req.user.toJSON();
    let listaDeProductos = await Products.getProductsByPrice(req);
    res.render("pages/productos", { listaDeProductos, userInfo });
    return;
  } catch (error) {
    console.log(error);
  }
});

Vistas.get("/productos/stock", isAuthenticated, async (req, res) => {
  try {
    const userInfo = req.user.toJSON();
    let listaDeProductos = await Products.getProductsByStock(req);
    console.log(listaDeProductos);
    res.render("pages/productos", { listaDeProductos, userInfo });
    return;
  } catch (error) {
    console.log(error);
  }
});
// -------------------------Cart View -------------------------------//
Vistas.get("/carrito", isAuthenticated, async (req, res) => {
  try {
    const userInfo = req.user.toJSON();
    let listaDeProductosEnCarro = await cart.getCartByUserId(req, res);
    if (listaDeProductosEnCarro === null) {
      res.render("pages/carrito", {
        listaDeProductosEnCarro: false,
        userInfo,
      });
      return;
    }
    res.render("pages/carrito", {
      listaDeProductosEnCarro,
      userInfo,
    });
    return;
  } catch (error) {
    console.log(error);
  }
});

// --------------- Other views------------------------------/

Vistas.get("/perfil", isAuthenticated, (req, res) => {
  const userInfo = req.user.toJSON();
  res.render("pages/perfil", { userInfo });
});

Vistas.get("/agregar-productos", isAuthenticated, (req, res) => {
  res.render("pages/agregarProductos");
});

Vistas.get("/politica", async (req, res) => {
  try {
    res.render("partials/politica");
    return;
  } catch (error) {
    console.log(error);
    res.status(404).send("Could not find page");
  }
});

module.exports = Vistas;
