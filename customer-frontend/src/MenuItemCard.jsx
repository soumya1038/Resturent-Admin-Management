import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from './CartContext';
import { Plus, Clock, DollarSign } from 'lucide-react';

export const MenuItemCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.category === 'Appetizer' ? 'bg-yellow-100 text-yellow-800' :
            item.category === 'Main Course' ? 'bg-blue-100 text-blue-800' :
            item.category === 'Dessert' ? 'bg-pink-100 text-pink-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {item.category}
          </span>
        </div>

        {item.description && (
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-green-600">
            <DollarSign size={18} />
            <span className="font-bold text-lg">{item.price.toFixed(2)}</span>
          </div>
          {item.preparationTime && (
            <div className="flex items-center text-gray-500">
              <Clock size={16} />
              <span className="text-sm ml-1">{item.preparationTime}min</span>
            </div>
          )}
        </div>

        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.slice(0, 4).map((ingredient, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {ingredient}
                </span>
              ))}
              {item.ingredients.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{item.ingredients.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => addToCart(item)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    preparationTime: PropTypes.number,
  }).isRequired,
};