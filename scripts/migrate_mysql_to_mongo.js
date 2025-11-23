require("dotenv").config();
const mysql = require("mysql2/promise");
const mongoose = require("mongoose");

// Mongoose Models
const Item = require("../models/Item");
const DailyRate = require("../models/DailyRate");
const GoldRate = require("../models/GoldRate");

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  });
  console.log("Connected to MySQL");

  // MIGRATE ITEMS
  const [items] = await conn.execute("SELECT * FROM items");
  for (const row of items) {
    await Item.create({
      id: row.id,
      description: row.description,
      weight: Number(row.weight),
      type: row.type
    });
  }
  console.log(`Migrated ${items.length} items`);

  // MIGRATE DAILY RATES
  const [daily] = await conn.execute("SELECT * FROM daily_rates");
  for (const row of daily) {
    await DailyRate.create({
      metal_type: row.metal_type,
      rate: Number(row.rate),
      date: row.date
    });
  }
  console.log(`Migrated ${daily.length} daily rates`);

  // MIGRATE GOLD RATES
  const [gold] = await conn.execute("SELECT * FROM gold_rates");
  for (const row of gold) {
    await GoldRate.create({
      price: Number(row.price),
      currency: row.currency,
      created_at: row.created_at
    });
  }
  console.log(`Migrated ${gold.length} gold rates`);

  await conn.end();
  await mongoose.disconnect();
  console.log("Migration completed successfully!");
}

migrate().catch((err) => console.error(err));
