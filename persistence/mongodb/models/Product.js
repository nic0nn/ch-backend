const Moongose = require("mongoose");

const schema = new Moongose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		required: true
	},
	imageURL: {
		type: String,
	},
	stock: {
		type: Number,
		required: true
	},
	code: {
		type: String,
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

module.exports = Moongose.model("products", schema);
