const Cart = require("./Cart");
const Product = require("./Product");
const User = require("./User");

const dao = (type) => {
  switch (type) {
    case "products":
      return Product
    case "cart":
      return Cart
    case "users":
      return User
    default:
      return Cart
  }
}

module.exports = dao