const passport = require("passport");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../configuration");

exports.login = (req, res, next) => {
	try {
		passport.authenticate("login", (err, user) => {
			if (err) return next(err);
			const token = jwt.sign(user, JWT_SECRET);
			return res.respond({ data: { token, ...user } });
		})(req, res, next);
	} catch (error) {
		next(error);
	}
};
