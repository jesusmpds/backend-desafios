import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
config();

export default {
  PORT: Deno.env.get("PORT"),
};
