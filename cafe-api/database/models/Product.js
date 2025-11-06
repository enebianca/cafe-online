const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 10 },
  imageUrl: { type: DataTypes.STRING },
});

module.exports = Product;
