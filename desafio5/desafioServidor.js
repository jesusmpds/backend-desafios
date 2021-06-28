const http = require("http");

const randomInteger = (max, min) => {
    return min > 0 ? 
    Math.floor(Math.random() * (max - min)) + min 
    : 
    Math.random() * (max - min) + min
}
const server = http.createServer( (req, res) => { 
    res.write( JSON.stringify({
        id: randomInteger(11,1),
        title: `Producto ${randomInteger(11,1)}`,
        price: randomInteger(10001, 0).toFixed(2),
        thumbnail: `Foto ${randomInteger(11,1)}`
    })
    )
    res.end()
})

const PUERTO = 3000;

server.listen(PUERTO, function () {
    console.log(`servidor esta escuchando en el puerto http://localhost:${PUERTO}`);
});

