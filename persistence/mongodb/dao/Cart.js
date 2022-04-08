const { Cart } = require("../models");

const DAO = {
	create: async () => {
		const newChat = new Cart();
		return await newChat.save();
	},
	getById: async (cartId) => {
		return await Cart.findOne({ _id: cartId });
	},
	update: async (cartId, products) => {
		return await Cart.findByIdAndUpdate(
			cartId,
			{ products: products || [] },
			{ new: true }
		);
	}
};

module.exports = DAO;
