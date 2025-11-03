const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// creează conexiunea SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, process.env.DB_FILE),
  logging: false, // opțional: dezactivează log-urile SQL
});

// test conexiune
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexiune reușită la baza de date SQLite!');
  } catch (error) {
    console.error('❌ Eroare la conectare:', error);
  }
}

testConnection();

module.exports = sequelize;
