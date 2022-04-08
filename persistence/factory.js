const mongodb = require("./mongodb");

class PersistenceFactory {
	create(name) {
		if (name === "mongodb") {
			return { ...mongodb };
		}
	}
}

module.exports = PersistenceFactory;
