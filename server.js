const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");  // <-- ADD THIS

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();  // <-- IMPORTANT

// Routes
app.use("/api/items", require("./routes/item.routes"));
app.use("/api/daily-rate", require("./routes/dailyRate.routes"));
app.use("/api/gold-rate", require("./routes/goldRate.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
