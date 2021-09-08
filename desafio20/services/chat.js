const MessageModel = require('../dao/models/messages')

module.exports = class {

    async getAllMessages(){
        return MessageModel.find({})
    }

    async sendMessage(producto){
        const product = await productModel.create(producto)
        return product
    }
    async updateProduct(id, productUpdated){
        const productToUpdate = await productModel.findByIdAndUpdate(id,productUpdated, {new:true,})
        return productToUpdate;

    }
    async deleteProduct(id){
        await productModel.findByIdAndDelete(id)
    }
}