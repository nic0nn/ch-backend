const { OrderServices, EmailServices } = require("../services");

exports.getOrders = async (req, res, next) => {
	try {
		const { user } = req;
		const orders = await OrderServices.getOrders(user._id);
		res.json({
			status: "ok",
			message: `ordenes obtenidas correctamente`,
			data: orders
		});
	} catch (error) {
		next(error);
	}
};
