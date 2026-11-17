import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants.js";
import { mensajeDeError } from "../utils/errores.utils.js";

import ProductList from "../components/ProductList.jsx";

const ProductsPage = ({ onAgregarCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/productos`)
      .then((response) => {
        if (!response.ok) throw new Error("Ocurrió un error cargando los productos");

        return response.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(mensajeDeError(err)))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="app-contenido">
      <main>
        <h1>Mueblería Hermanos Jota</h1>

        <div>
          <section className="productos-encabezado">
            <h2>Productos</h2>
            <Link className="btn-crear-producto" to="/admin/crear-producto">
              + Crear producto
            </Link>
          </section>

          {cargando && !error && <p>Cargando productos...</p>}
          {!cargando && error && <p>Ocurrió un error cargando los productos, detalle: {error}</p>}

          {!cargando && !error && (
            <ProductList productos={productos} onAgregarCarrito={onAgregarCarrito} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
