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

schema.statics = {
  delete: async function (id) {
    await Moongose.model("carts").deleteOne({
      _id: Moongose.Types.ObjectId(id),
    });
  },
};

schema.methods = {
  getProducts: async function () {
    return this.products;
  },
  addProducts: async function (products) {
    for (const product of products) {
      const data = await Product.findById(product._id).lean();
      if (!data) continue;
      if (this.products.some((p) => p._id === product._id)) continue;
      this.products.push({ ...data, quantity: product.quantity });
    }

    await Moongose.model("carts").updateOne(
      { _id: this._id },
      {
        $set: {
          products: this.products,
        },
      }
    );
  },
  deleteProduct: async function (productId) {
    this.products = this.products.filter(
      (product) => !Moongose.Types.ObjectId(productId).equals(product._id)
    );
    await Moongose.model("carts").updateOne(
      { _id: this._id },
      {
        $set: {
          products: this.products,
        },
      }
    );
  },
};

module.exports = Moongose.model("carts", schema);
