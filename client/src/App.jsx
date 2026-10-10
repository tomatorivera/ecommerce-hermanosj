import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm.jsx";
import "./css/App.css";

function App() {
  // Carrito de compras: lista de productos agregados
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };

  return (
    <div className="app">
      <Navbar cantidadCarrito={carrito.length} />

      <div className="app-contenido">
        <main>
          <h1>Hola mundo</h1>

          {/* Temporal: este botón se mueve a ProductDetail (issue #2) */}
          <button type="button" onClick={() => agregarAlCarrito({ id: "producto-de-prueba" })}>
            Agregar al carrito
          </button>
        </main>
      </div>
      <section id="contacto">
        <h2>Contacto</h2>
        <ContactForm carrito={carrito} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
