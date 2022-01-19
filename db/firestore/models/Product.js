const { generateId } = require("../../../helpers");
const Database = require("./../Database");

class Product {
  constructor({
    _id,
    timestamp,
    name,
    description,
    code,
    price,
    image,
    stock,
  }) {
    this._id = _id || generateId();
    this.timestamp = timestamp || Date.now();
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.stock = stock;
    this.code = code;
  }

  static create = async (data) => {
    const product = await Database.insert("products", data);
    return new Product({ ...product, _id: product.id });
  };

  static findById = async (id) => {
    const data = await Database.getById("products", id);
    if (!data) return null;
    return new Product({ ...data, _id: data.id });
  };

  static delete = async (id) => {
    await Database.delete("products", id);
  };

  static find = async () => {
    const data = await Database.get("products");
    return data.map((product) => new Product({ ...product, _id: product.id }));
  };

  static actualize = async (id, data) => {
    await Database.update("products", id, data);
  };

  getId() {
    return this._id;
  }

  setId() {
    this._id = generateId();
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }
}

module.exports = Product;
