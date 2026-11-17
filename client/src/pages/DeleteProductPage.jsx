import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants.js";
import { mensajeDeError } from "../utils/errores.utils.js";

import "../css/eliminar-producto.css";

const DeleteProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Producto a eliminar, se pide a la API por id
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/productos/${encodeURIComponent(id)}`)
      .then((response) => {
        if (response.status === 404) throw new Error("El producto no existe");
        if (!response.ok) throw new Error("Ocurrió un error cargando el producto");

        return response.json();
      })
      .then((data) => setProducto(data))
      .catch((err) => setErrorCarga(mensajeDeError(err)))
      .finally(() => setCargando(false));
  }, [id]);

  const handleConfirmar = async () => {
    setEliminando(true);
    setErrorEliminar(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/productos/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Ocurrió un error eliminando el producto");
      }

      navigate("/productos");
    } catch (err) {
      setErrorEliminar(mensajeDeError(err));
      setEliminando(false);
    }
  };

  return (
    <div className="app-contenido">
      <main>
        {cargando && <p>Cargando producto...</p>}

        {!cargando && errorCarga && (
          <>
            <p>Ocurrió un error cargando el producto, detalle: {errorCarga}</p>
            <Link className="btn-volver" to="/productos">
              ← Volver al listado
            </Link>
          </>
        )}

        {!cargando && producto && (
          <section className="delete-card" aria-labelledby="eliminar-producto-title">
            <h2 id="eliminar-producto-title">Eliminar producto</h2>

            <p>
              Vas a eliminar <strong>{producto.nombre}</strong>. Esta acción no se puede deshacer.
            </p>

            <div className="delete-actions">
              <button
                type="button"
                className="delete-confirm"
                onClick={handleConfirmar}
                disabled={eliminando}
              >
                {eliminando ? "Eliminando..." : "Confirmar"}
              </button>
              <Link className="delete-cancel" to={`/productos/${id}`}>
                Cancelar
              </Link>
            </div>

            {errorEliminar && (
              <p className="delete-error" role="alert">
                {errorEliminar}
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default DeleteProductPage;
