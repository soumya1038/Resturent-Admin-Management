require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const sampleMenuItems = [
  // Appetizers
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan cheese and croutons",
    category: "Appetizer",
    price: 12.99,
    ingredients: ["romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    preparationTime: 10,
    imageUrl: "https://example.com/caesar-salad.jpg"
  },
  {
    name: "Buffalo Wings",
    description: "Spicy chicken wings served with blue cheese dip",
    category: "Appetizer",
    price: 14.99,
    ingredients: ["chicken wings", "buffalo sauce", "blue cheese", "celery"],
    preparationTime: 15,
    imageUrl: "https://example.com/buffalo-wings.jpg"
  },
  {
    name: "Mozzarella Sticks",
    description: "Crispy breaded mozzarella with marinara sauce",
    category: "Appetizer",
    price: 9.99,
    ingredients: ["mozzarella cheese", "breadcrumbs", "marinara sauce"],
    preparationTime: 12,
    imageUrl: "https://example.com/mozzarella-sticks.jpg"
  },
  {
    name: "Spinach Artichoke Dip",
    description: "Creamy dip served with tortilla chips",
    category: "Appetizer",
    price: 11.99,
    ingredients: ["spinach", "artichoke hearts", "cream cheese", "tortilla chips"],
    preparationTime: 8,
    imageUrl: "https://example.com/spinach-dip.jpg"
  },

  // Main Courses
  {
    name: "Grilled Salmon",
    description: "Atlantic salmon grilled to perfection with herbs",
    category: "Main Course",
    price: 24.99,
    ingredients: ["salmon", "herbs", "lemon", "olive oil"],
    preparationTime: 20,
    imageUrl: "https://example.com/grilled-salmon.jpg"
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    category: "Main Course",
    price: 18.99,
    ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
    preparationTime: 15,
    imageUrl: "https://example.com/margherita-pizza.jpg"
  },
  {
    name: "Ribeye Steak",
    description: "12oz ribeye steak cooked to your preference",
    category: "Main Course",
    price: 32.99,
    ingredients: ["ribeye steak", "garlic", "rosemary", "butter"],
    preparationTime: 25,
    imageUrl: "https://example.com/ribeye-steak.jpg"
  },
  {
    name: "Chicken Alfredo",
    description: "Grilled chicken over fettuccine with creamy alfredo sauce",
    category: "Main Course",
    price: 19.99,
    ingredients: ["chicken breast", "fettuccine", "alfredo sauce", "parmesan"],
    preparationTime: 18,
    imageUrl: "https://example.com/chicken-alfredo.jpg"
  },
  {
    name: "Fish Tacos",
    description: "Three soft tacos with grilled fish and coleslaw",
    category: "Main Course",
    price: 16.99,
    ingredients: ["white fish", "corn tortillas", "coleslaw", "lime"],
    preparationTime: 15,
    imageUrl: "https://example.com/fish-tacos.jpg"
  },
  {
    name: "Vegetarian Burger",
    description: "Plant-based patty with avocado and sprouts",
    category: "Main Course",
    price: 15.99,
    ingredients: ["plant-based patty", "avocado", "sprouts", "brioche bun"],
    preparationTime: 12,
    imageUrl: "https://example.com/veggie-burger.jpg"
  },

  // Desserts
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with vanilla ice cream",
    category: "Dessert",
    price: 8.99,
    ingredients: ["chocolate", "flour", "eggs", "vanilla ice cream"],
    preparationTime: 5,
    imageUrl: "https://example.com/chocolate-cake.jpg"
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    category: "Dessert",
    price: 9.99,
    ingredients: ["ladyfingers", "espresso", "mascarpone", "cocoa powder"],
    preparationTime: 3,
    imageUrl: "https://example.com/tiramisu.jpg"
  },
  {
    name: "Cheesecake",
    description: "New York style cheesecake with berry compote",
    category: "Dessert",
    price: 7.99,
    ingredients: ["cream cheese", "graham crackers", "berries", "sugar"],
    preparationTime: 4,
    imageUrl: "https://example.com/cheesecake.jpg"
  },

  // Beverages
  {
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    category: "Beverage",
    price: 4.99,
    ingredients: ["fresh oranges"],
    preparationTime: 3,
    imageUrl: "https://example.com/orange-juice.jpg"
  },
  {
    name: "Craft Beer",
    description: "Local IPA on tap",
    category: "Beverage",
    price: 6.99,
    ingredients: ["hops", "malt", "yeast"],
    preparationTime: 1,
    imageUrl: "https://example.com/craft-beer.jpg"
  },
  {
    name: "Iced Coffee",
    description: "Cold brew coffee served over ice",
    category: "Beverage",
    price: 3.99,
    ingredients: ["coffee beans", "ice", "milk"],
    preparationTime: 2,
    imageUrl: "https://example.com/iced-coffee.jpg"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    
    // Insert menu items
    const menuItems = await MenuItem.insertMany(sampleMenuItems);
    console.log(`${menuItems.length} menu items created`);
    
    // Create sample orders with various statuses
    const sampleOrders = [
      {
        items: [
          { menuItem: menuItems[0]._id, quantity: 2, price: menuItems[0].price },
          { menuItem: menuItems[4]._id, quantity: 1, price: menuItems[4].price }
        ],
        totalAmount: (menuItems[0].price * 2) + menuItems[4].price,
        customerName: "John Doe",
        tableNumber: 5,
        status: "Delivered"
      },
      {
        items: [
          { menuItem: menuItems[5]._id, quantity: 1, price: menuItems[5].price },
          { menuItem: menuItems[13]._id, quantity: 2, price: menuItems[13].price }
        ],
        totalAmount: menuItems[5].price + (menuItems[13].price * 2),
        customerName: "Jane Smith",
        tableNumber: 3,
        status: "Preparing"
      },
      {
        items: [
          { menuItem: menuItems[1]._id, quantity: 1, price: menuItems[1].price },
          { menuItem: menuItems[6]._id, quantity: 1, price: menuItems[6].price },
          { menuItem: menuItems[10]._id, quantity: 1, price: menuItems[10].price }
        ],
        totalAmount: menuItems[1].price + menuItems[6].price + menuItems[10].price,
        customerName: "Mike Johnson",
        tableNumber: 7,
        status: "Ready"
      },
      {
        items: [
          { menuItem: menuItems[2]._id, quantity: 3, price: menuItems[2].price }
        ],
        totalAmount: menuItems[2].price * 3,
        customerName: "Sarah Wilson",
        tableNumber: 2,
        status: "Pending"
      },
      {
        items: [
          { menuItem: menuItems[7]._id, quantity: 1, price: menuItems[7].price },
          { menuItem: menuItems[14]._id, quantity: 1, price: menuItems[14].price }
        ],
        totalAmount: menuItems[7].price + menuItems[14].price,
        customerName: "David Brown",
        tableNumber: 4,
        status: "Preparing"
      },
      {
        items: [
          { menuItem: menuItems[8]._id, quantity: 2, price: menuItems[8].price },
          { menuItem: menuItems[15]._id, quantity: 2, price: menuItems[15].price }
        ],
        totalAmount: (menuItems[8].price * 2) + (menuItems[15].price * 2),
        customerName: "Lisa Garcia",
        tableNumber: 6,
        status: "Delivered"
      },
      {
        items: [
          { menuItem: menuItems[3]._id, quantity: 1, price: menuItems[3].price },
          { menuItem: menuItems[9]._id, quantity: 1, price: menuItems[9].price },
          { menuItem: menuItems[11]._id, quantity: 1, price: menuItems[11].price }
        ],
        totalAmount: menuItems[3].price + menuItems[9].price + menuItems[11].price,
        customerName: "Tom Anderson",
        tableNumber: 8,
        status: "Cancelled"
      },
      {
        items: [
          { menuItem: menuItems[5]._id, quantity: 2, price: menuItems[5].price }
        ],
        totalAmount: menuItems[5].price * 2,
        customerName: "Emily Davis",
        tableNumber: 1,
        status: "Ready"
      },
      {
        items: [
          { menuItem: menuItems[0]._id, quantity: 1, price: menuItems[0].price },
          { menuItem: menuItems[4]._id, quantity: 1, price: menuItems[4].price },
          { menuItem: menuItems[12]._id, quantity: 1, price: menuItems[12].price },
          { menuItem: menuItems[13]._id, quantity: 1, price: menuItems[13].price }
        ],
        totalAmount: menuItems[0].price + menuItems[4].price + menuItems[12].price + menuItems[13].price,
        customerName: "Robert Taylor",
        tableNumber: 9,
        status: "Preparing"
      },
      {
        items: [
          { menuItem: menuItems[6]._id, quantity: 1, price: menuItems[6].price },
          { menuItem: menuItems[14]._id, quantity: 1, price: menuItems[14].price }
        ],
        totalAmount: menuItems[6].price + menuItems[14].price,
        customerName: "Amanda White",
        tableNumber: 10,
        status: "Pending"
      }
    ];
    
    const orders = await Order.insertMany(sampleOrders);
    console.log(`${orders.length} orders created`);
    
    console.log('\n=== Database seeded successfully! ===');
    console.log(`✅ ${menuItems.length} menu items across 4 categories`);
    console.log(`✅ ${orders.length} orders with various statuses`);
    console.log('\nOrder Status Distribution:');
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   ${status}: ${count} orders`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();