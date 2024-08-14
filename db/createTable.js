const express = require("express");
const dbconnection = require("./dbconfig"); // Ensure this exports a connection pool or properly managed connection
const route = express.Router();

// Table creation route
route.get("/", (req, res) => {
  const browserdisplay = "Tables have been created";

  // Define the SQL queries for table creation
  const queries = [
    `CREATE TABLE IF NOT EXISTS products (
      product_id INT AUTO_INCREMENT,
      product_name VARCHAR(255) NOT NULL,
      product_url VARCHAR(255) NOT NULL,
      PRIMARY KEY (product_id)
    )`,
    `CREATE TABLE IF NOT EXISTS ProductDescription (
      description_id INT AUTO_INCREMENT,
      product_id INT NOT NULL,
      product_brief_description TEXT NOT NULL,
      product_description TEXT NOT NULL,
      product_img TEXT,
      product_link TEXT,
      PRIMARY KEY (description_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`,
    `CREATE TABLE IF NOT EXISTS ProductPrice (
      price_id INT AUTO_INCREMENT,
      product_id INT NOT NULL,
      starting_price VARCHAR(255) NOT NULL,
      price_range VARCHAR(255) NOT NULL,
      PRIMARY KEY (price_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`,
    `CREATE TABLE IF NOT EXISTS User (
      user_id INT AUTO_INCREMENT,
      User_name VARCHAR(255) NOT NULL,
      User_password VARCHAR(255) NOT NULL,
      PRIMARY KEY (user_id)
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      order_id INT AUTO_INCREMENT,
      product_id INT NOT NULL,
      user_id INT NOT NULL,
      PRIMARY KEY (order_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id),
      FOREIGN KEY (user_id) REFERENCES User(user_id)
    )`,
  ];

  // Execute each query sequentially
  const executeQueries = async () => {
    for (const query of queries) {
      try {
        await new Promise((resolve, reject) => {
          dbconnection.query(query, (err, results) => {
            if (err) {
              console.error("Error executing query:", err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      } catch (error) {
        console.error("Query execution failed:", error);
        res.status(500).send("Failed to create tables");
        return;
      }
    }
    res.send(browserdisplay);
  };

  executeQueries();
});

module.exports = route;
