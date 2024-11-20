const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignInCtrl = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });

		if (!email || !password) throw new Error("Please fill in the fields");
		if (!user) throw new Error("Invalid credentials");

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) throw new Error("Invalid credentials");

		const payload = { _id: user._id, email: user.email };
		const expiresIn = { expiresIn: 60 * 60 * 8 };
		const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, expiresIn);

		const cookieOption = { httpOnly: true, secure: true };
		res.cookie("token", token, cookieOption).status(200).json({
			message: "Login successfully",
			data: token,
			success: true,
			error: false,
		});
	} catch (err) {
		res.json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
};

module.exports = userSignInCtrl;
