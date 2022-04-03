const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const handlebars = require("express-handlebars");

const persistence = require("../../persistence");
const middlewares = require("../../middlewares");
const configuration = require("../../configuration");
const routes = require("../../routes");
const utils = require("../../utils");
const passport = require("../../libs/passport");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("../../libs/swagger/options");
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const { UsersServices } = require("../../services");

const app = express();

app.use(cors());
app.use(express.json());

const hbs = handlebars.create({
	extname: ".hbs",
	defaultLayout: "main.hbs",
	layoutsDir: path.join(__dirname, "../../views/layouts"),
	partialsDir: path.join(__dirname, "../../views/partials")
});

app.engine(".hbs", hbs.engine);

app.set("view engine", ".hbs");
app.set("views", `${__dirname}/../../views`);

app.use(express.static("public"));

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpecs, { customSiteTitle: "API - CoderHouse" })
);

app.use(passport.initialize());

app.use(middlewares.morgan);
app.use(middlewares.respond);

app.get("/", (req, res) => {
	res.render("index.hbs", {});
});

app.get("/configuracion", (req, res) => {
	res.render("config.hbs", {
		configuration: utils.Configuration.getSafeConfiguration({
			...configuration
		})
	});
});

app.get("/chat", (req, res) => {
	res.render("chat.hbs", {
		header: '<script src="/socket.io/socket.io.js"></script>'
	});
});

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
