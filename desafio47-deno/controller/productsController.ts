import Service from "../services/productService.ts";
import { ServerRequest } from "https://deno.land/x/servest/mod.ts";
const productService = new Service();

type PostPayload = {
  id: string;
  name: string;
  description: string;
  code: string;
  price: string;
  stock: string;
};

export default {
  async getAll(req: ServerRequest) {
    try {
      const allProducts = await productService.getAll();
      req.respond({
        status: 200,
        body: JSON.stringify(allProducts),
      });
    } catch (error) {
      console.log(error);
      req.respond({
        status: 500,
        body: error,
      });
    }
  },

  async create(req: ServerRequest) {
    try {
      const body = (await req.json()) as PostPayload;
      const newProduct = await productService.create(body);
      if (newProduct) {
        req.respond({
          status: 201,
          body: "New product created",
        });
      } else {
        req.respond({
          status: 400,
          body: "Product not found with that id",
        });
      }
    } catch (error) {
      req.respond({
        status: 500,
        body: error,
      });
    }
  },

  // async getOne(req: ServerRequest) {
  //   const [_, id] = req.match;
  //   const product = await productService.getOne(id);
  //   if (product) {
  //     req.respond({
  //       status: 200,
  //       body: JSON.stringify(product),
  //     });
  //   } else {
  //     req.respond({
  //       status: 404,

  //       body: "Product not found with that id",
  //     });
  //   }
  // },

  // async update(req) {
  //   try {
  //     const body = await req.json();
  //     const { id } = ctx.params;
  //     const updatedProduct = await productService.update(id, body);
  //     if (updatedProduct) {
  //       ctx.response.status = 200;
  //       ctx.body = updatedProduct;
  //     } else {
  //       ctx.response.status = 400;
  //       ctx.body = {
  //         status: "error",
  //         message: "Product not found with that id",
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     ctx.throw(500, error);
  //   }
  // },
  // async delete(req: ServerRequest) {
  //   try {
  //     const { id } = ctx.params;
  //     const product = await productService.delete(id);
  //     if (product) {
  //       ctx.response.status = 200;
  //       ctx.body = product;
  //     } else {
  //       ctx.response.status = 400;
  //       ctx.body = {
  //         status: "error",
  //         message: "Product not found with that id",
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     ctx.throw(500, error);
  //   }
  // },
};
