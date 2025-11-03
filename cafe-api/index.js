const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database/server');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// test ruta principală
app.get('/', (req, res) => {
  res.send('☕ Cafe Online API funcționează!');
});

const PORT = process.env.PORT || 4000;

// sincronizare DB și pornire server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`✅ Server pornit pe portul ${PORT}`));
});
