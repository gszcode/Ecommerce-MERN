const cartModel = require("../../models/cartProduct");

async function deleteCartProductCtrl(req, res) {
	try {
		const cartProductId = req.body._id;
		const deleteProduct = await cartModel.deleteOne({ _id: cartProductId });

		res.json({
			message: "Product Deleted From Cart",
			error: false,
			success: true,
			data: deleteProduct,
		});
	} catch (error) {
		res.json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

module.exports = deleteCartProductCtrl;
