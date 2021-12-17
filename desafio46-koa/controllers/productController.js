const Service = require("../services/productService");

const productService = new Service();

module.exports = {
  async getAll(ctx, next) {
    try {
      const allProducts = await productService.getAll();
      ctx.body = allProducts;
    } catch (error) {
      console.log(error);
      ctx.throw(204, "no content");
    }
  },

  async getOne(ctx, next) {
    try {
      const { id } = ctx.params;
      const product = await productService.getOne(id);
      if (product) {
        ctx.body = product;
      } else {
        ctx.response.status = 404;
        ctx.body = {
          status: "error",
          message: "Product not found with that id",
        };
      }
    } catch (error) {
      console.log(error);
      ctx.throw(500, error);
    }
  },

  async create(ctx, next) {
    try {
      const { body } = ctx.request;
      const newProduct = await productService.create(body);
      if (newProduct) {
        ctx.response.status = 201;
        ctx.body = newProduct;
      } else {
        ctx.response.status = 400;
        ctx.body = {
          status: "error",
          message: "Product not found with that id",
        };
      }
    } catch (error) {
      console.log(error);
      ctx.throw(500, error);
    }
  },

  async update(ctx, next) {
    try {
      const { body } = ctx.request;
      const { id } = ctx.params;
      const updatedProduct = await productService.update(id, body);
      if (updatedProduct) {
        ctx.response.status = 200;
        ctx.body = updatedProduct;
      } else {
        ctx.response.status = 400;
        ctx.body = {
          status: "error",
          message: "Product not found with that id",
        };
      }
    } catch (error) {
      console.log(error);
      ctx.throw(500, error);
    }
  },
  async delete(ctx, next) {
    try {
      const { id } = ctx.params;
      const product = await productService.delete(id);
      if (product) {
        ctx.response.status = 200;
        ctx.body = product;
      } else {
        ctx.response.status = 400;
        ctx.body = {
          status: "error",
          message: "Product not found with that id",
        };
      }
    } catch (error) {
      console.log(error);
      ctx.throw(500, error);
    }
  },
};
