const User = require("../models/User");

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
  getAdmin: async () => {
    return await User.findOne({ role: "admin" });
  }
};

module.exports = DAO