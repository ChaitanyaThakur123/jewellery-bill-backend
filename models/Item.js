const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // G001, S001 etc.
  description: { type: String },
  weight: { type: Number },
  type: { type: String, enum: ["gold", "silver"] }
});

module.exports = mongoose.model("Item", ItemSchema);
