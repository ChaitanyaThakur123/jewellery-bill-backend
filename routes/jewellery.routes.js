const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all jewellery items
router.get("/items", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new jewellery item (for owner/admin use)
router.post("/items", (req, res) => {
  const { id, description, weight, type } = req.body;

  const sql = "INSERT INTO items (id, description, weight, type) VALUES (?, ?, ?, ?)";
  db.query(sql, [id, description, weight, type], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Item added successfully" });
  });
});

module.exports = router;
