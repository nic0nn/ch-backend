const { Product } = require("../models");
const database = require("./../db");

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await database.getById("products", id);

  if (!product) {
    return res.status(410).json({
      status: "error",
      message: `producto ${id} no encontrado`,
    });
  }

  res.json({ status: "ok", data: database.getById("products", id) });
};

exports.getProducts = async (req, res, next) => {
  const { id } = req.params;

  if (id) return next();

  res.json({ status: "ok", data: await database.get("products") });
};

exports.createProduct = async (req, res) => {
  const { body } = req;
  const product = new Product({ ...body });

  await database.insert("products", product);

  res.status(201).json({
    status: "ok",
    message: `producto agregado correctamente`,
    insertedId: product.id,
  });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await database.update("products", id, body);
  res.json({
    status: "ok",
    message: `producto ${id} actualizado correctamente`,
  });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await database.delete("products", id);
  res.json({
    status: "ok",
    message: `producto ${id} eliminado correctamente`,
  });
};
