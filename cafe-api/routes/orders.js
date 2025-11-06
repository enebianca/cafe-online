const express = require('express');
const verifyToken = require('../middleware/auth');
const Order = require('../database/models/Order');
const OrderItem = require('../database/models/OrderItem');
const Product = require('../database/models/Product');

const router = express.Router();

// 🔹 Creare comandă (plasare)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    let total = 0;

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      total += product.price * item.quantity;
    }

    const order = await Order.create({ userId: req.user.id, total, status: 'pending' });

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    res.status(201).json({ message: 'Comandă plasată', orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Vizualizare comenzi user curent
router.get('/', verifyToken, async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: { model: OrderItem, include: Product }
  });
  res.json(orders);
});

// 🔹 Vizualizare toate comenzile (ADMIN ONLY)
router.get('/all', verifyToken, async (req, res) => {
  try {
    // doar adminul poate accesa
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acces interzis' });
    }

    const orders = await Order.findAll({
      include: [
        { model: OrderItem, include: [Product] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (err) {
    console.error('Eroare la preluarea comenzilor admin:', err);
    res.status(500).json({ error: err.message });
  }
});
// 🔹 Actualizare status comandă (ADMIN ONLY)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acces interzis' });
    }

    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).json({ message: 'Comandă inexistentă' });

    order.status = status;
    await order.save();

    res.json({ message: 'Status actualizat cu succes', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
