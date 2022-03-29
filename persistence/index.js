const configuration = require("../configuration");

const { connect, getDAO } = require(`./${
	configuration.DB_TYPE ? configuration.DB_TYPE : "mongodb"
}`);

module.exports = {
  getDAO,
	connect
};
