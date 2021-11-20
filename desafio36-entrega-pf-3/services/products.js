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

    async getProductByName(name){
        try {
            const Product = await productModel.findOne({name:name}).lean();
            return Product;
        } catch (error) {
            console.log(error)
        }
    }

    async getProductByCode(code){
        try {
            const Product = await productModel.findOne({code:code}).lean()
            return Product;
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsByPrice(min,max){
        try {
            const Product = await productModel.find({price:{$gte: min, $lte: max}}).lean()
            return Product;
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsByStock(min,max){
        try {
            const Product = await productModel.find({stock:{$gte: min, $lte: max}}).lean()
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
        try {
            const product = await productModel.create(producto)
        return product;
        } catch (error) {
            console.log(error)
        }
        
    }
    async updateProduct(id, productUpdated){
        const productToUpdate = await productModel.findByIdAndUpdate(id,productUpdated, {new:true,})
        return productToUpdate;

    }
    async deleteProduct(id){
        await productModel.findByIdAndDelete(id)
    }

}