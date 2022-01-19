const { CustomError } = require("../controllers/errors");

const errors = (error, req, res, next) => {
  console.log(error.stack)
  if (error instanceof CustomError) {
    const { statusCode, message } = error;
    res.status(statusCode).send({ status: "error", message });
    return;
  }
  res.status(500).send({ message: "error interno del servidor" });
};

module.exports = errors;
