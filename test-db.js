const db = require("./db");

db.query("SELECT 1", (err, result) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ DB Connected:", result);
  }
});