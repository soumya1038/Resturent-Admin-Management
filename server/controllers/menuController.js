const MenuItem = require('../models/MenuItem');
const Joi = require('joi');

// Validation schema
const menuItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  category: Joi.string().valid('Appetizer', 'Main Course', 'Dessert', 'Beverage').required(),
  price: Joi.number().positive().required(),
  ingredients: Joi.array().items(Joi.string()),
  preparationTime: Joi.number().positive(),
  imageUrl: Joi.string().uri()
});

// Get all menu items with filters
exports.getMenuItems = async (req, res) => {
  try {
    const { category, availability, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (availability !== undefined) filter.isAvailable = availability === 'true';
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const menuItems = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search menu items
exports.searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const menuItems = await MenuItem.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { ingredients: { $in: [new RegExp(q, 'i')] } }
      ]
    });

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single menu item
exports.getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { error } = menuItemSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { error } = menuItemSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle availability
exports.toggleAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });

    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};