const http = require("http");

const randomInteger = (max) => Math.floor(Math.random() * max + 1);
const randomIntegerWithDecimals = (max) => Math.random() * max ;

const server = http.createServer( (req, res) => { 
    res.write( JSON.stringify({
        id: randomInteger(10),
        title: `Producto ${randomInteger(10)}`,
        price: randomIntegerWithDecimals(10000).toFixed(2),
        thumbnail: `Foto ${randomInteger(10)}`
    })
    )
    res.end()
})

const PUERTO = 3000;

server.listen(PUERTO, function () {
    console.log(`servidor esta escuchando en el puerto http://localhost:${PUERTO}`);
});

