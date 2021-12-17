const Koa = require("koa");
const app = new Koa();
const { PORT } = require("./config/globals");
const koaBody = require("koa-body");
const cors = require("koa-cors");

//Middleware
app.use(koaBody());
app.use(cors());

//Router
const productRouter = require("./router/productRouter");

//Routes
app.use(productRouter.routes());

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
app.on("error", (error) => console.log(`Error en server: `, error));
