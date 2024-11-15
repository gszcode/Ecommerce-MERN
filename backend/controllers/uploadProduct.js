const productModel = require("../models/productModel");
const uploadProductPermission = require("../utils/permission");

async function uploadProductCtrl(req, res) {
	try {
		const sessionUserId = req.userId;

		if (!uploadProductPermission(sessionUserId)) {
			throw new Error("Permission denied");
		}

		const uploadProduct = new productModel(req.body);
		const saveProduct = await uploadProduct.save();

		res.status(200).json({
			message: "Product upload successfully",
			data: saveProduct,
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

module.exports = uploadProductCtrl;
