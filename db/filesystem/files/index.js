const BASE_URL = "./db/filesystem/files/";

const getURL = (type) => `${BASE_URL}${type}.txt`;

module.exports = {
  getURL,
};
