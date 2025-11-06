const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

const router = express.Router();

// 🔹 Înregistrare
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // verifică dacă emailul există deja
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email deja folosit.' });

    // criptează parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // creează utilizator (implicit role: 'client')
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'Utilizator creat cu succes', user });
  } catch (err) {
    console.error('Eroare la înregistrare:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: 'Utilizator inexistent' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Parolă greșită' });

    // ⚠️ Aici verificăm ce rol are userul
    console.log('🔎 User găsit:', user.username, '→ rol:', user.role);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 🔹 TRIMITE role ÎNAPOI către frontend
    res.json({
      message: 'Autentificare reușită',
      token,
      role: user.role,
      username: user.username
    });

  } catch (err) {
    console.error('Eroare la login:', err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
