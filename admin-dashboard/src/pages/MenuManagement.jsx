import React, { useState, useEffect } from 'react';
import { MenuCard } from '../components/MenuCard';
import { MenuForm } from '../components/MenuForm';
import { Button, Select } from '../components/UI';
import { useMenu } from '../context/MenuContext';
import { useDebounce } from '../hooks/useDebounce';
import { menuAPI } from '../services/api';
import { Plus, Search } from 'lucide-react';

export const MenuManagement = () => {
  const { menuItems, loading, error } = useMenu();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery.trim()) {
        setSearching(true);
        try {
          const response = await menuAPI.search(debouncedSearchQuery);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  const filteredItems = () => {
    let items = searchQuery.trim() ? searchResults : menuItems;

    if (categoryFilter) {
      items = items.filter(item => item.category === categoryFilter);
    }

    if (availabilityFilter !== '') {
      const isAvailable = availabilityFilter === 'true';
      items = items.filter(item => item.isAvailable === isAvailable);
    }

    return items;
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Appetizer', label: 'Appetizer' },
    { value: 'Main Course', label: 'Main Course' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Beverage', label: 'Beverage' },
  ];

  const availabilityOptions = [
    { value: '', label: 'All Items' },
    { value: 'true', label: 'Available Only' },
    { value: 'false', label: 'Unavailable Only' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading menu items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={20} className="mr-2" />
          Add Item
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categoryOptions}
          />

          <Select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            options={availabilityOptions}
          />
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems().map((item) => (
          <MenuCard
            key={item._id}
            item={item}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {filteredItems().length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery.trim() ? 'No items found matching your search.' : 'No menu items found.'}
          </p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <MenuForm
          item={editingItem}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};