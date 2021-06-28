const http = require("http");

const server = http.createServer( (req, res) => res.end('Hola'),)

const PUERTO = 3000;

server.listen(3000, function () {
    console.log(`servidor esta escuchando en el puerto http://localhost:${PUERTO}`);
});