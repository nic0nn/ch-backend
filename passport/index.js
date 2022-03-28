const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../persistence").dao("users");

const { JWT_SECRET } = require("../configuration");
const { APIError } = require("../utils");

passport.use(
	"login",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		async (username, password, done) => {
			try {
				const error = new APIError(401, "usuario o contraseña inválidos");

				const user = await User.findOne({ username });
				if (!user) return done(error, false);

				const result = bcrypt.compareSync(password, user?.password);
				if (!result) return done(error, false);

				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			secretOrKey: JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		},
		async (token, done) => {
			try {
				return done(null, token);
			} catch (error) {
				done(error);
			}
		}
	)
);

module.exports = passport;
