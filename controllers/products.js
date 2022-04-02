const { ProductServices } = require("../services");

exports.getProducts = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (id) return next();
		const products = await ProductServices.getAll();
		res.respond({ data: products });
	} catch (error) {
		next(error);
	}
};

exports.getProductById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await ProductServices.getById(id);
		res.respond({ data: product });
	} catch (error) {
		next(error);
	}
};

exports.createProduct = async (req, res, next) => {
	try {
		const { body } = req;
		const product = await ProductServices.create({
			...body,
			imageURL: req.file?.path.replace("public", "")
		});
		res.respond({
			status: 201,
			data: product,
			message: `producto ${product.name} agregado correctamente`
		});
	} catch (error) {
		next(error);
	}
};

exports.updateProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const product = await ProductServices.update(id, {
			...body,
			imageURL: req.file?.path.replace("public", "")
		});
		res.respond({
			data: product,
			message: `producto ${id} actualizado correctamente`
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		await ProductServices.delete(id);
		res.respond({
			message: `producto ${id} eliminado correctamente`
		});
	} catch (error) {
		next(error);
	}
};
