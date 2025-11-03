import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/reducers/cartSlice';

export default function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(() => alert('Eroare la încărcarea produselor'));
  }, []);

  return (
    <div>
      <h2>Produsele disponibile</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} — {p.price} lei
            <button onClick={() => dispatch(addToCart(p))}>Adaugă în coș</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
