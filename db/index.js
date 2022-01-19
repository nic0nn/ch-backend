const { DB_TYPE } = require("../config");
const { models } = require(`./${DB_TYPE ? DB_TYPE : "filesystem"}`);

module.exports = {
  models,
};
