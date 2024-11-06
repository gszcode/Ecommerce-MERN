require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", router);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Connect to DB");
		console.log(`Server running in PORT: ${PORT}`);
	});
});
