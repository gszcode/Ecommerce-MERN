const userModel = require("../../models/userModel");

async function allUsersCtrl(req, res) {
	try {
		const allUsers = await userModel.find();

		res.json({
			message: "All users",
			data: allUsers,
			success: true,
			error: false,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

module.exports = allUsersCtrl;
