const productModel = require('../dao/models/products')

module.exports = class {

    async getProduct(id){
        try {
            const Product = await productModel.findById(id)
            return Product;
        } catch (error) {
            console.log(error)
    }
}
    async getAllProducts(){
        try {
            const allProducts = await productModel.find().lean()
            return allProducts;
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct(producto){
        const product = await productModel.create(producto)
        return product;
    }
    async updateProduct(id, productUpdated){
        const productToUpdate = await productModel.findByIdAndUpdate(id,productUpdated, {new:true,})
        return productToUpdate;

    }
    async deleteProduct(id){
        await productModel.findByIdAndDelete(id)
    }
}