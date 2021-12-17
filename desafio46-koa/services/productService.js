const fs = require("fs");

module.exports = class {
  db = [];
  constructor() {
    try {
      this.db = fs.readFileSync("./data/products.json", "utf8");
    } catch (error) {
      this.db = fs.writeFileSync(
        "./data/products.json",
        JSON.stringify([]),
        "utf8"
      );
    }
  }
  create(product) {
    this.db = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
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
    fs.writeFileSync("./data/products.json", JSON.stringify(this.db), "utf8");

    return nuevoProducto;
  }

  getAll() {
    console.log(this.db);
    return JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
  }

  getOne(id) {
    this.db = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
    return this.db.find((product) => product.id === id);
  }

  update(id, updatedProduct) {
    this.db = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
    const { name, description, code, price, stock } = updatedProduct;
    const productToEdit = this.db.find((product) => product.id === id);
    if (productToEdit) {
      productToEdit.name = name;
      productToEdit.description = description;
      productToEdit.code = code;
      productToEdit.price = price;
      productToEdit.stock = stock;

      fs.writeFileSync("./data/products.json", JSON.stringify(this.db), "utf8");
      return productToEdit;
    } else {
      return `Producto no encontrado`;
    }
  }

  delete(id) {
    this.db = JSON.parse(fs.readFileSync("/data/products.json", "utf8"));
    const dbUpdated = this.db.filter((product) => product.id !== id);
    fs.writeFileSync("./data/products.json", JSON.stringify(dbUpdated), "utf8");
    return dbUpdated;
  }
};
