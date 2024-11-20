const productModel = require("../../models/productModel");

async function allProductsCtrl(req, res) {
	try {
		const products = await productModel.find({}).sort({ createdAt: -1 });

		res.status(200).json({
			message: "All Products",
			data: products,
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

module.exports = allProductsCtrl;
