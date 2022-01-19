const admin = require("firebase-admin");
const { DB_TYPE } = require("./../../config");
const { connect } = require("./connection");

const generateObject = (doc) => {
  return {
    id: doc.id,
    ...doc.data(),
  };
};

class Database {
  constructor() {
    if (DB_TYPE === "firestore") {
      connect();
      this.db = admin.firestore();
      this.products = this.db.collection("products");
      this.carts = this.db.collection("carts");
    }
  }

  insert = async (type, data) => {
    const manager = this[type];
    const doc = await manager.add(data);
    return { id: doc.id };
  };

  get = async (type) => {
    const snapshot = await this[type].get();
    return snapshot.docs.map((doc) => generateObject(doc));
  };

  getById = async (type, id) => {
    const data = await this[type].doc(id).get();
    return generateObject(data);
  };

  update = async (type, id, data) => {
    const manager = this[type];
    await manager.doc(id).update({ ...data });
  };

  delete = async (type, id) => {
    const manager = this[type];
    await manager.doc(id).delete();
  };
}

const database = new Database();
Object.freeze(database);

module.exports = database;
