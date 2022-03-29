const { User } = require("../models");

const DAO = {
	create: async (user) => {
		const newUser = new User(user);
		return await newUser.save();
	},
	find: async (filter) => {
		return await User.find({ ...filter });
	},
	findOne: async (filter) => {
		return await User.findOne({ ...filter }).lean();
	},
	findById: async (id) => {
		return await User.findById(id).lean();
	},
	getAdmin: async () => {
		return await User.findOne({ role: "admin" });
	},
	update: async (userId, data) => {
		const user = await User.findByIdAndUpdate(userId, data, { new: true }).lean();
		return user;
	}
};

module.exports = DAO;
