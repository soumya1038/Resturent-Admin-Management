const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  searchMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} = require('../controllers/menuController');

// GET /api/menu - Get all menu items with filters
router.get('/', getMenuItems);

// GET /api/menu/search - Search menu items
router.get('/search', searchMenuItems);

// GET /api/menu/:id - Get single menu item
router.get('/:id', getMenuItem);

// POST /api/menu - Create new menu item
router.post('/', createMenuItem);

// PUT /api/menu/:id - Update menu item
router.put('/:id', updateMenuItem);

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', deleteMenuItem);

// PATCH /api/menu/:id/availability - Toggle availability
router.patch('/:id/availability', toggleAvailability);

module.exports = router;