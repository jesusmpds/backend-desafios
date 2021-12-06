const compression = require("compression");
const express = require("express");
const router = require("express").Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

module.exports = (modules) => {
  // Middleware Routes
  router
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors())
    .use(compression())
    .use(express.static(path.join("public")))
    .use(cookieParser());

  // Api Inyection
  router.use("/api/productos", modules.productosAPIRouter);
  router.use("/api/carrito", modules.carritoRouter);
  router.use(modules.Vistas);
  router.use(modules.sessionsRouter);
  router.use(modules.twilioRouter);
  router.use(modules.processInfoRouter);
  router.use(modules.randomNumberRouter);

  return router;
};
