const server = require('./server')
const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))
server.on('error', error => console.log(error))