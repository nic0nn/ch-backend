const bcrypt = require("bcrypt");
const Users = require("../persistence").getDAO("users");
const Cart = require("../persistence").getDAO("cart");

exports.createAdmin = async () => {
	const existingAdmin = await Users.getAdmin({ role: "admin" });
	if (existingAdmin) return;

	const password = await bcrypt.hash("admin", 10);

	const data = {
		username: "admin",
		name: "admin",
		lastname: "admin",
		email: "admin@example.org",
		password,
		role: "admin",
		phone: "1234567890"
	};
	const cart = await Cart.create();
	const admin = await Users.create({ ...data, cartId: cart._id });
	return admin;
};

exports.getUser = async (username) => {
	const user = await Users.findOne({ username });
	return user;
};

exports.register = async (userId, data) => {
	const user = await Users.findById(userId);
	if (!user) {
		throw new APIError(404, "usuario no encontrado");
	}

	const existingUser = await Users.findByEmail({ email: data.email });

	if (existingUser) {
		throw new APIError(409, "email ya registrado");
	}

	const { email, phone, name, lastname, imageURL } = data;

	const userData = {
		email,
		phone,
		name,
		lastname,
		imageURL
	};

	const cart = await Cart.create();
	const newUser = await Users.update(userId, { ...userData, cartId: cart._id });
	return newUser;
};
