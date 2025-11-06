import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Trebuie să fii logat ca admin!");
      navigate("/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role === "admin") setIsAdmin(true);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products`,
        { name, description, price, stock, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Produs adăugat cu succes!");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
    } catch (err) {
      alert("❌ Eroare la adăugare produs: " + (err.response?.data?.message || err.message));
    }
  };

  if (!isAdmin)
    return <p style={{ textAlign: "center", marginTop: "40px" }}>⛔ Acces interzis — doar pentru admin!</p>;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      background: "#f5f5f5"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "400px"
      }}>
        <h2 style={{ textAlign: "center", color: "#3e2723" }}>Adaugă un produs nou ☕</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input placeholder="Nume produs" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="Descriere" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="number" placeholder="Preț" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="number" placeholder="Stoc" value={stock} onChange={(e) => setStock(e.target.value)} />
          <input placeholder="URL imagine" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          <button type="submit" style={{
            background: "#3e2723",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            Adaugă produs
          </button>
        </form>
      </div>
    </div>
  );
}
