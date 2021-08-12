const app = require('./server')
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))
app.on('error', error => console.log(error))