import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/reducers/cartSlice";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(""); // ✅ notificare
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const dispatch = useDispatch();
  const { role, token } = useSelector((state) => state.global);

  // 🔹 Fetch produse
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Notificare temporară
  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(""), 2000);
  };

  // 🔹 Adaugă produs în coș
  const handleAddToCart = (p) => {
    dispatch(addToCart(p));
    showNotification(`✅ ${p.name} a fost adăugat în coș!`);
  };

  // 🔹 Ștergere produs
  const handleDelete = async (id) => {
    if (window.confirm("Ești sigur că vrei să ștergi acest produs?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((p) => p.id !== id));
        showNotification("🗑️ Produs șters cu succes!");
      } catch (err) {
        alert("Eroare la ștergere produs");
      }
    }
  };

  // 🔹 Deschide modal editare
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl || "",
    });
  };

  // 🔹 Salvare modificări
  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${editingProduct.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      );
      setEditingProduct(null);
      showNotification("✅ Produs actualizat cu succes!");
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
            <p style={{ color: "#6d4c41", marginBottom: "10px" }}>
              {p.description}
            </p>
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
                onClick={() => handleAddToCart(p)}
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

            {role === "admin" && (
              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() => openEditModal(p)}
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

      {/* 🔹 MODAL EDITARE */}
      {editingProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ textAlign: "center", color: "#3e2723" }}>
              Editează produsul
            </h3>

            <input
              type="text"
              placeholder="Nume"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={inputStyle}
            />
            <textarea
              placeholder="Descriere"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={{ ...inputStyle, height: "80px" }}
            />
            <input
              type="number"
              placeholder="Preț"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Stoc"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Imagine URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              style={inputStyle}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <button
                onClick={handleSaveEdit}
                style={{
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Salvează
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                style={{
                  background: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ NOTIFICARE — apare jos dreapta */}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#3e2723",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
            opacity: notification ? 1 : 0,
            transform: notification
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            zIndex: 2000,
          }}
        >
          {notification}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "10px",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
