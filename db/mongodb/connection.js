const mongoose = require("mongoose");
const CustomError = require("../../controllers/errors");
const { MONGO_URL } = require("./../../config");

const connect = async (dbName) => {
  try {
    await mongoose.connect(MONGO_URL, { dbName });
    console.log(`[+] MongoDB connected`);
  } catch (error) {
    throw new CustomError({
      statusCode: 500,
      message: "Error al conectar con la base de datos",
    });
  }
};

module.exports = connect;
