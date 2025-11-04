import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/cartSlice";

export default function Product() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // 🔹 se încarcă produsele la montarea componentei
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Eroare la încărcarea produselor."));
  }, []);

  // 🔹 funcție pentru adăugare în coș
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} a fost adăugat în coș!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>☕ Produse disponibile</h2>
      {products.length === 0 ? (
        <p>Nu există produse momentan.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((p) => (
            <li
              key={p.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <strong>{p.name}</strong> – {p.price} lei
              <br />
              <small>{p.description}</small>
              <br />
              <button
                onClick={() => handleAddToCart(p)}
                style={{
                  marginTop: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  borderRadius: "6px",
                }}
              >
                Adaugă în coș
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
