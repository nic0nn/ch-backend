const connect = require("./connection");
const models = require("./models");
const { DB_TYPE } = require("./../../config");

if (DB_TYPE === "mongodb") {
  connect("coderhouse");
}

module.exports = {
  models,
};
