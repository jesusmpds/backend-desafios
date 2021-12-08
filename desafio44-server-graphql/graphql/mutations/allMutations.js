const allMutations = `
   type Mutation {
       addProduct(inputs: inputProductData): Product
       updateProduct(_id: ID!, inputs:inputProductData) : Product
       deleteProduct(_id: ID!): Product
   }
`;
module.exports = allMutations;
