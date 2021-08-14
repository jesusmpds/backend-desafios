const express = require('express')
const cors = require('cors')
const compression = require('compression');
const app = express();
const productosAPIRouter = require('./routes/productos')
const carritoRouter = require('./routes/carrito')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(compression())

//Admin
let ADMIN = false;

app.use((req, res, next) => {
    let paths = ['agregar', 'borrar', 'actualizar']
    if(paths.some( path => req.path.includes(path))){
        let admin = req.query.admin
        console.log(admin)
        admin === 'true' ? ADMIN = true : null;
        ADMIN === true ? next() : res.json({ error : -1, descripcion: `ruta ${req.path}`, metodo: `${req.method} no autorizado`})
    }
  });

//Routes
app.use('/productos',productosAPIRouter)
app.use('/carrito', carritoRouter)
module.exports = app;
