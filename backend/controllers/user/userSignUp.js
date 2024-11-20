const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpCtrl(req, res) {
	try {
		const { name, email, password } = req.body;

		const userExist = await userModel.findOne({ email });
		if (userExist) throw new Error("User already exist");

		if (!name) throw new Error("Please provide name");
		if (!email) throw new Error("Please provide email");
		if (!password) throw new Error("Please provide password");

		const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(password, salt);

		if (!hashPassword) throw new Error("Something went wrong");

		const user = { ...req.body, role: "GENERAL", password: hashPassword };
		const userData = new userModel(user);
		const saveUser = await userData.save();

		res.status(201).json({
			data: saveUser,
			success: true,
			error: false,
			message: "User created Successfully!",
		});
	} catch (err) {
		res.json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}

module.exports = userSignUpCtrl;
