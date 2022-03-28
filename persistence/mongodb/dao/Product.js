const { Logger } = require("../../../utils");
const Product = require("../models/Product");

const DAO = {
  find: async () => {
    return await Product.find();
  },
  findById: async id => {
    return await Product.findOne({ _id: id });
  },
  create: async product => {
    Logger.info("WTF")
    return await Product.create(product);
  },
  update: async (id, product) => {
    return await Product.findByIdAndUpdate(id, product, { new: true});
  },
  delete: async id => {
    return await Product.findByIdAndDelete(id);
  }
};


module.exports = DAO;