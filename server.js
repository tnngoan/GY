require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running..."));

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});