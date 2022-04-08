const { APIError } = require("../utils");

const Users = require("../persistence").getDAO("users");
const Products = require("../persistence").getDAO("products");
const Cart = require("../persistence").getDAO("cart");

exports.getProducts = async (userId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const cart = await Cart.getById(user.cartId);

	return cart.products;
};

exports.addProducts = async (userId, products) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	let { cartId } = user;

	let cart = await Cart.getById(cartId);

	for (const product of products) {
		const data = await Products.findById(product._id);
		if (!data) continue;
		if (cart.products.some((item) => data._id.equals(item._id))) continue;
		cart.products.push({ _id: data._id, quantity: product.quantity });
	}

	if (!cart.products.length) {
		throw new APIError(400, "no hay productos para agregar");
	}

	const newCart = await Cart.update(cartId, cart.products);

	return newCart.products;
};

exports.deleteProduct = async (userId, productId) => {
	const user = await Users.findById(userId);

	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const cart = await Cart.getById(user.cartId);

	const products = cart.products.filter(
		(product) => !product._id.equals(productId)
	);
	const newCart = await Cart.update(user.cartId, products);
	return newCart.products;
};
