const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const cors = require("cors");
const db = require("./db");

// Import routes
const dailyRateRoutes = require("./routes/dailyRate.routes");
const jewelleryRoutes = require("./routes/jewellery.routes");


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use("/api/daily-rate", dailyRateRoutes);
app.use("/", jewelleryRoutes);

// ----------------------------
// CRON JOB (Runs every 1 minute)
// ----------------------------
cron.schedule("*/1 * * * *", async () => {
  console.log("Running cron: fetching gold price...");

  const data = await fetchGoldPrice();

  if (data && data.rates && data.rates.XAU) {
    const goldPrice = data.rates.XAU;

    db.query(
      "INSERT INTO gold_rates (price, currency) VALUES (?, ?)",
      [goldPrice, "USD"],
      (err) => {
        if (err) console.log("DB Insert Error:", err);
        else console.log("Gold price saved:", goldPrice);
      }
    );
  }
});



// ----------------------------
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
