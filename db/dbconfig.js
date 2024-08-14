const mysql = require("mysql2");
require("dotenv").config(); // Ensure environment variables are loaded

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust based on your needs
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release(); // Release the connection back to the pool
});

module.exports = pool;
