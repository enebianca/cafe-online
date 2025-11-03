import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/reducers/globalSlice';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      dispatch(setToken(res.data.token));
      alert('Autentificare reușită!');
    } catch (err) {
      alert('Eroare la login');
    }
  };

  return (
    <div>
      <h2>Autentificare</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Parola" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
