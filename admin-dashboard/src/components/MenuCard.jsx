import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './UI';
import { menuAPI } from '../services/api';
import { useMenu } from '../context/MenuContext';
import { Edit, Trash2, Clock, DollarSign } from 'lucide-react';

export const MenuCard = ({ item, onEdit }) => {
  const { updateMenuItem, deleteMenuItem } = useMenu();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleAvailability = async () => {
    if (isToggling) return;

    setIsToggling(true);
    const originalStatus = item.isAvailable;
    
    // Optimistic UI update
    updateMenuItem(item._id, { isAvailable: !originalStatus });

    try {
      await menuAPI.toggleAvailability(item._id);
    } catch (error) {
      // Rollback on error
      updateMenuItem(item._id, { isAvailable: originalStatus });
      alert('Failed to update availability. Please try again.');
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuAPI.delete(item._id);
        deleteMenuItem(item._id);
      } catch (error) {
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      item.isAvailable ? 'border-green-500' : 'border-red-500'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            item.category === 'Appetizer' ? 'bg-yellow-100 text-yellow-800' :
            item.category === 'Main Course' ? 'bg-blue-100 text-blue-800' :
            item.category === 'Dessert' ? 'bg-pink-100 text-pink-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {item.category}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {item.description && (
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-green-600">
            <DollarSign size={16} />
            <span className="font-semibold">{item.price.toFixed(2)}</span>
          </div>
          {item.preparationTime && (
            <div className="flex items-center text-gray-500">
              <Clock size={16} />
              <span className="text-sm ml-1">{item.preparationTime}min</span>
            </div>
          )}
        </div>
      </div>

      {item.ingredients && item.ingredients.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {item.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleToggleAvailability}
        variant={item.isAvailable ? 'danger' : 'success'}
        size="sm"
        loading={isToggling}
        className="w-full"
      >
        {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
      </Button>
    </div>
  );
};

MenuCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    isAvailable: PropTypes.bool.isRequired,
    preparationTime: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};