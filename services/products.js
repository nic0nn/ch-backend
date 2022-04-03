const { APIError } = require("../utils");
const Product = require("../persistence").getDAO("products");
const utils = require("../utils");
exports.getAll = async () => {
	const products = await Product.getAll();
	return products;
};

exports.getById = async (id) => {
	const product = await Product.findById(id);
	if (!product) {
		throw new APIError(404, `producto ${id} no encontrado`);
	}
	return product;
};

exports.create = async (data) => {
	try {
		if (!data.code) {
			data.code = utils.Products.generateCode();
		}
		const product = await Product.create(data);
		return product;
	} catch (error) {
		throw new APIError(400, error.message);
	}
};

exports.update = async (id, data) => {
	try {
		let product = await Product.findById(id);
		if (!product) {
			throw new APIError(404, `producto ${id} no encontrado`);
		}
		return await Product.update(id, data);
	} catch (error) {
		throw new APIError(400, error.message);
	}
};

exports.delete = async (id) => {
	const product = await Product.findById(id);
	if (!product) {
		throw new APIError(404, `producto ${id} no encontrado`);
	}
	await Product.delete(id);
	return true;
};
