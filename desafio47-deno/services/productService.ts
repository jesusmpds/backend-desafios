type productType = {
  id: string;
  name: string;
  description: string;
  code: string;
  price: string;
  stock: string;
};

export default class {
  db: Array<unknown> = [];

  create(product: Record<string, unknown>) {
    const { id, name, description, code, price, stock } = product;
    const nuevoProducto = {
      id: id,
      name: name,
      description: description,
      code: code,
      price: price,
      stock: stock,
    };
    this.db.push(nuevoProducto);

    return nuevoProducto;
  }

  getAll() {
    return this.db;
  }

  // getOne(id: string) {
  //   return this.db.find(
  //     (product1) => product1.id === id
  //   );
  // }

  //   update(id:string, updatedProduct) {
  //     this.db = JSON.parse(readFileSync("./data/products.json", "utf8"));
  //     const { name, description, code, price, stock } = updatedProduct;
  //     const productToEdit = this.db.find((product) => product.id === id);
  //     if (productToEdit) {
  //       productToEdit.name = name;
  //       productToEdit.description = description;
  //       productToEdit.code = code;
  //       productToEdit.price = price;
  //       productToEdit.stock = stock;

  //       writeFileSync("./data/products.json", JSON.stringify(this.db), "utf8");
  //       return productToEdit;
  //     } else {
  //       return `Producto no encontrado`;
  //     }
  //   }

  //   delete(id) {
  //     this.db = JSON.parse(readFileSync("/data/products.json", "utf8"));
  //     const dbUpdated = this.db.filter((product) => product.id !== id);
  //     writeFileSync("./data/products.json", JSON.stringify(dbUpdated), "utf8");
  //     return dbUpdated;
  //   }
}
