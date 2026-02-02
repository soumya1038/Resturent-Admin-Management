const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getTopSellers
} = require('../controllers/orderController');

// GET /api/orders - Get all orders with pagination
router.get('/', getOrders);

// GET /api/orders/analytics/top-sellers - Get top selling items
router.get('/analytics/top-sellers', getTopSellers);

// GET /api/orders/:id - Get single order
router.get('/:id', getOrder);

// POST /api/orders - Create new order
router.post('/', createOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', updateOrderStatus);

module.exports = router;