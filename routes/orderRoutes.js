const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const authenticateJWT = require('../middleware/authenticateJWT');
// POST /api/orders (Place Order)
router.post('/',  authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId
    // Extract order data from request body
    const { products, totalAmount } = req.body;

    // Create a new order instance
    const newOrder = new Order({ products, totalAmount, userId });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order
    res.status(201).json(savedOrder);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:order_id (Get Order Details)
router.get('/:order_id',authenticateJWT, async (req, res) => {
  try {
    // Extract order ID from request parameters
    const orderId = req.params.order_id;

    // Find the order in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Respond with the order details
    res.status(200).json(order);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/user/:user_id (Get User's Orders)
router.get('/user',authenticateJWT, async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.user.userId

    // Find orders associated with the user in the database
    const orders = await Order.find({ userId });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Respond with the user's orders
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
