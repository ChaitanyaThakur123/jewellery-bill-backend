const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const dailyRateRoutes = require("./routes/dailyRate.routes");
const jewelleryRoutes = require("./routes/jewellery.routes");

const app = express();

// ------------ CORS FIX (FINAL) -----------------
app.use(
  cors({
    origin: "*", // allow ALL for now to test
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Body parser
app.use(bodyParser.json());

// API Routes
app.use("/api/daily-rate", dailyRateRoutes);
app.use("/api", jewelleryRoutes);

// Default route (avoid 404 on Render)
app.get("/", (req, res) => {
  res.send("Jewellery Backend Running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
