const mongoose = require('mongoose');

// Define Schema for Order Items
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

// Define Order Schema
const orderSchema = new mongoose.Schema({
  products: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Compile Order Model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
