const express = require("express");
const Product = require("../models/product");

const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({ where: req.query });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = productRouter;
