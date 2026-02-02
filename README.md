# Restaurant Admin Dashboard

A full-stack restaurant management application built with React, Node.js, Express, and MongoDB. This dashboard allows restaurant owners to manage menu items, track orders, and view analytics.

## 🚀 Features

### Menu Management
- ✅ CRUD operations for menu items
- ✅ Real-time search with debouncing (300ms delay)
- ✅ Category and availability filtering
- ✅ Optimistic UI updates for availability toggle
- ✅ Form validation with Joi

### Order Management
- ✅ View orders with pagination
- ✅ Filter orders by status
- ✅ Update order status
- ✅ Detailed order view with item breakdown

### Technical Features
- ✅ RESTful API design
- ✅ MongoDB text indexing for search
- ✅ Custom React hooks (useDebounce, useFetch)
- ✅ Context API for state management
- ✅ TypeScript for type safety
- ✅ Responsive design with Tailwind CSS
- ✅ MongoDB aggregation pipeline for analytics

## 🛠 Tech Stack

- **Frontend:** React 18+, TypeScript, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Validation:** Joi
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd restaurant-admin-dashboard
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in the server directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant_db
PORT=5000
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

### 3. Admin Dashboard Setup
```bash
cd ../admin-dashboard
npm install
```

Create `.env` file in the admin-dashboard directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the admin dashboard:
```bash
npm start
```

### 4. Customer Frontend Setup
```bash
cd ../customer-frontend
npm install
```

Create `.env` file in the customer-frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the customer app:
```bash
npm start
```

## 📚 API Documentation

### Menu Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Get all menu items with optional filters |
| GET | `/api/menu/search?q=query` | Search menu items by name/ingredients |
| GET | `/api/menu/:id` | Get single menu item |
| POST | `/api/menu` | Create new menu item |
| PUT | `/api/menu/:id` | Update menu item |
| DELETE | `/api/menu/:id` | Delete menu item |
| PATCH | `/api/menu/:id/availability` | Toggle availability |

### Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get orders with pagination |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders` | Create new order |
| PATCH | `/api/orders/:id/status` | Update order status |
| GET | `/api/orders/analytics/top-sellers` | Get top 5 selling items |

### Example Requests

#### Create Menu Item
```json
POST /api/menu
{
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "category": "Main Course",
  "price": 18.99,
  "ingredients": ["pizza dough", "tomato sauce", "mozzarella", "basil"],
  "preparationTime": 15
}
```

#### Create Order
```json
POST /api/orders
{
  "items": [
    {
      "menuItem": "64f8a1b2c3d4e5f6a7b8c9d0",
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "tableNumber": 5
}
```

## 🏗 Project Structure

```
restaurant-admin-dashboard/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── MenuItem.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── menuController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   ├── scripts/
│   │   └── seed.js
│   └── server.js
├── admin-dashboard/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UI.jsx
│   │   │   ├── MenuCard.jsx
│   │   │   └── MenuForm.jsx
│   │   ├── pages/
│   │   │   ├── MenuManagement.jsx
│   │   │   └── OrdersDashboard.jsx
│   │   ├── hooks/
│   │   │   ├── useDebounce.js
│   │   │   └── useFetch.js
│   │   ├── context/
│   │   │   └── MenuContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── types/
│   │   │   └── index.js
│   │   └── App.jsx
│   └── public/
└── customer-frontend/
    ├── src/
    │   ├── CartContext.jsx
    │   ├── MenuItemCard.jsx
    │   ├── Cart.jsx
    │   ├── api.js
    │   ├── types.js
    │   └── App.jsx
    └── public/
```

## 🔧 Key Implementation Details

### Debounced Search
The search functionality uses a custom `useDebounce` hook to delay API calls by 300ms, reducing server load and improving user experience.

### Optimistic UI Updates
When toggling menu item availability, the UI updates immediately. If the API call fails, the change is reverted with an error notification.

### MongoDB Aggregation
The top sellers endpoint uses MongoDB's aggregation pipeline to:
1. Unwind order items array
2. Group by menu item and sum quantities
3. Lookup menu item details
4. Sort by quantity and limit to top 5

### State Management
Uses React Context API for global menu state management, allowing components to share and update menu data efficiently.

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster (M0 free tier)
3. Whitelist IP addresses (0.0.0.0/0 for testing)
4. Create database user
5. Get connection string

### Backend Deployment (Render)
1. Create account at [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables

### Frontend Deployment (Netlify)
1. Create account at [Netlify](https://www.netlify.com)
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variables
6. Configure redirects for SPA routing

## 🧪 Testing the Application

1. **Menu Management:**
   - Add new menu items
   - Search for items (test debouncing)
   - Filter by category and availability
   - Toggle availability (test optimistic UI)
   - Edit and delete items

2. **Order Management:**
   - View orders with pagination
   - Filter by status
   - Update order status
   - View order details

## 🎯 Challenges Implemented

### Challenge 1: Search with Debouncing ✅
- Custom `useDebounce` hook
- 300ms delay implementation
- Loading indicators
- Error handling

### Challenge 2: MongoDB Aggregation ✅
- Top 5 selling items endpoint
- Complex aggregation pipeline
- Joins between collections

### Challenge 3: Optimistic UI Updates ✅
- Immediate UI feedback
- Error rollback mechanism
- Toast notifications

## 🔮 Future Enhancements

- Real-time order updates with WebSockets
- Advanced analytics dashboard
- Image upload for menu items
- Customer-facing ordering interface
- Inventory management
- Staff management system

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for the Eatoes Intern Technical Assessment