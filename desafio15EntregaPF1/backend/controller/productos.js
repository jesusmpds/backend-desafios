const fs = require('fs')
class Product {
    constructor(){
        try {
            fs.readFileSync('./data/productos.json');
        } catch (error) {
            fs.writeFileSync('./data/productos.json', JSON.stringify([]));
        }
    }
    
    read(){
        return JSON.parse(fs.readFileSync('./data/productos.json'))
    }

    findProduct(productId){
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        return db.find( product => product.id === productId)
    }

    save(name,description,imageURL,price,stock){
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        let nuevoProducto= {
            id: db.length + 1,
            timestamp: Date.now(),
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

    update(id,name,description,imageURL,price,stock){
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        let productToEdit = db.find( product => product.id === id)
        if(productToEdit){
            productToEdit.name = name;
            productToEdit.description = description;
            productToEdit.imageURL = imageURL;
            productToEdit.price = price;
            productToEdit.stock = stock;

            fs.writeFileSync('./data/productos.json', JSON.stringify(db));
            return productToEdit;
        } else {
            return `Producto no encontrado`
        }
    }

    delete(productId){
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        let dbUpdated = db.filter(product => product.id !== productId)
        fs.writeFileSync('./data/productos.json', JSON.stringify(dbUpdated));
        return dbUpdated;
    }
}

let products = new Product;
module.exports = products;