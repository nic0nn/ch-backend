const express = require("express");
const cors = require("cors");

const persistence = require("../persistence");
const middlewares = require("../middlewares");
const configuration = require("../configuration");
const routes = require("../routes");
const utils = require("../utils");
const passport = require("../libs/passport");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("../libs/swagger/options");

const { UsersServices } = require("../services");

const app = express();
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpecs, { customSiteTitle: "API - CoderHouse" })
);
app.use(passport.initialize());

app.use(middlewares.morgan);
app.use(middlewares.respond);

app.use("/api/v1", routes);

app.use(middlewares.errors);

exports.start = async () => {
	await persistence.connect();
	await UsersServices.createAdmin();
	app.listen(configuration.PORT, () => {
		utils.Logger.debug("Server started on port 3000");
	});
};
