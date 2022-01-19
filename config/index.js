const { env } = process;

const PORT = env.PORT || 8080;
const DB_TYPE = env.DB_TYPE || "filesystem"; // filesystem, mongodb or firestore
const MONGO_URL = env.MONGO_URL || "mongodb://localhost:27017";
const IS_ADMIN = env.IS_ADMIN || true;

module.exports = {
  PORT,
  DB_TYPE,
  MONGO_URL,
  IS_ADMIN,
};
