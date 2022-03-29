const { Orders } = require("../models");

const DAO = {
	create: async (order) => {
		const newOrder = new Orders(order);
		return await newOrder.save();
	}
};

module.exports = DAO;
