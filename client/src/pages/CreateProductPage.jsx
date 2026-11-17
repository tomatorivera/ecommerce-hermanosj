import { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants.js";

import ProductForm from "../components/ProductForm.jsx";

const CreateProductPage = () => {
  const [productoCreado, setProductoCreado] = useState(null);

  const crearProducto = async (datos) => {
    setProductoCreado(null);

    const response = await fetch(`${BACKEND_BASE_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const data = await response.json();

    // Si falla, el form muestra el mensaje de error
    if (!response.ok) throw new Error(data.error ?? "Ocurrió un error creando el producto");

    setProductoCreado(data.producto);
  };

  return (
    <div className="app-contenido">
      <main>
        <Link className="btn-volver" to="/productos">
          ← Volver al listado
        </Link>

        <section className="card card--angosta" aria-labelledby="crear-producto-title">
          <h2 id="crear-producto-title">Nuevo producto</h2>

          <ProductForm btnText="Crear producto" onSubmit={crearProducto} resetOnSubmit />

          {productoCreado && (
            <>
              <p className="alert alert--success product-form-status" role="status">
                Producto "{productoCreado.nombre}" creado correctamente.
              </p>
              <Link to={`/productos/${productoCreado._id}`}>Ver producto</Link>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default CreateProductPage;
