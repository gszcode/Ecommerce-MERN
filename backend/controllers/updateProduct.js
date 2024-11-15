const productModel = require("../models/productModel");
const uploadProductPermission = require("../utils/permission");

async function updateProductCtrl(req, res) {
	try {
		if (!uploadProductPermission(req.userId)) {
			throw new Error("Permission denied");
		}

		const { _id, ...resBody } = req.body;
		const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

		res.json({
			message: "Product update successfully",
			data: updateProduct,
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

module.exports = updateProductCtrl;
