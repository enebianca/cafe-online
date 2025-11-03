import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      alert('Cont creat cu succes! Acum te poți autentifica.');
    } catch (err) {
      alert('Eroare la înregistrare.');
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Înregistrare</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Parolă"
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Creează cont</button>
      </form>
    </div>
  );
}
