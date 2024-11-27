const cartModel = require("../../models/cartProduct");

async function addToCartCtrl(req, res) {
	try {
		const { productId } = req.body;
		const currentUser = req.userId;

		const isProductAvailable = await cartModel.findOne({ productId });

		if (isProductAvailable) {
			return res.json({
				message: "Already exist in Add to cart",
				success: false,
				error: true,
			});
		}

		const payload = {
			productId,
			quantity: 1,
			userId: currentUser,
		};

		const newAddToCart = await new cartModel(payload);
		const saveProduct = await newAddToCart.save();

		return res.json({
			data: saveProduct,
			message: "Product Added in Cart",
			success: true,
			error: false,
		});
	} catch (error) {
		res.json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

module.exports = addToCartCtrl;
