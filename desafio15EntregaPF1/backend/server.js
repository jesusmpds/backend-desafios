const express = require('express')
const compression = require('compression');
const app = express();
const productosAPIRouter = require('./routes/productos')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression())

//Routes
app.use('/productos',productosAPIRouter)
app.use('carrito',)
module.exports = app;
