const FileManager = require("./FileManager");
const { getURL } = require("./files");

class Database {
  constructor() {
    this.products = new FileManager(getURL("products"));
    this.carts = new FileManager(getURL("carts"));
  }

  insert = async (type, data) => {
    const manager = this[type];
    let existingData = await manager.getData();
    existingData.push(data);
    manager.save(existingData);
    return data;
  };

  get = async (type) => {
    return this[type].getData();
  };

  getById = async (type, id) => {
    const data = await this[type].getData();
    const filtered = data.find((item) => item._id === id);
    return filtered
  };

  update = async (type, id, data) => {
    const manager = this[type];
    let existingData = await manager.getData();
    const index = existingData.findIndex((item) => item._id === id);
    const newData = { ...existingData[index], ...data };
    existingData.splice(index, 1, newData);
    manager.save(existingData);
  };

  delete = async (type, id) => {
    const manager = this[type];
    let existingData = await manager.getData();
    const index = existingData.findIndex((item) => item._id === id);
    existingData.splice(index, 1);
    manager.save(existingData);
  };
}

const database = new Database();
Object.freeze(database);

module.exports = database;
