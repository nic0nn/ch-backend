const express = require("express");
const cors = require("cors");

const persistence = require("../persistence")
const middlewares = require("../middlewares")
const configuration = require("../configuration");
const routes = require("../routes");
const utils = require("../utils");
const passport = require("../passport")

const { UsersServices } = require("../services");

const app = express();

app.use(cors());
app.use(express.json())

app.use(passport.initialize())

app.use(middlewares.morgan);
app.use(middlewares.respond)

app.use("/api/v1", routes);

app.use(middlewares.errors)

exports.start = async () => {
	await persistence.connect();
	await UsersServices.createAdmin();
	app.listen(configuration.PORT, () => {
		utils.Logger.debug("Server started on port 3000");
	});
};
