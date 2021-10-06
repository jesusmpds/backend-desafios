const express = require('express')
const cors = require('cors')
const compression = require('compression');
const session = require("express-session");
const passport = require('passport')
const cookieParser = require("cookie-parser");
const {MONGO_URI, SECRET} = require('./config/globals')

const app = express();

// Persistence with MongoDB for Sessions
const mongoStore = require('connect-mongo')
const advancedOptionsMongo = {useNewUrlParser: true, useUnifiedTopology: true
}

//Routes
const productosAPIRouter = require('./routes/productos')
const productosVista = require('./routes/vista')
const carritoRouter = require('./routes/carrito')
const ChatWebsocket = require('./routes/websocket')
const sessionsRouter = require('./routes/auth')

//socket.io server
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Handlebar Engine
let exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Middlewares  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(compression());
app.use(express.static('./public'))
app.use(cookieParser());
// Sessions
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:MONGO_URI,
      MongoOptions:advancedOptionsMongo,
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 600000
    }
  })
);

// Passport
require('./middleware/auth-passport-local')
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/productos', productosAPIRouter, sessionsRouter)
app.use('/carrito', carritoRouter)
app.use(productosVista)
ChatWebsocket(io);
module.exports = server;
