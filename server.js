const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const dailyRateRoutes = require("./routes/dailyRate.routes");
const jewelleryRoutes = require("./routes/jewellery.routes");

const app = express();

// ------------------------------------
// CORS FIX (works for Vercel + Localhost)
// ------------------------------------
const allowedOrigins = [
  "https://jewellery-bill-frontend.vercel.app",
  "http://localhost:4200"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Body Parser
app.use(bodyParser.json());

// ------------------------------------
// Route Mounting
// ------------------------------------
app.use("/api/daily-rate", dailyRateRoutes);

// IMPORTANT FIX:
// This makes GET /api/items work correctly
app.use("/api/items", jewelleryRoutes);

// ------------------------------------
// PORT for Render Deployment
// ------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
