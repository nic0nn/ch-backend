const { APIError } = require("../utils");
const Product = require("../persistence").getDAO("products");

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
	const product = await Product.create(data);
	return product;
};

exports.update = async (id, data) => {
	let product = await Product.findById(id);
	if (!product) {
		throw new APIError(404, `producto ${id} no encontrado`);
	}
	return await Product.update(id, data);;
};

exports.delete = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new APIError(404, `producto ${id} no encontrado`);
  }
  await Product.delete(id);
  return true;
}