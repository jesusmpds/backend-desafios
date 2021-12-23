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

  getOne(req: ServerRequest) {
    const [_, id] = req.match;
    const product = productService.getOne(id);
    if (product) {
      req.respond({
        status: 200,
        body: JSON.stringify(product),
      });
    } else {
      req.respond({
        status: 404,

        body: "Product not found with that id",
      });
    }
  },

  async update(req: ServerRequest) {
    try {
      const body = (await req.json()) as PostPayload;
      const [_, id] = req.match;
      const updatedProduct = await productService.update(id, body);
      if (updatedProduct) {
        req.respond({
          status: 200,
          body: JSON.stringify(updatedProduct),
        });
      } else {
        req.respond({
          status: 404,

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
  async delete(req: ServerRequest) {
    try {
      const [_, id] = req.match;
      const product = await productService.delete(id);
      if (product) {
        req.respond({
          status: 200,
          body: JSON.stringify(product),
        });
      } else {
        req.respond({
          status: 404,

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
};
