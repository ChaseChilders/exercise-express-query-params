const http = require("http");
const express = require("express");

const port = 3000;
const hostname = "localhost";

const app = express();
const server = http.createServer(app);

const productsService = require("./services/products");

app.get("/", (req, res) => res.send("Build the API!"));

// Build Routes

app.get("/api/v1/products", (req, res) => {
  const sortBy = req.query.sort || "id";
  const order = req.query.order || "ASC";
  const products = productsService.findAll(sortBy, order);
  res.json(products);
});

app.get("api/v1/products/search", (req, res) => {
  const key = req.query.key;
  const value = req.query.key;
  if (!key || !value) {
    res.status(400).json({ error: "invalid search query" });
    return;
  }
  const products = productsService.search(key);
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const productID = Number(req.params.productID);
  if (!number) {
    res.status(400).json({ error: "Could not find that product" });
    return;
  }
  const product = productsService.findOneById(productID);
  if (!product) {
    res.status(404).json({ error: "That is not a product" });
    return;
  }
  res.json(product);
});

app.get("*", (req, res) => res.status(404).send("Page not found"));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
