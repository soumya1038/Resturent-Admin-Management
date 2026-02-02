import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { menuAPI } from '../services/api';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await menuAPI.getAll();
      setMenuItems(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateMenuItem = (id, updates) => {
    setMenuItems(prev => 
      prev.map(item => 
        item._id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item._id !== id));
  };

  const addMenuItem = (item) => {
    setMenuItems(prev => [item, ...prev]);
  };

  useEffect(() => {
    refreshMenu();
  }, []);

  const value = {
    menuItems,
    loading,
    error,
    refreshMenu,
    updateMenuItem,
    deleteMenuItem,
    addMenuItem,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};