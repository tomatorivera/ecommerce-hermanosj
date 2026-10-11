import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./components/ContactPage.jsx";
import "./css/global.css";
import "./css/App.css";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [paginaActual, setPaginaActual] = useState("inicio");

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };

  return (
    <div className="app">
      <Navbar
        cantidadCarrito={carrito.length}
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
