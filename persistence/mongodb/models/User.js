const Moongose = require("mongoose");

const schema = new Moongose.Schema({
	username: {
		type: String,
		required: true,
	},
	name: {
		type: String
	},
	imageURL: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String
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
	}
});

module.exports = Moongose.model("users", schema);
