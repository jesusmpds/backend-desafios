import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts";
import config from "./config/globals.ts";
import { routes } from "./router/router.ts";
const app = createApp();
const port = Number(config.PORT);
console.log(port);
app.route("/products", routes());

app.listen({ port });
