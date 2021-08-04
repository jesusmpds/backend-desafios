
class Producto {
    constructor(){
        this.productos = [];
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

let productos = new Producto()
module.exports = productos;