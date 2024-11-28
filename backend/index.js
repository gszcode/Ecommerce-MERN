require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = ["https://shop-gsz.netlify.app", process.env.FRONTEND_URL];

app.use(
	cors({
		origin: (origin, callback) => {
			if (allowedOrigins.includes(origin) || !origin) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
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
