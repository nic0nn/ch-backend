const winston = require("winston");
const configuration = require("../configuration");

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4
};

const level = () => {
	const env = configuration.NODE_ENV || "development";
	const isDevelopment = env === "development";
	return isDevelopment ? "debug" : "warn";
};

const format = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
	winston.format.colorize({ all: true }),
	winston.format.printf(({ level, message, timestamp }) => {
		return `${timestamp} [${level}]: ${message}`;
	})
);

const transports = [new winston.transports.Console()];

const Logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports
});

module.exports = Logger;
