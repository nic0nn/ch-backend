const models = require("./models");

const getModel = (type, data) => {
  switch (type) {
    case "products":
      return new models.Product(data);
    case "carts":
      return new models.Cart(data);
    default:
      return new models.Product(data);
  }
};

module.exports = {
  getModel,
};
