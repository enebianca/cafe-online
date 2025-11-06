const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});
const User = require('./database/models/User');

(async () => {
  try {
    await sequelize.sync();
    const hash = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      email: 'admin@cafe.ro',
      password: hash,
      role: 'admin'
    });
    console.log('✅ Admin creat cu succes!');
  } catch (err) {
    console.error('❌ Eroare:', err.message);
  } finally {
    process.exit();
  }
})();
