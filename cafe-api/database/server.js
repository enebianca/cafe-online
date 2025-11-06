// ✅ NU mai crea o nouă instanță aici!
// Importă conexiunea deja definită
const sequelize = require('./connection');
require('./associations'); // definește relațiile User–Order–Product–OrderItem

// Test conexiune și sincronizare
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexiune reușită la baza de date SQLite!');

    // sincronizare modele (nu șterge nimic)
    await sequelize.sync();

    console.log('📦 Modelele sunt sincronizate corect!');
  } catch (error) {
    console.error('❌ Eroare la conectare sau sincronizare:', error);
  }
})();

module.exports = sequelize;
