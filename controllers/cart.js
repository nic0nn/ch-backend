const Cart = require("../persistence").dao("carts");

exports.createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create({});
    res.status(201).json({
      status: "ok",
      message: `carrito agregado correctamente`,
      insertedId: cart._id,
    });
  } catch (error) {
    return throwError(next, 400, "error al crear carrito");
  }
};

exports.getProducts = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
      return throwError(next, 404, `carrito ${id} no encontrado`);
    }
    const data = await cart.getProducts();
    res.json({ status: "ok", data });
  } catch (error) {
    return throwError(next, 400, "error al obtener productos");
  }
};

exports.addProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { products } = req.body;

    const cart = await Cart.findById(id);

    if (!cart) {
      return throwError(next, "404", `carrito ${id} no encontrado`);
    }

    await cart.addProducts(products);
    res.json({
      status: "ok",
      message: `productos agregado correctamente`,
    });
  } catch (error) {
    return throwError(next, 400, "error al agregar productos");
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cart.delete(id);
    res.json({
      status: "ok",
      message: `carrito ${id} eliminado correctamente`,
    });
  } catch (error) {
    return throwError(next, 400, "error al eliminar carrito");
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id, productId } = req.params;

    const cart = await Cart.findById(id);

    if (!cart) {
      return throwError(next, 404, `carrito ${id} no encontrado`);
    }

    await cart.deleteProduct(productId);

    res.json({
      status: "ok",
      message: `producto ${productId} eliminado correctamente del carrito ${id}`,
    });
  } catch (error) {
    return throwError(next, 400, "error al eliminar producto");
  }
};
