const { IS_ADMIN } = require("./../config");

exports.addAdmin = (req, res, next) => {
  req.IS_ADMIN = IS_ADMIN;
  next();
};

exports.IS_ADMIN = (req, res, next) => {
  if (req.IS_ADMIN) {
    return next();
  }
  return res.status(401).json({
    status: "error",
    message: "No tienes permisos para realizar esta acción",
  });
};
