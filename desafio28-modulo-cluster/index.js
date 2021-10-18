const server = require('./server')
const {PORT} = require('./config/globals')
const {getConnection} = require('./dao/db/connection')
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const {argvVariables} = require('./utils/processInfo')

if (argvVariables[3] === "cluster") {
    console.log("Servidor iniciado en modo CLUSTER");
  
    if (cluster.isMaster) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      
      cluster.on("exit", (worker) => {
        console.log(
          `Worker ${
            worker.process.pid
          } DIED at ${new Date().toLocaleDateString()}!`
        );
      });
    } else {
      getConnection()
        .then((msg) => {
          console.log(msg);
          server.listen(PORT, () =>
            console.log(
              `Working on ${PORT}! and procces id ${process.pid}`
            )
          );
        })
        .catch((err) => console.log(err));
    }
} else if (argvVariables[3] === "fork"){
    console.log("Servidor iniciado en modo FORK");
    getConnection()
      .then((msg) => {
        console.log(msg);
        server.listen(PORT, () =>
          console.log(
            `Working on ${PORT}! and procces id ${process.pid}`
          )
        );
      })
      .catch((err) => console.log(err));
      }