const EmailServices = require("./email");
const { APIError } = require("../utils");

const Users = require("../persistence").getDAO("users");
const Products = require("../persistence").getDAO("products");
const Orders = require("../persistence").getDAO("orders");



exports.getOrders = async (userId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const orders = await Orders.getAll(userId);

	return orders;
};
