import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class ProductsService {
  public db;
  constructor() {
    try {
      this.db = readFileSync('/data/products.json', 'utf8');
    } catch (error) {
      this.db = writeFileSync(
        '/data/products.json',
        JSON.stringify([]),
        'utf8',
      );
    }
  }

  create(createProductDto: CreateProductDto) {
    this.db = JSON.parse(readFileSync('/data/products.json', 'utf8'));
    const { id, name, description, code, price, stock } = createProductDto;
    const nuevoProducto = {
      id: id,
      name: name,
      description: description,
      code: code,
      price: price,
      stock: stock,
    };
    this.db.push(nuevoProducto);
    writeFileSync('/data/products.json', JSON.stringify(this.db), 'utf8');
    return nuevoProducto;
  }

  findAll() {
    return JSON.parse(readFileSync('/data/products.json', 'utf8'));
  }

  findOne(id: string) {
    this.db = JSON.parse(readFileSync('/data/products.json', 'utf8'));
    return this.db.find((product: any) => product.id === id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    this.db = JSON.parse(readFileSync('/data/products.json', 'utf8'));
    const { name, description, code, price, stock } = updateProductDto;
    const productToEdit = this.db.find((product: any) => product.id === id);
    if (productToEdit) {
      productToEdit.name = name;
      productToEdit.description = description;
      productToEdit.code = code;
      productToEdit.price = price;
      productToEdit.stock = stock;

      writeFileSync('/data/products.json', JSON.stringify(this.db), 'utf8');
      return productToEdit;
    } else {
      return `Producto no encontrado`;
    }
  }

  remove(id: string) {
    this.db = JSON.parse(readFileSync('/data/products.json', 'utf8'));
    const dbUpdated = this.db.filter((product) => product.id !== id);
    writeFileSync('/data/products.json', JSON.stringify(dbUpdated), 'utf8');
    return dbUpdated;
  }
}
