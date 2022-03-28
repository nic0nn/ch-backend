const Moongose = require("mongoose");

const schema = new Moongose.Schema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
  },
});

module.exports = Moongose.model("products", schema);
