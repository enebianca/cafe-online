const express = require('express');
const Product = require('../database/models/Product');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// 🔹 Listare produse
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// 🔹 Adăugare produs (doar admin)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acces interzis' });
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// 🔹 Editare produs
router.put('/:id', verifyToken, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produs inexistent' });
  await product.update(req.body);
  res.json(product);
});

// 🔹 Ștergere produs
router.delete('/:id', verifyToken, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produs inexistent' });
  await product.destroy();
  res.json({ message: 'Produs șters' });
});

module.exports = router;
