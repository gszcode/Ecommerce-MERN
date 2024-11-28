require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Connect to DB");
		console.log(`Server running in PORT: ${PORT}`);
	});
});
