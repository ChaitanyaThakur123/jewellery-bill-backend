const Item = require("../models/Item");

// MUST match the router name ──────────────────────────────
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ id: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
