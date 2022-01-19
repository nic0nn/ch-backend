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

schema.statics = {
  actualize: async function (id, data) {
    await Moongose.model("products").updateOne(
      { _id: Moongose.Types.ObjectId(id) },
      { $set: { ...data } }
    );
  },
  delete: async function (id) {
    await Moongose.model("products").deleteOne({
      _id: Moongose.Types.ObjectId(id),
    });
  },
};

module.exports = Moongose.model("products", schema);
