const { throwError, CustomError } = require("../errors");
const { models } = require("../../db");
const { Product } = models;

exports.getProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) return next();
    const data = await Product.find({});
    res.json({ status: "ok", data });
  } catch (error) {
    return throwError(next, 400, "error al obtener productos");
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return throwError(next, 404, `producto ${id} no encontrado`);
    }

    res.json({ status: "ok", data: product });
  } catch (error) {
    return throwError(next, 400, "error al obtener producto");
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { body } = req;
    const product = await Product.create(body);

    res.status(201).json({
      status: "ok",
      message: `producto agregado correctamente`,
      insertedId: product._id,
    });
  } catch (error) {
    return throwError(next, 400, "error al crear producto");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    let product = await Product.findById(id);

    if (!product) {
      return throwError(next, 404, `producto ${id} no encontrado`);
    }

    await Product.actualize(id, body);

    res.json({
      status: "ok",
      message: `producto ${id} actualizado correctamente`,
    });
  } catch (error) {
    return throwError(next, 400, "error al actualizar producto");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.delete(id);
    res.json({
      status: "ok",
      message: `producto ${id} eliminado correctamente`,
    });
  } catch (error) {
    return throwError(next, 400, "error al eliminar producto");
  }
};
