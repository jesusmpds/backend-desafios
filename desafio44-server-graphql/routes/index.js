const productosAPIRouter = require("./modules/productos");
const Vistas = require("./modules/vista");
const carritoRouter = require("./modules/carrito");
const sessionsRouter = require("./modules/auth");
const processInfoRouter = require("./modules/processInfo");
const randomNumberRouter = require("./modules/random");
const twilioRouter = require("./modules/twilioRoutes");
const {
  authController,
  cartController,
  productsController,
  randomNumberController,
  twilioController,
} = require("../controller/index");

module.exports = () => ({
  productosAPIRouter: productosAPIRouter(productsController),
  Vistas: Vistas(),
  carritoRouter: carritoRouter(cartController),
  sessionsRouter: sessionsRouter(authController),
  processInfoRouter: processInfoRouter,
  randomNumberRouter: randomNumberRouter(randomNumberController),
  twilioRouter: twilioRouter(twilioController),
});
