const express = require("express");
const cors = require("cors");
const http = require("http");

const socket = require(".");

const persistence = require("../../persistence");
const middlewares = require("../../middlewares");
const configuration = require("../../configuration");
const routes = require("../../routes");
const utils = require("../../utils");
const passport = require("../../libs/passport");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("../../libs/swagger/options");

const { UsersServices } = require("../../services");

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

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

const httpServer = http.createServer(app);

const start = async () => {
	await persistence.connect();
	await UsersServices.createAdmin();
	httpServer.listen(configuration.PORT, () => {
		utils.Logger.debug("Server started on port: " + configuration.PORT);
	});
};

module.exports = { server: httpServer, start };
