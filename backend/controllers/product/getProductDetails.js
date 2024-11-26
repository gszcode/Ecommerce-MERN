const productModel = require("../../models/productModel");

async function getProductDetailsCtrl(req, res) {
	try {
		const { productId } = req.body;
		const product = await productModel.findById(productId);

		res.json({
			message: "Product details",
			error: false,
			success: true,
			data: product,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

module.exports = getProductDetailsCtrl;
