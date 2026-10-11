import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./components/ContactPage.jsx";
import "./css/global.css";
import "./css/App.css";

function App() {
  // Carrito de compras: lista de productos agregados, cada uno con su cantidad
  const [carrito, setCarrito] = useState([]);
  const [paginaActual, setPaginaActual] = useState("inicio");

  // Total de unidades, no de líneas del carrito
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const yaEstaEnCarrito = carritoActual.some((item) => item.id === producto.id);

      if (yaEstaEnCarrito)
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  return (
    <div className="app">
      <Navbar
        cantidadCarrito={cantidadTotal} 
        paginaActual={paginaActual}
        onNavegar={setPaginaActual}
      />

      <div className="app-contenido">
        {paginaActual === "inicio" && (
          <main>
            <h1>Hola mundo</h1>

            {/* Temporal: este botón se mueve a ProductDetail (issue #2) */}
            <button type="button" onClick={() => agregarAlCarrito({ id: "producto-de-prueba" })}>
              Agregar al carrito
            </button>
          </main>
        )}

        {paginaActual === "contacto" && <ContactPage />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
