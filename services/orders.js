const { APIError } = require("../utils");

const Users = require("../persistence").getDAO("users");
const Products = require("../persistence").getDAO("products");
const Orders = require("../persistence").getDAO("orders");

exports.generateOrder = async (userId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const { cart } = user;

	if (!cart.length) {
		throw new APIError(400, "no hay productos en el carrito");
	}

	const products = await Products.filterByIds(
		cart.map((product) => product._id)
	);

	const order = {
		userId: userId,
		products: products.map((product) => ({
			_id: product._id,
			name: product.name,
			price: product.price,
			quantity: cart.find((p) => p._id.equals(product._id)).quantity
		})),
		total: products.reduce(
			(total, product) =>
				total +
				product.price * cart.find((p) => p._id.equals(product._id)).quantity,
			0
		)
	};

	const newOrder = await Orders.create(order);
	await Users.update(userId, { cart: [] });
	return newOrder;
};

exports.getOrders = async (userId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const orders = await Orders.getAll(userId);

	return orders;
};
