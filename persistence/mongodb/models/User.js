const Moongose = require("mongoose");

const schema = new Moongose.Schema({
	username: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: "user"
	},
	cart: {
		type: Array,
		default: []
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
});

module.exports = Moongose.model("users", schema);
