module.exports = class {
  constructor(productService) {
    this.productService = productService;
  }

  async addProduct(socket, producto) {
    try {
      const newProduct = await this.productService.addProduct(producto);
      socket.emit("newProduct", newProduct);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    try {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }

  // async getProduct = async (req,res,next) =>{
  //     try {
  //         const oneProduct = await productService.getProduct(req.params.id);
  //         res.json(oneProduct);
  //     } catch (error) {
  //         res.json(error)
  //     }
  // }

  // async updateProduct = async (req,res,next) =>{
  //     try {
  //         const {body, params} = req
  //         const updateProduct = await productService.updateProduct(params.id, body)
  //         res.json(updateProduct)
  //     } catch (error) {
  //         res.json(error)
  //     }
  // }

  // async deleteProduct = async (req,res,next) =>{
  //     try {
  //         const productDeleted = await productService.deleteProduct(req.params.id)
  //         res.json(productDeleted)
  //     } catch (error) {
  //         res.json(error)
  //     }
  // }
};
