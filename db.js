const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Chaitu@123",
  database: "jewellery_billing"
});

module.exports = db;
 