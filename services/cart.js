const { APIError } = require("../utils");

const Users = require("../persistence").getDAO("users");
const Products = require("../persistence").getDAO("products");
const Order = require("../persistence").getDAO("orders");

exports.getProducts = async (userId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	return user.cart;
};

exports.addProducts = async (userId, products) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	let { cart } = user;

	for (const product of products) {
		const data = await Products.findById(product._id);
		if (!data) continue;
		if (cart.some((product) => data._id.equals(product._id))) continue;
		cart.push({ _id: data._id, quantity: product.quantity });
	}

	const newUser = await Users.update(userId, { cart });
	return newUser;
};

exports.deleteProduct = async (userId, productId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const newCart = user.cart.filter((product) => !product._id.equals(productId));
	const newUser = await Users.update(userId, { cart: newCart });
	return newUser;
};

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

	const admin = await Users.findOne({ role: "admin" });
	await Users.update(userId, { cart: [] });

	EmailServices.send({
		to: admin.email,
		subject: "Nueva orden",
		text: `El usuario ${user.name} ha realizado una nueva orden`
	});

	EmailServices.send({
		to: user.email,
		subject: "Orden generada",
		text: `Su orden ha sido generada correctamente`
	});

	return newOrder;
};