const { APIError, Logger } = require("../utils");

const errors = (error, req, res, next) => {
	Logger.error(error, error.stack);

	if (error.name === "CastError") {
		res.status(400).send({ status: "error", message: "id inválido" });
	}
	if (error instanceof APIError) {
		const { statusCode, message } = error;
		res.status(statusCode).send({ status: "error", message });
		return;
	}
	res.status(500).send({ message: "error interno del servidor" });
};

module.exports = errors;
