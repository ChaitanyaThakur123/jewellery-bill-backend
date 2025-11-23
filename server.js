const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const dailyRateRoutes = require("./routes/dailyRate.routes");
const jewelleryRoutes = require("./routes/jewellery.routes");

const app = express();

// ------------ CORS FIX -----------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Static files
app.use(express.static("public"));

// Body parser
app.use(bodyParser.json());

// API Routes
app.use("/api/daily-rate", dailyRateRoutes);
app.use("/api", jewelleryRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Jewellery Backend Running");
});

// -------------------------------------
// FIX FOR RENDER — USE DYNAMIC PORT
// -------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
