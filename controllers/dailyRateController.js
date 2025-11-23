const DailyRate = require("../models/DailyRate");

// ✔ Get all daily rates (for frontend list)
exports.getAllDailyRates = async (req, res) => {
  try {
    const rates = await DailyRate.find().sort({ date: -1 });
    res.json(rates);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ✔ Add a new rate
exports.addDailyRate = async (req, res) => {
  try {
    const rate = await DailyRate.create(req.body);
    res.json(rate);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ✔ Get rate for metal + date (required for gold bill)
exports.getDailyRate = async (req, res) => {
  try {
    const { metal, date } = req.params;

    const found = await DailyRate.findOne({ metal, date });

    if (!found) {
      return res.json({ found: false });
    }

    res.json({ found: true, rate: found.rate });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ✔ Set/update rate for a date
exports.setDailyRate = async (req, res) => {
  try {
    const { metal, rate, date } = req.body;

    const saved = await DailyRate.findOneAndUpdate(
      { metal, date },
      { rate },
      { upsert: true, new: true }
    );

    res.json(saved);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
