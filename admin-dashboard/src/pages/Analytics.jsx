import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';

export const Analytics = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderAPI.getTopSellers();
        setTopSellers(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading analytics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="mr-3 text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
      </div>

      {/* Top Sellers Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="mr-2 text-green-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Top 5 Selling Items</h2>
        </div>

        {topSellers.length === 0 ? (
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No sales data available yet.</p>
            <p className="text-sm text-gray-500 mt-2">
              Orders need to be placed to generate analytics.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {topSellers.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.category === 'Appetizer' ? 'bg-yellow-100 text-yellow-800' :
                      item.category === 'Main Course' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'Dessert' ? 'bg-pink-100 text-pink-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{item.totalQuantity}</div>
                    <div className="text-sm text-gray-500">Units Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center text-green-600 text-xl font-bold">
                      <DollarSign size={20} />
                      <span>{item.totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {topSellers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Units Sold</p>
                <p className="text-2xl font-bold text-gray-900">
                  {topSellers.reduce((sum, item) => sum + item.totalQuantity, 0)}
                </p>
              </div>
              <Package className="text-blue-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${topSellers.reduce((sum, item) => sum + item.totalRevenue, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="text-green-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Seller</p>
                <p className="text-lg font-bold text-gray-900">
                  {topSellers[0]?.name || 'N/A'}
                </p>
              </div>
              <TrendingUp className="text-yellow-600" size={32} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};