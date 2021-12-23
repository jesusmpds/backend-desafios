type productType = {
  id: string;
  name: string;
  description: string;
  code: string;
  price: string;
  stock: string;
};

export default class {
  db: Array<productType> = [];

  create(product: productType) {
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

  getOne(id: string) {
    return this.db.find((product) => product.id === id);
  }

  update(id: string, updatedProduct: Record<string, string>) {
    const { name, description, code, price, stock } = updatedProduct;
    const productToEdit = this.db.find((product) => product.id === id);
    if (productToEdit) {
      productToEdit.name = name;
      productToEdit.description = description;
      productToEdit.code = code;
      productToEdit.price = price;
      productToEdit.stock = stock;

      return productToEdit;
    } else {
      return `Producto no encontrado`;
    }
  }

  delete(id: string) {
    const dbUpdated = this.db.filter((product) => product.id !== id);
    return dbUpdated;
  }
}
