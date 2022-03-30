const mongoose = require("mongoose");

const configuration = require("../../configuration");
const utils = require("../../utils");

exports.getDAO = require("./dao");

exports.connect = () => {
	mongoose
		.connect(configuration.MONGO_URL, configuration.MONGO_OPTIONS)
		.then(() => {
			utils.Logger.debug("Connected to MongoDB");
		})
		.catch((err) => {
			utils.Logger.error("Error connecting to MongoDB: ", err);
		});
};
