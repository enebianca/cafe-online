// cafe-api/database/associations.js
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const OrderItem = require('./models/OrderItem');

// 🔹 Relații între modele

User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Export optional dacă vrei să-l importi în server.js
module.exports = { User, Order, Product, OrderItem };
