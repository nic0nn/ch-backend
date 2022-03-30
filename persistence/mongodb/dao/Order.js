const { Order } = require("../models");

const DAO = {
	create: async (order) => {
		const newOrder = new Order(order);
		return await newOrder.save();
	},
	getAll: async (userId) => {
		return await Order.find({ userId });
	}
};

module.exports = DAO;
