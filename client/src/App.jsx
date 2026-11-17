import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

import "./css/global.css";
import "./css/App.css";

function App() {
  const navigate = useNavigate();

  // Carrito de compras: lista de productos agregados, cada uno con su cantidad
  const [carrito, setCarrito] = useState([]);

  // Total de unidades, no de líneas del carrito
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const navegar = () => navigate("/productos");

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const yaEstaEnCarrito = carritoActual.some((item) => item._id === producto._id);

      if (yaEstaEnCarrito)
        return carritoActual.map((item) =>
          item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  return (
    <section className="app">
      <Navbar cantidadCarrito={cantidadTotal} onNavegar={navegar} />

      <Routes>
        <Route path="/productos" element={<ProductsPage onAgregarCarrito={agregarAlCarrito} />} />
        <Route
          path="/productos/:id"
          element={<ProductDetailPage onAgregarCarrito={agregarAlCarrito} />}
        />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>

      <Footer />
    </section>
  );
}

export default App;
