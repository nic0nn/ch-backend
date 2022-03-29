const Moongose = require("mongoose");
const Product = require("./Product");

const schema = new Moongose.Schema({
	products: {
		type: Array,
		required: true
	},
	userId: {
		type: Moongose.Schema.Types.ObjectId,
		required: true,
		ref: "users"
	},
	total: {
		type: Number,
		required: true
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

module.exports = Moongose.model("orders", schema);
