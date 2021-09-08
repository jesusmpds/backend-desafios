const productModel = require('../dao/models/products')

module.exports = class {

    async getProduct(id){
        return productModel.findById(id)
    }
    async getAllProducts(){
        return productModel.find({})
    } 
    async addProduct(producto){
        await productModel.create(producto)
    }
    async updateProduct(id, productUpdated){
        const productToUpdate = await productModel.findByIdAndUpdate(id,productUpdated, {new:true,})
        return productToUpdate;

    }
    async deleteProduct(id){
        await productModel.findByIdAndDelete(id)
    }
}