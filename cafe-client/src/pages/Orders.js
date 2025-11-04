import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.global.token);

  useEffect(() => {
    if (!token) {
      alert("Trebuie să fii autentificat pentru a vedea comenzile!");
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => alert("Eroare la încărcarea comenzilor."));
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Istoric comenzi</h2>
      {orders.length === 0 ? (
        <p>Nu există comenzi plasate încă.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fafafa",
            }}
          >
            <p>
              <strong>ID comandă:</strong> {order.id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> {order.total} lei
            </p>
            <p>
              <strong>Produse:</strong>
            </p>
            <ul>
              {order.OrderItems.map((item) => (
                <li key={item.id}>
                  {item.Product.name} × {item.quantity} —{" "}
                  {item.price * item.quantity} lei
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
