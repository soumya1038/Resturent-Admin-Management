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
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

export const OrderItemPropTypes = PropTypes.shape({
  menuItem: PropTypes.oneOfType([MenuItemPropTypes, PropTypes.string]).isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
});

export const OrderPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  orderNumber: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(OrderItemPropTypes).isRequired,
  totalAmount: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']).isRequired,
  customerName: PropTypes.string.isRequired,
  tableNumber: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});