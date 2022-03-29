const bcrypt = require("bcrypt");
const Users = require("../persistence").getDAO("users");

exports.createAdmin = async () => {
	const existingAdmin = await Users.getAdmin({ role: "admin" });
	if (existingAdmin) return;

	const password = await bcrypt.hash("admin", 10);

	const data = {
		username: "admin",
		name: "admin",
		lastname: "admin",
		email: "admin@example.org",
		password,
		role: "admin",
		phone: "1234567890"
	};
	const admin = await Users.create(data);
	return admin;
};


