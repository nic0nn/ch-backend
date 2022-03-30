const { APIError } = require("../utils");

const Users = require("../persistence").getDAO("users");
const Products = require("../persistence").getDAO("products");

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
