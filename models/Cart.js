const database = require("../db");
const { generateId } = require("../helpers");

class Cart {
  constructor({ id, timestamp, products }) {
    this.id = id || generateId();
    this.timestamp = timestamp || Date.now();
    this.products = products || [];
  }

  getId() {
    return this.id;
  }

  getProducts() {
    return this.products;
  }

  setId() {
    this.id = generateId();
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  async addProducts(products) {
    for (const product of products) {
      const data = await database.getById("products", product.id);
      if (!data) continue;
      this.products.push({ ...data, quantity: product.quantity });
    }
  }

  deleteProduct(productId) {
    const { products } = this;
    const index = products.findIndex((product) => product.id === productId);
    products.splice(index, 1);
  }
}

module.exports = Cart;
