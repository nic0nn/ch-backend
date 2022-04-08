const passport = require("passport");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../../persistence").getDAO("users");

const { JWT_SECRET } = require("../../configuration");
const { APIError } = require("../../utils");
const { UserServices } = require("../../services");

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

				const user = await UserServices.getUser(username);
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
	"register",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		async (username, password, done) => {
			try {
				const user = await UserServices.getUser(username)
				if (user) return done(new APIError(400, "el usuario ya existe"), false);
				const hash = bcrypt.hashSync(password, 10);
				const newUser = await User.create({ username, password: hash });
				return done(null, newUser);
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
