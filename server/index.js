const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./../.env") });

const http = require("./http");
const socket = require("./socket");

exports.start = () => {
	socket.start(http.server);
	http.start();
};
