const crypto = require("crypto");

exports.generateId = () => {
  return crypto.randomBytes(8).toString("hex");
};
