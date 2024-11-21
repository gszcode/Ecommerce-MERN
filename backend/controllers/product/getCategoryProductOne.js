const productModel = require("../../models/productModel");

async function getCategoryProductCtrl(req, res) {
	try {
		const productCategory = await productModel.distinct("category");
		const productByCategory = [];

		for (const category of productCategory) {
			const product = await productModel.findOne({ category });

			if (product) {
				productByCategory.push(product);
			}
		}

		res.status(200).json({
			message: "Category product",
			data: productByCategory,
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

module.exports = getCategoryProductCtrl;
