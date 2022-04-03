const { Chat } = require("../models");

const DAO = {
	create: async (order) => {
		const newChat = new Chat(order);
		return await newChat.save();
	},
	getAll: async () => {
		return await Chat.find({});
	}
};

module.exports = DAO;
