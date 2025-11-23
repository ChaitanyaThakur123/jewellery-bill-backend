const GoldRate = require("../models/GoldRate");

exports.getGoldRates = async (req, res) => {
  try {
    const rates = await GoldRate.find().sort({ created_at: -1 });
    res.json(rates);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addGoldRate = async (req, res) => {
  try {
    const rate = await GoldRate.create(req.body);
    res.json(rate);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
