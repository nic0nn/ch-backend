const configuration = require("../configuration");

const { connect, dao } = require(`./${
	configuration.DB_TYPE ? configuration.DB_TYPE : "mongodb"
}`);

module.exports = {
  dao,
	connect
};
