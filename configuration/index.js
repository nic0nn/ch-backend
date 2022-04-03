exports.NODE_ENV = process.env.NODE_ENV || "development";
exports.PORT = process.env.PORT || 3000;

exports.DB_TYPE = process.env.DB_TYPE || "mongodb";
exports.MONGO_URL =
	process.env.MONGO_URL || "mongodb://localhost:27017/coderhouse";
exports.MONGO_OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

exports.GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT || "";
exports.GMAIL_PASSWORD = process.env.GMAIL_PASSWORD || "";
