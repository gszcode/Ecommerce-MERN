const userModel = require("../../models/userModel");

async function userDetailsCtrl(req, res) {
	try {
		const user = await userModel.findById(req.userId).select("-password");

		res.status(200).json({
			data: user,
			error: false,
			success: true,
			message: "User details",
		});
	} catch (err) {
		res.json({
			message: err.message || err,
			error: true,
			success: false,
		});
	}
}

module.exports = userDetailsCtrl;
