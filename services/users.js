const bcrypt = require("bcrypt");
const User = require("../persistence").dao("users");

exports.createAdmin = async () => {
  const existingAdmin = await User.getAdmin({ role: "admin" });
  if (existingAdmin) return;

  const password = await bcrypt.hash("admin", 10);
  
  const data = {
    username: "admin",
    name: "admin",
    lastname: "admin",
    email: "admin@example.org",
    password,
    role: "admin",
    phone: "1234567890",
  }
	const admin = await User.create(data);
	return admin;
};
