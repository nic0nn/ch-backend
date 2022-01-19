const Database = require("../Database");
const { generateId } = require("../../../helpers");
const Product = require("./Product");

class Cart {
  constructor({ _id, timestamp, products }) {
    this._id = _id || generateId();
    this.timestamp = timestamp || Date.now();
    this.products = products || [];
  }

  static findById = async (id) => {
    const data = await Database.getById("carts", id);
    if (!data) return null;
    return new Cart({ ...data, _id: data.id });
  };

  static create = async (data) => {
    data.timestamp = Date.now();
    data.products = [];
    const cart = await Database.insert("carts", data);
    return new Cart({ ...cart, _id: cart.id });
  };

  static delete = async (id) => {
    await Database.delete("carts", id);
  };

  getId() {
    return this._id;
  }

  async getProducts() {
    return this.products;
  }

  setId() {
    this._id = generateId();
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  async addProducts(products) {
    for (const product of products) {
      const data = await Product.findById(product._id);
      if (!data) continue;
      this.products.push({ ...data, quantity: product.quantity });
    }
    await Database.update("carts", this._id, this);
  }

  async deleteProduct(productId) {
    const { products } = this;
    const index = products.findIndex((product) => product._id === productId);
    products.splice(index, 1);
    await Database.update("carts", this._id, this);
  }
}

module.exports = Cart;
