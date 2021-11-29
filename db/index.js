const FileManager = require("./FileManager");

class Database {
  constructor() {
    this.products = new FileManager("./db/products.txt");
    this.carts = new FileManager("./db/carts.txt");
  }

  get = async (type) => {
    return this[type].getData();
  };

  getById = async (type, id) => {
    const data = await this[type].getData();
    return data.find((item) => item.id === id);
  };

  insert = async (type, data) => {
    const manager = this[type];
    let existingData = await manager.getData();
    existingData.push(data);
    manager.save(existingData);
  };

  update = async (type, id, data) => {
    const manager = this[type];
    let existingData = await manager.getData();
    const index = existingData.findIndex((item) => item.id === id);
    const newData = { ...existingData[index], ...data };
    existingData.splice(index, 1, newData);
    manager.save(existingData);
  };

  delete = async (type, id) => {
    const manager = this[type];
    let existingData = await manager.getData();
    const index = existingData.findIndex((item) => item.id === id);
    existingData.splice(index, 1);
    manager.save(newData);
  };
}

const database = new Database();
Object.freeze(database);

module.exports = database;
