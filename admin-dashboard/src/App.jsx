import React, { useState } from 'react';
import { MenuProvider } from './context/MenuContext';
import { MenuManagement } from './pages/MenuManagement';
import { OrdersDashboard } from './pages/OrdersDashboard';
import { Analytics } from './pages/Analytics';
import { Menu, ShoppingCart, BarChart3 } from 'lucide-react';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('menu');

  const navigation = [
    { id: 'menu', name: 'Menu Management', icon: Menu },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'menu':
        return <MenuManagement />;
      case 'orders':
        return <OrdersDashboard />;
      case 'analytics':
        return <Analytics />;
      default:
        return <MenuManagement />;
    }
  };

  return (
    <MenuProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Restaurant Admin</h1>
          </div>
          <nav className="mt-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activePage === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64">
          {renderPage()}
        </div>
      </div>
    </MenuProvider>
  );
}

export default App;