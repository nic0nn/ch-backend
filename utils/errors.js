class APIError extends Error {
	constructor(statusCode, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.stack = new Error().stack;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = APIError;
