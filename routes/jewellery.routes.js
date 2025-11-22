const express = require("express");
const router = express.Router();
const db = require("../db");

// -------------------------------
// GET all jewellery items
// Path: /api/items
// -------------------------------
router.get("/", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// -------------------------------
// Add new item
// Path: /api/items
// -------------------------------
router.post("/", (req, res) => {
  const { id, description, weight, type } = req.body;

  const sql =
    "INSERT INTO items (id, description, weight, type) VALUES (?, ?, ?, ?)";

  db.query(sql, [id, description, weight, type], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Item added successfully" });
  });
});

module.exports = router;
