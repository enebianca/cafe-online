import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/reducers/cartSlice';
import axios from 'axios';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const token = useSelector(state => state.global.token);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        { items: items.map(i => ({ productId: i.id, quantity: i.quantity })) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Comandă plasată cu ID: ${res.data.orderId}`);
      dispatch(clearCart());
    } catch {
      alert('Eroare la plasarea comenzii');
    }
  };

  return (
    <div>
      <h2>Coșul meu</h2>
      <ul>
        {items.map(i => (
          <li key={i.id}>
            {i.name} × {i.quantity} — {i.price * i.quantity} lei
            <button onClick={() => dispatch(removeFromCart(i.id))}>Șterge</button>
          </li>
        ))}
      </ul>
      <p>Total: {total} lei</p>
      <button onClick={handleOrder}>Plasează comanda</button>
    </div>
  );
}
