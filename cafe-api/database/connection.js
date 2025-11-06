const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, process.env.DB_FILE || 'database.sqlite'),
  logging: false,
});

module.exports = sequelize;
