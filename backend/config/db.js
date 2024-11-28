const mongoose = require("mongoose");

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 30000,
		});
	} catch (error) {
		console.log(error);
	}
}

module.exports = connectDB;
