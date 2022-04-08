const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		}
	},
	{ _id: false }
);

const schema = mongoose.Schema({
	products: {
		type: [ProductSchema],
		required: true,
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

module.exports = mongoose.model("carts", schema);
