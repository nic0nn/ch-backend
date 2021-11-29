const { Cart } = require("../models");
const database = require("./../db");

exports.createCart = async (req, res) => {
  const cart = new Cart({});

  await database.insert("carts", cart);

  res.status(201).json({
    status: "ok",
    message: `carrito agregado correctamente`,
    insertedId: cart.id,
  });
};

exports.getProducts = async (req, res) => {
  const { id } = req.params;
  const data = await database.getById("carts", id);
  if (!data) {
    return res.status(410).json({
      status: "error",
      message: `carrito ${id} no encontrado`,
    });
  }
  const cart = new Cart({ ...data });
  res.json({ status: "ok", data: cart.getProducts() });
};

exports.addProducts = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const data = await database.getById("carts", id);

  if (!data) {
    return res.status(410).json({
      status: "error",
      message: `carrito ${id} no encontrado`,
    });
  }

  const cart = new Cart({ ...data });
  cart.addProducts(products);
  await database.update("carts", id, cart);
  res.json({
    status: "ok",
    message: `productos   agregado correctamente`,
  });
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  await database.delete("carts", id);
  res.json({
    status: "ok",
    message: `carrito ${id} eliminado correctamente`,
  });
};

exports.deleteProduct = async (req, res) => {
  const { id, productId } = req.params;

  const data = await database.getById("carts", id);

  if (!data) {
    return res.status(410).json({
      status: "error",
      message: `carrito ${id} no encontrado`,
    });
  }

  const cart = new Cart({ ...data });
  cart.deleteProduct(productId);
  await database.update("carts", id, cart);
  res.json({
    status: "ok",
    message: `producto ${productId} eliminado correctamente del carrito ${id}`,
  });
};
