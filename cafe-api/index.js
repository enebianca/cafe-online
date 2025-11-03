const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database/server');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// import rute
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// folosește-le
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// test ruta principală
app.get('/', (req, res) => {
  res.send('☕ Cafe Online API funcționează!');
});

const PORT = process.env.PORT || 4000;

// importă modelele
require('./database/models/User');
require('./database/models/Product');
require('./database/models/Order');
require('./database/models/OrderItem');

// sincronizare DB și pornire server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`✅ Server pornit pe portul ${PORT}`));
});
