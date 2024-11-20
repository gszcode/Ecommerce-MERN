const userModel = require("../../models/userModel");

async function updateUserRoleCtrl(req, res) {
	try {
		const { userId, name, email, role } = req.body;
		const payload = {
			...(name && { name }),
			...(email && { email }),
			...(role && { role }),
		};

		const user = await userModel.findByIdAndUpdate(userId, payload, { new: true });

		res.json({
			message: "User updated",
			data: user,
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

module.exports = updateUserRoleCtrl;
