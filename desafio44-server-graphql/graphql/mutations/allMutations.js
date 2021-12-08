const allMutations = `
   type Mutation {
       addProduct(inputs: inputProductData): Product
       updateProduct(_id: ID!, inputs:inputProductData) : Product
   }
`;
module.exports = allMutations;
