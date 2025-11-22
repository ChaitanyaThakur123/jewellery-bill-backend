const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const dailyRateRoutes = require("./routes/dailyRate.routes");
const jewelleryRoutes = require("./routes/jewellery.routes");

const app = express();

app.use(
  cors({
    origin: ["https://jewellery-bill-frontend.vercel.app"], // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

// Register routes
app.use("/api/daily-rate", dailyRateRoutes);
app.use("/", jewelleryRoutes);



// ----------------------------
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
