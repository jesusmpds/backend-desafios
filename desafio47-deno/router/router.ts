import {
  createRouter,
  contentTypeFilter,
} from "https://deno.land/x/servest/mod.ts";
import productController from "../controller/productsController.ts";

export const routes = () => {
  const router = createRouter();
  router.get("/", productController.getAll);
  // router.get(new RegExp("^posts/(.+)"), productController.getOne);
  router.post(
    "/",
    contentTypeFilter("application/json"),
    productController.create
  );
  //   router.put("/", productController.update);
  //   router.delete("/", productController.delete);

  return router;
};
