require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = 8000;

app.use(cors());

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Connect to DB");
		console.log(`Server running in PORT: ${PORT}`);
	});
});
