import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";

import "./css/App.css";

const BACKEND_BASE_URL = "http://localhost:3000/api";

function App() {
  // Carga de productos
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Carrito de compras: lista de productos agregados
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/productos`)
      .then((response) => {
        if (!response.ok) throw new Error("Ocurrió un error cargando los productos");

        return response.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <section className="app">
      <Navbar cantidadCarrito={carrito.length} />

      <div className="app-contenido">
        <main>
          <h1>Mueblería Hermanos Jota</h1>

          {/* Temporal: este botón se mueve a ProductDetail (issue #2) */}
          <button type="button" onClick={() => agregarAlCarrito({ id: "producto-de-prueba" })}>
            Agregar al carrito
          </button>

          <section>
            <h2>Productos</h2>

            {/* Este estado captura el producto seleccionado */}
            {productoSeleccionado && <p>ID producto seleccionado: {productoSeleccionado}</p>}

            {cargando && !error && <p>Cargando productos...</p>}
            {!cargando && error && <p>Ocurrió un error cargando los productos, detalle: {error}</p>}

            {!cargando && !error && (
              <ProductList productos={productos} onSeleccionarProducto={setProductoSeleccionado} />
            )}
          </section>
        </main>
      </div>

      <Footer />
    </section>
  );
}

export default App;
