const server = require('./server')
const {PORT} = require('./config/globals')
const {getConnection} = require('./dao/db/connection')

getConnection().then((message) => {
    console.log(message)
    server.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))
    server.on('error', error => console.log(error))
}).catch()
