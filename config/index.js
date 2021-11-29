const { env } = process;

const PORT = env.PORT || 8080;
const isAdmin = env.ADMIN || true ;

module.exports = {
  PORT,
  isAdmin,
};
