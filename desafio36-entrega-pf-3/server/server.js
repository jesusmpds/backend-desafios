const express = require("express");
const cors = require("cors");
const compression = require("compression");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { MONGO_URI, SECRET } = require("../config/globals");
const path = require("path");

const app = express();

// Persistence with MongoDB for Sessions
const mongoStore = require("connect-mongo");
const advancedOptionsMongo = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Routes
const productosAPIRouter = require("../routes/productos");
const Vistas = require("../routes/vista");
const carritoRouter = require("../routes/carrito");
const ChatWebsocket = require("../routes/websocket");
const sessionsRouter = require("../routes/auth");
const processInfoRouter = require("../routes/processInfo");
const randomNumberRouter = require("../routes/random");
const twilioRoutes = require("../routes/twilioRoutes");

//socket.io server
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Handlebar Engine
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(express.static(path.join("public")));
app.use(cookieParser());

// Sessions
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URI,
      MongoOptions: advancedOptionsMongo,
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
    },
  })
);

// Passport
require("../middleware/auth.config")(passport);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/productos", productosAPIRouter);
app.use("/api/carrito", carritoRouter);
app.use(Vistas, sessionsRouter, twilioRoutes);
ChatWebsocket(io);
app.use(processInfoRouter);
app.use(randomNumberRouter);

module.exports = server;
