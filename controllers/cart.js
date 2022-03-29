
const { CartServices } = require("../services");

exports.getProducts = async (req, res, next) => {
	try {
		const { user } = req;
		const products = await CartServices.getProducts(user._id);
		res.respond({ data: products });
	} catch (error) {
		next(error);
	}
};

exports.addProducts = async (req, res, next) => {
	try {
		const { user } = req;
		const { products } = req.body;
		const { cart } = await CartServices.addProducts(user._id, products);
		res.json({
			status: "ok",
			message: `productos agregado correctamente`,
			data: cart
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteProduct = async (req, res, next) => {
	try {
		const { user } = req;
		const { productId } = req.params;
		const { cart } = await CartServices.deleteProduct(user._id, productId);
		res.json({
			status: "ok",
			message: `producto eliminado correctamente`,
			data: cart
		});
	} catch (error) {
		next(error);
	}
};
