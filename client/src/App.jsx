import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "./constants.js";
import { mensajeDeError } from "./utils/errores.utils.js";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage.jsx";
import ProductDetail from "./components/ProductDetail";
import HomePage from "./pages/HomePage.jsx";

import "./css/global.css";
import "./css/App.css";

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Detalle del producto seleccionado, se pide a la API por id
  const [detalle, setDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [errorDetalle, setErrorDetalle] = useState(null);

  // Carrito de compras: lista de productos agregados, cada uno con su cantidad
  const [carrito, setCarrito] = useState([]);
  const [paginaActual, setPaginaActual] = useState("inicio");

  // Total de unidades, no de líneas del carrito
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const navegar = (pagina) => {
    setProductoSeleccionado(null);
    setPaginaActual(pagina);
  };

  const verDetalle = (id) => {
    setDetalle(null);
    setErrorDetalle(null);
    setCargandoDetalle(true);
    setProductoSeleccionado(id);
    setPaginaActual("producto");
  };

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

  useEffect(() => {
    if (!productoSeleccionado) return;

    fetch(`${BACKEND_BASE_URL}/productos/${encodeURIComponent(productoSeleccionado)}`)
      .then((response) => {
        if (response.status === 404) throw new Error("El producto no existe");
        if (!response.ok) throw new Error("Ocurrió un error cargando el producto");

        return response.json();
      })
      .then((data) => setDetalle(data))
      .catch((err) => setErrorDetalle(mensajeDeError(err)))
      .finally(() => setCargandoDetalle(false));
  }, [productoSeleccionado]);

  return (
    <section className="app">
      <Navbar cantidadCarrito={cantidadTotal} paginaActual={paginaActual} onNavegar={navegar} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage onSeleccionarProducto={verDetalle} onAgregarCarrito={agregarAlCarrito} />
          }
        />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>

      {paginaActual === "producto" && (
        <div className="app-contenido">
          <main>
            {cargandoDetalle && <p>Cargando producto...</p>}
            {!cargandoDetalle && errorDetalle && (
              <>
                <button className="btn-volver" type="button" onClick={() => navegar("inicio")}>
                  ← Volver al listado
                </button>
                <p>Ocurrió un error cargando el producto, detalle: {errorDetalle}</p>
              </>
            )}

            {!cargandoDetalle && detalle && (
              <ProductDetail
                producto={detalle}
                onAgregarCarrito={agregarAlCarrito}
                onVolver={() => navegar("inicio")}
              />
            )}
          </main>
        </div>
      )}

      {paginaActual === "contacto" && <ContactPage />}

      <Footer />
    </section>
  );
}

export default App;
