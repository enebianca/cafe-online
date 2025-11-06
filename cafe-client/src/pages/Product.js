import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/reducers/cartSlice";

export default function Product() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { role, token } = useSelector((state) => state.global);

  // 🔹 încarcă produsele
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 ștergere produs (doar admin)
  const handleDelete = async (id) => {
    if (window.confirm("Ești sigur că vrei să ștergi acest produs?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        alert("Eroare la ștergere produs");
      }
    }
  };

  // 🔹 editare rapidă (prompt)
  const handleEdit = async (id) => {
    const newName = prompt("Noul nume al produsului:");
    if (!newName) return;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(
        products.map((p) => (p.id === id ? { ...p, name: newName } : p))
      );
    } catch (err) {
      alert("Eroare la actualizarea produsului");
    }
  };

  return (
    <div style={{ padding: "40px", background: "#d8c3b0", minHeight: "100vh" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#3e2723",
          marginBottom: "40px",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Produsele noastre
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              padding: "20px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />

            <h3 style={{ color: "#3e2723", marginBottom: "8px" }}>{p.name}</h3>
            <p
              style={{
                color: "#4e342e",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {p.price} RON
            </p>

            {p.stock === 0 ? (
              <p style={{ color: "red", fontWeight: "bold" }}>Stoc epuizat</p>
            ) : (
              <button
                onClick={() => dispatch(addToCart(p))}
                style={{
                  background: "#3e2723",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#5d4037")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#3e2723")
                }
              >
                Adaugă în coș
              </button>
            )}

            {/* 🔹 Acțiuni vizibile doar pentru admin */}
            {role === "admin" && (
              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() => handleEdit(p.id)}
                  style={{
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                >
                  Editează
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    background: "#d32f2f",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Șterge
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
