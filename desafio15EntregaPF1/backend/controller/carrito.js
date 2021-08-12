
class Product {
    constructor(){
        try {
            fs.readFileSync('../data/productos.json');
        } catch (error) {
            fs.writeFileSync('../data/productos.json', JSON.stringify([]));
        }
    }
    
    save(name,description,imageURL,price,stock){
        let db = JSON.parse(fs.readFileSync('../data/productos.json'))
        let nuevoProducto= {
            id: db.length + 1,
            timestamp: new Date.now(),
            name: name,
            description: description,
            code: db.length * 99 + "AR",
            imageURL: imageURL,
            price: price,
            stock:stock
        }
        db.push(nuevoProducto)
        fs.writeFileSync('./data/productos.json', JSON.stringify(db));
    }

    read(){
        return JSON.parse(fs.readFileSync('../data/productos.json'))
    }

}

let products = new Product()
module.exports = products;