const fs = require('fs')
const products = require('../controller/productos')
class Cart {
    constructor(){
        try {
            fs.readFileSync('./data/carrito.json');
        } catch (error) {
            fs.writeFileSync('./data/carrito.json', JSON.stringify({
                id: 1,
                timestamp: Date.now(),
                products:[]
            }));
        }
    }

    addProduct(productId){
        let newProduct = products.findProduct(productId)
        let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))

        if(newProduct && !cart.products.find(product => product.id === productId)){
            cart.products.push(newProduct)
            fs.writeFileSync('./data/carrito.json', JSON.stringify(cart));
        }
        return newProduct;
    }

    showProducts(){
        let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))
        return cart.products
    }

    removeProduct(productId){
        let productToRemove = products.findProduct(productId)
        let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))
        console.log(cart.products.filter(product => product.id !== productToRemove.id))
        if(productToRemove){
            let updatedCartProducts = cart.products.filter(product => product.id !== productToRemove.id)
            cart.products = updatedCartProducts;
            fs.writeFileSync('./data/carrito.json', JSON.stringify(cart));
            return cart;
        }

    }
}

let cart = new Cart()
module.exports = cart;