const cartModel = require("../../models/cartProduct");

async function updateCartProductCtrl(req, res) {
	try {
		const addToCartProductId = req?.body?._id;
		const qty = req.body.quantity;

		const updateProduct = await cartModel.updateOne(
			{ _id: addToCartProductId },
			{
				...(qty && { quantity: qty }),
			}
		);

		res.json({
			message: "Product Updated",
			data: updateProduct,
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

module.exports = updateCartProductCtrl;
