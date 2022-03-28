const utils = require("../utils");
const morgan = require("morgan");

const stream = {
	write: (message) => utils.Logger.info(message.replace(/(?:\r\n|\r|\n)/g, ""))
};

const middleware = morgan("dev", { stream });

module.exports = middleware;
