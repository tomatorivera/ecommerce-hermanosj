import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants.js";
import { mensajeDeError } from "../utils/errores.utils.js";

import { Link } from "react-router-dom";
import ProductDetail from "../components/ProductDetail.jsx";

const ProductDetailPage = ({ onAgregarCarrito }) => {
  const { id } = useParams();

  // Detalle del producto, se pide a la API por id
  const [detalle, setDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(true);
  const [errorDetalle, setErrorDetalle] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/productos/${encodeURIComponent(id)}`)
      .then((response) => {
        if (response.status === 404) throw new Error("El producto no existe");
        if (!response.ok) throw new Error("Ocurrió un error cargando el producto");

        return response.json();
      })
      .then((data) => setDetalle(data))
      .catch((err) => setErrorDetalle(mensajeDeError(err)))
      .finally(() => setCargandoDetalle(false));
  }, [id]);

  return (
    <div className="app-contenido">
      <main>
        {cargandoDetalle && <p>Cargando producto...</p>}
        {!cargandoDetalle && errorDetalle && (
          <>
            <p>Ocurrió un error cargando el producto, detalle: {errorDetalle}</p>
            <Link className="btn-volver" to="/productos">
              ← Volver al listado
            </Link>
          </>
        )}

        {!cargandoDetalle && detalle && (
          <ProductDetail producto={detalle} onAgregarCarrito={onAgregarCarrito} />
        )}
      </main>
    </div>
  );
};

export default ProductDetailPage;
