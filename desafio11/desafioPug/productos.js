let productosdb = [];

class Producto {
    constructor(productos){
        this.productos = productos;
    }

    guardar(title,price,thumbnail){
        let db = this.productos
        let nuevoProducto= {
            id: db.length + 1,
            title: title,
            price: price,
            thumbnail: thumbnail
        }
        db.push(nuevoProducto)
    }

    leer(){
        return this.productos
    }

}

let productos = new Producto(productosdb)
module.exports = productos;