const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const authenticateJWT = require('../middleware/authenticateJWT');

// GET /api/cart/:user_id (Get User's Cart)
router.get('/', authenticateJWT , async (req, res) => {
   
  try {
    // Extract user ID from request parameters
    const userId = req.user.userId
console.log(typeof(userId))
    // Find the user's cart in the database
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Respond with the user's cart
    res.status(200).json(cart);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});


// POST /api/cart/:user_id (Add Product to Cart)
router.post('/', authenticateJWT,async (req, res) => {
    try {
        const userId = req.user.userId
      const { productId, quantity } = req.body;
  
      // Find the user's cart in the database
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        // If the cart doesn't exist, create a new one
        cart = new Cart({ userId, products: [{ productId, quantity }] });
      } else {
        // Check if the product already exists in the cart
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (existingProductIndex !== -1) {
          // If the product exists, increment its quantity
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          // If the product is not in the cart, add it
          cart.products.push({ productId, quantity });
        }
      }
  
      // Save the updated cart to the database
      const savedCart = await cart.save();
      res.status(201).json(savedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



// PATCH /api/cart/:user_id/:product_id (Update Product Quantity in Cart)
router.patch('/:product_id',authenticateJWT, async (req, res) => {
    try {
      const userId = req.user.userId
      const productId = req.params.product_id;
      const { quantity } = req.body;
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user' });
      }
      const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
      if (existingProductIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
      cart.products[existingProductIndex].quantity = quantity;
      const savedCart = await cart.save();
      res.status(200).json(savedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// DELETE /api/cart/:user_id/:product_id (Remove Product from Cart)
router.delete('/:product_id', authenticateJWT,async (req, res) => {
    try {
      const userId = req.user.userId
      const productId = req.params.product_id;
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user' });
      }
      const updatedProducts = cart.products.filter(item => item.productId.toString()!== productId);
      
      cart.products = updatedProducts;
      const savedCart = await cart.save();
      res.status(200).json(savedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
