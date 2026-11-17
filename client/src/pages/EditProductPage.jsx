import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants.js";
import { mensajeDeError } from "../utils/errores.utils.js";

import ProductForm from "../components/ProductForm.jsx";

const EditProductPage = () => {
  const { id } = useParams();

  // Producto a editar, se pide a la API por id
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [productoEditado, setProductoEditado] = useState(null);

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

  const editarProducto = async (datos) => {
    setProductoEditado(null);

    const response = await fetch(`${BACKEND_BASE_URL}/productos/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const data = await response.json();

    // Si falla, el form muestra el mensaje de error
    if (!response.ok) throw new Error(data.error ?? "Ocurrió un error editando el producto");

    setProductoEditado(data);
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
          <>
            <Link className="btn-volver" to={`/productos/${id}`}>
              ← Volver al detalle
            </Link>

            <section className="product-form-card" aria-labelledby="editar-producto-title">
              <h2 id="editar-producto-title">Editar producto</h2>

              <ProductForm product={producto} btnText="Guardar cambios" onSubmit={editarProducto} />

              {productoEditado && (
                <>
                  <p className="product-form-status product-form-status--success" role="status">
                    Producto "{productoEditado.nombre}" actualizado correctamente.
                  </p>
                  <Link to={`/productos/${productoEditado._id}`}>Ver producto</Link>
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default EditProductPage;
