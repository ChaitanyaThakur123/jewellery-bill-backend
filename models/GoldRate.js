const mongoose = require("mongoose");

const GoldRateSchema = new mongoose.Schema({
  price: { type: Number },
  currency: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GoldRate", GoldRateSchema);
