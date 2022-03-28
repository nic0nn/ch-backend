const Moongose = require("mongoose");
const Product = require("./Product");

const schema = new Moongose.Schema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  products: {
    type: [Product.schema],
    required: true,
  },
});

module.exports = Moongose.model("carts", schema);
