const { Product } = require("../models");

const DAO = {
	getAll: async () => {
		return await Product.find();
	},
	findById: async (id) => {
		return await Product.findOne({ _id: id });
	},
	filterByIds: async (ids) => {
		return await Product.find({
			_id: { $in: ids }
		});
	},
	create: async (product) => {
		return await Product.create(product);
	},
	update: async (id, products) => {
		return await Product.findByIdAndUpdate(id, products, { new: true });
	},
	delete: async (id) => {
		return await Product.findByIdAndDelete(id);
	}
};

module.exports = DAO;
