const Cart = require("../models/Cart");
const Product = require("../models/Product");

const DAO = {
	getProducts: async (id) => {
		const cart = await Cart.findById(id);
		return cart.products;
	},
	addProducts: async (id, products) => {
    const cart = await Cart.findById(id);
		for (const product of products) {
			const data = await Product.findById(product._id).lean();
			if (!data) continue;
			if (cart.products.some((p) => p._id === product._id)) continue;
			cart.products.push({ ...data, quantity: product.quantity });
		}
    await cart.save();
	},
  deleteProduct: async (id, productId) => {
    const cart = await Cart.findById(id);
    cart.products = cart.products.filter((p) => p._id !== productId);
    await cart.save();
  }
};

module.exports = DAO;
