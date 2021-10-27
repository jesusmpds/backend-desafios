const server = require('./server')
const {PORT} = require('./config/globals')
const {getConnection} = require('./dao/db/connection')
const logger = require('./services/loggerService')

getConnection().then((message) => {
  logger.info(message)
  server.listen(PORT, ()=> logger.info(`Servidor en el puerto ${PORT}`))
  server.on('error', error => logger.error(error))
}).catch()