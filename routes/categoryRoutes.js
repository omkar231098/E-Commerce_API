const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST /api/categories (Add Category)
router.post('/', async (req, res) => {
    try {
      // Extract category data from request body
      const { name } = req.body;
  
      // Check if category with the same name already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with this name already exists' });
      }
  
      // Create a new category instance
      const newCategory = new Category({ name });
  
      // Save the new category to the database
      const savedCategory = await newCategory.save();
  
      // Respond with the saved category
      res.status(201).json(savedCategory);
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router;
