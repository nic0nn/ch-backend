const Order = require("./Order");
const Product = require("./Product");
const User = require("./User");
const Chat = require("./Chat");
const Cart = require("./Cart");

const getDAO = (type) => {
	switch (type) {
		case "products":
			return Product;
		case "orders":
			return Order;
		case "users":
			return User;
		case "chat":
			return Chat;
			case "cart":
				return Cart;
		default:
			return {};
	}
};


module.exports = getDAO;
