import PropTypes from 'prop-types';

export const MenuItemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  category: PropTypes.oneOf(['Appetizer', 'Main Course', 'Dessert', 'Beverage']).isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAvailable: PropTypes.bool.isRequired,
  preparationTime: PropTypes.number,
  imageUrl: PropTypes.string,
});

export const CartItemPropTypes = PropTypes.shape({
  menuItem: MenuItemPropTypes.isRequired,
  quantity: PropTypes.number.isRequired,
});