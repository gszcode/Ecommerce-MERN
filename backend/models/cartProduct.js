const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
	{
		productId: String,
		quantity: Number,
		userId: String,
	},
	{
		timestamps: true,
	}
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
