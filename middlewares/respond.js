const respond = (req, res, next) => {
	res.respond = ({ status, message, data }) => {
		res.status(status || 200);
		if (!message) return res.json(data);
		res.json({
			message,
			result: data
		});
	};
	next();
};

module.exports = respond;
