const mongoose = require("mongoose");

const schema = mongoose.Schema({
	email: {
		type: String
	},
	message: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("chats", schema);
