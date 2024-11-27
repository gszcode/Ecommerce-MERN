const cartModel = require("../../models/cartProduct");

async function countAddToCartCtrl(req, res) {
	try {
		const userId = req.userId;

		const count = await cartModel.countDocuments({
			userId,
		});

		res.json({
			data: {
				count,
			},
			message: "Ok",
			error: false,
			success: true,
		});
	} catch (error) {
		res.json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

module.exports = countAddToCartCtrl;
