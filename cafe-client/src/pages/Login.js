import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/reducers/globalSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      // ✅ Trimite token + rol în Redux (am schimbat aici)
      dispatch(setToken({ token: res.data.token, role: res.data.role }));

      alert(`Autentificare reușită ca ${res.data.role}!`);

      // ✅ Redirecționează în funcție de rol
      if (res.data.role === 'admin') {
        navigate('/add-product');
      } else {
        navigate('/products');
      }

    } catch (err) {
      console.error(err);
      alert('Eroare la login');
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f7f4f2"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center"
        }}
      >
        <h2 style={{ color: "#3e2723", marginBottom: "20px" }}>Autentificare</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Parola"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#3e2723",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
