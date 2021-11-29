const { isAdmin } = require("./../config");

exports.addAdmin = (req, res, next) => {
  req.isAdmin = isAdmin;
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.isAdmin) {
    return next();
  }
  return res.status(401).json({
    status: "error",
    message: "No tienes permisos para realizar esta acción",
  });
};
