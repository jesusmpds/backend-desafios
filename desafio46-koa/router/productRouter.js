const Router = require("koa-router");
const productController = require("../controllers/productController");
const router = new Router({
  prefix: "/products",
});

router
  .get("/", productController.getAll)
  .get("/:id", productController.getOne)
  .post("/", productController.create)
  .patch("/:id", productController.update)
  .delete("/:id", productController.delete);

module.exports = router;
