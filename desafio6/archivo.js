let fs = require('fs')

class Producto{
    constructor(title,price,thumbnail){
        this.title= title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

class Archivo {
    constructor(name){
        this.name = name;
        this.productos = []
    }

    async leer(){
        try {
            const archivo = await fs.promises.readFile(this.name,'utf-8')
            console.log(JSON.parse(archivo))
        } catch (error) {
            return console.log(this.productos)
        }
    }

    async guardar(title,price,thumbnail){
        try {
            let newProduct = new Producto(title,price,thumbnail)
            newProduct.id = this.productos.length + 1
            this.productos.push(newProduct)
            await fs.promises.writeFile(this.name, JSON.stringify(this.productos, null, '\t'))

            } catch (error){
                console.log(error)
        }
    }

    borrar(){
        fs.unlinkSync(this.name)
    }
}

let archivoProductos = new Archivo('./productos.txt')

archivoProductos.guardar("Escuadra",123.45,"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png")

archivoProductos.guardar("Calculadora",234.56,"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png")

archivoProductos.guardar("Globo Terráqueo",345.67,"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png")