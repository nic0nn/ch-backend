const passport = require("passport");
const jwt = require("jsonwebtoken");
const path = require("path");

const User = require("../persistence").getDAO("users");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../configuration");
const { APIError } = require("../utils");
const { UserServices } = require("../services");

exports.login = (req, res, next) => {
	try {
		passport.authenticate("login", (err, user) => {
			if (err) return next(err);
			if (!user) throw new APIError(401, "Usuario o contraseña incorrectos");
			const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
			return res.respond({ data: { token, user } });
		})(req, res, next);
	} catch (error) {
		next(error);
	}
};

exports.register = (req, res, next) => {
	try {
		passport.authenticate("register", async (err, user) => {
			if (err) return next(err);
			const { email, phone, name, lastname } = req.body;
			const { file } = req;
			try {
				const userData = await UserServices.register(user._id, {
					email,
					phone,
					name,
					lastname,
					imageURL: file?.path.replace("public", "")
				});
				
				const token = jwt.sign(userData, JWT_SECRET, {
					expiresIn: JWT_EXPIRES_IN
				});
				return res.respond({ data: { token, user: userData } });
			} catch (error) {
				next(new APIError(400, "Error al registrar usuario"));
			}
		})(req, res, next);
	} catch (error) {
		next(error);
	}
};
