const EmailServices = require("./email");
const { APIError } = require("../utils");

const Users = require("../persistence").getDAO("users");
const Products = require("../persistence").getDAO("products");
const Orders = require("../persistence").getDAO("orders");
const Cart = require("../persistence").getDAO("cart");

exports.getOrders = async (userId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const orders = await Orders.getAll(userId);

	return orders;
};

exports.generateOrder = async (userId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const cart = await Cart.getById(user.cartId);

	if (!cart.products.length) {
		throw new APIError(400, "no hay productos en el carrito");
	}

	const products = await Products.filterByIds(
		cart.products.map((product) => product._id)
	);

	const order = {
		userId: userId,
		products: products.map((product) => ({
			_id: product._id,
			name: product.name,
			price: product.price,
			quantity: cart.products.find((p) => p._id.equals(product._id)).quantity
		})),
		total: products.reduce(
			(total, product) =>
				total +
				product.price *
					cart.products.find((p) => p._id.equals(product._id)).quantity,
			0
		)
	};

	const newOrder = await Orders.create(order);

	const admin = await Users.findOne({ role: "admin" });
	await Cart.update(cart._id, []);

	sendOrderToUser(user, order);
	sendOrderToAdmin(admin, order);

	return newOrder;
};

sendOrderToUser = (user, order) => {
	EmailServices.send({
		to: user.email,
		subject: "Orden generada",
		text: `Su orden ha sido generada correctamente`
	});
};

sendOrderToAdmin = (admin, order) => {
	EmailServices.send({
		to: admin.email,
		subject: "Nueva orden",
		text: `El usuario ${user.name} ha realizado una nueva orden`
	});
};
