const { generateId } = require("../helpers");

class Product {
  constructor({
    id,
    timestamp,
    name,
    description,
    code,
    price,
    image,
    stock,
  }) {
    this.id = id || generateId();
    this.timestamp = timestamp || Date.now();
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.stock = stock;
    this.code = code;
  }

  getId() {
    return this.id;
  }

  setId() {
    this.id = generateId();
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }
}

module.exports = Product;
