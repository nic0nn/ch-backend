const configuration = require("../configuration");
const { DB_TYPE } = configuration;

const PersistenceFactory = require("./factory");

const factory = new PersistenceFactory();

module.exports = factory.create(DB_TYPE);
