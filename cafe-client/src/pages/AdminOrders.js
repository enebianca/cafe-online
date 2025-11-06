import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.global);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Eroare la preluarea comenzilor:", err));
  }, [token]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );
      alert("✅ Status actualizat cu succes!");
    } catch {
      alert("❌ Eroare la actualizarea statusului!");
    }
  };

  return (
    <div style={{ padding: "40px", background: "#d8c3b0", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#3e2723" }}>📦 Administrare Comenzi</h2>

      <div style={{ marginTop: "30px" }}>
        {orders.length === 0 ? (
          <p style={{ textAlign: "center" }}>Nu există comenzi în sistem.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h4>Comanda #{order.id}</h4>
              <p>
                <b>Client:</b> {order.User?.username} ({order.User?.email})
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      order.status === "completed"
                        ? "green"
                        : order.status === "cancelled"
                        ? "red"
                        : "#ff9800",
                  }}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <b>Total:</b> {order.total} lei
              </p>

              <ul>
                {order.OrderItems?.map((item) => (
                  <li key={item.id}>
                    {item.Product?.name} × {item.quantity} —{" "}
                    {item.Product?.price} lei
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "10px" }}>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  style={{
                    padding: "6px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
