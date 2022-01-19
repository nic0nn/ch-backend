const CustomError = require("./CustomError");

const throwError = (next, statusCode, message) => {
  const error = new CustomError(statusCode, message);
  next(error);
};

module.exports = { throwError, CustomError };
