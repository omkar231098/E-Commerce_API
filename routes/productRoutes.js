const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// GET /api/products?category={category_id}
router.get('/', async (req, res) => {
  try {
    const categoryId = req.query.category;
    let query = {};
    if (categoryId) {
      query = { category: categoryId };
    }
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:product_id
router.get('/:product_id', async (req, res) => {
  try {
    const productId = req.params.product_id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/products (Add Product)
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
