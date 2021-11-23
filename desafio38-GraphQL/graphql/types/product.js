const productData = `
type Product {
    _id: ID!
    name: String
    description: String
    code: String
    imageURL: String
    price: Int
    stock:Int
  }`;

const inputProductData = `
    input inputProductData {
        name: String
        description: String
        code: String
        imageURL: String
        price: Int
        stock: Int
    }`;
module.exports = `${productData} ${inputProductData}`;
