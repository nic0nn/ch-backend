const { APIError } = require("../utils");
const { IS_ADMIN } = require("./../configuration");

exports.adminOnly = (req, res, next) => {
	const error = new APIError(
		401,
		"No tienes permisos para realizar esta acción"
	);

  if (!req.user) throw error;
	if (req.user.role !== 'admin') throw error;

  next()
};
