import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/reducers/cartSlice";
import axios from "axios";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.global.token);

  // 🔹 calculează totalul coșului
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🔹 trimite comanda la backend
  const handleOrder = async () => {
    if (!token) {
      alert("Trebuie să fii autentificat pentru a plasa o comandă!");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Comandă plasată cu succes! ID: ${res.data.orderId}`);
      dispatch(clearCart());
    } catch (err) {
      alert("Eroare la plasarea comenzii.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Coșul meu</h2>

      {items.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0",
                }}
              >
                {item.name} × {item.quantity} —{" "}
                <strong>{item.price * item.quantity} lei</strong>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{
                    marginLeft: "10px",
                    padding: "3px 6px",
                    background: "#f55",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>

          <p>
            <strong>Total:</strong> {total} lei
          </p>

          <button
            onClick={handleOrder}
            style={{
              padding: "10px 15px",
              background: "#2a8",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Plasează comanda
          </button>
        </>
      )}
    </div>
  );
}
