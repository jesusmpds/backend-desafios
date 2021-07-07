import express from 'express'
import fs from 'fs';

const APP = express();

const PORT = 8080;

const SERVER = APP.listen(PORT, ()=> console.log(`Servidor en el puerto ${PORT}`))

const randomInteger = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min 
}

let itemsVisits = 0;
let randomItemVisits = 0;

APP.get('/items', async (req, res) => {
    try {
        const archivo = await fs.promises.readFile('productos.txt','utf-8');
        let archivoParseado = JSON.parse(archivo);
        itemsVisits++;
        res.send({
            items:archivoParseado,
            cantidad: archivoParseado.length
        });
    } catch (error) {
         console.log(error)
    }
})

APP.get('/item-random', async (req, res) =>{
    try {
        const archivo = await fs.promises.readFile('productos.txt','utf-8')
        let archivoParseado = JSON.parse(archivo)
        randomItemVisits++
        res.send(archivoParseado[randomInteger(3,0)])
    } catch (error) {
         console.log(error)
    }
})

APP.get('/visitas', (req, res) => {
    res.send({
        visitas: {
            items: itemsVisits,
            item: randomItemVisits
        }
    })
})