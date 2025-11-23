const mongoose = require("mongoose");

const DailyRateSchema = new mongoose.Schema({
  metal_type: { type: String, required: true }, // gold/silver
  rate: { type: Number, required: true },
  date: { type: Date, required: true }
});

DailyRateSchema.index({ metal_type: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyRate", DailyRateSchema);
