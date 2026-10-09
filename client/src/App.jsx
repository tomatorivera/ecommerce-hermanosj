import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

import "./css/homepage.css";

const BACKEND_BASE_URL = "http://localhost:3000/api";

function App() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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
    <section className="homepage-delimiter">
      {/* Este estado captura el producto seleccionado */}
      {productoSeleccionado && <p>ID producto seleccionado: {productoSeleccionado}</p>}

      <h1>Mueblería Hermanos Jota</h1>

      <main>
        <h2>Productos</h2>

        {cargando && !error && <p>Cargando productos...</p>}
        {!cargando && error && <p>Ocurrió un error cargando los productos, detalle: {error}</p>}

        {!cargando && !error && (
          <ProductList productos={productos} onSeleccionarProducto={setProductoSeleccionado} />
        )}
      </main>
    </section>
  );
}

export default App;
