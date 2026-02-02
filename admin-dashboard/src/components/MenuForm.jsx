import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Select } from './UI';
import { menuAPI } from '../services/api';
import { useMenu } from '../context/MenuContext';
import { X } from 'lucide-react';

export const MenuForm = ({ item, onClose }) => {
  const { addMenuItem, updateMenuItem } = useMenu();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Appetizer',
    price: '',
    ingredients: '',
    preparationTime: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description || '',
        category: item.category,
        price: item.price.toString(),
        ingredients: item.ingredients.join(', '),
        preparationTime: item.preparationTime?.toString() || '',
        imageUrl: item.imageUrl || '',
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined,
        imageUrl: formData.imageUrl,
      };

      if (item) {
        const response = await menuAPI.update(item._id, payload);
        updateMenuItem(item._id, response.data);
      } else {
        const response = await menuAPI.create(payload);
        addMenuItem(response.data);
      }

      onClose();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'Appetizer', label: 'Appetizer' },
    { value: 'Main Course', label: 'Main Course' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Beverage', label: 'Beverage' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {item ? 'Edit Menu Item' : 'Add Menu Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <Input
            label="Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <Select
            label="Category *"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categoryOptions}
            required
          />

          <Input
            label="Price *"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <Input
            label="Ingredients (comma-separated)"
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            placeholder="tomato, cheese, basil"
          />

          <Input
            label="Preparation Time (minutes)"
            type="number"
            value={formData.preparationTime}
            onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
          />

          <Input
            label="Image URL"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />

          <div className="flex space-x-3 pt-4">
            <Button type="submit" loading={loading} className="flex-1">
              {item ? 'Update' : 'Create'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

MenuForm.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};