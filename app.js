// let driver = require("mysql2");
let express = require("express");
require("dotenv").config();
let app = express();
const cors = require("cors");
app.use(cors());
const dbconnection = require("./db/dbconfig");
const route = express.Router();
// Route middleware for creating tables
const createTablesRoute = require("./db/createTable");
app.use("/install", createTablesRoute);


//extract iphone products 

app.get("/iPhone", (req, res) => {
  let productquery = `
    SELECT * 
    FROM products 
    JOIN ProductDescription ON products.product_id = ProductDescription.product_id 
    JOIN ProductPrice ON products.product_id = ProductPrice.product_id
  `;
  dbconnection.query(productquery, (err, rows, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Database query error");
    } else {
      let iphones = { products: rows };
      res.json(iphones);
    }
  });
});

app.get("/iphone/:productID", (req, res) => {
  const productId = req.params.productID;
  console.log(`Fetching details for product ID: ${productId}`);

  // Use parameterized queries to prevent SQL injection
  let productquery = `
    SELECT *
    FROM products
    JOIN ProductDescription ON products.product_id = ProductDescription.product_id
    JOIN ProductPrice ON products.product_id = ProductPrice.product_id
    WHERE products.product_url = ?
  `;

  dbconnection.query(productquery, [productId], (err, rows, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Database query error");
      return;
    }

    let iphones = { products: rows };
    res.json(iphones); // Send JSON response
  });
});


let port = 5500;
app.listen(port, () => {
  console.log(`listing to :${port} \n Running on=>http Localhost${port} `);
});
