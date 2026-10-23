import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./components/ContactPage.jsx";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { BACKEND_BASE_URL } from "./constants.js";
import "./css/global.css";
import "./css/App.css";

function App() {
  // Carga de productos
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

  // fetch rechaza con TypeError cuando no hay conexión con la API (por ejemplo, si está apagada)
  const mensajeDeError = (err) =>
    err instanceof TypeError ? "No se pudo conectar con el servidor" : err.message;

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
    fetch(`${BACKEND_BASE_URL}/productos`)
      .then((response) => {
        if (!response.ok) throw new Error("Ocurrió un error cargando los productos");

        return response.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(mensajeDeError(err)))
      .finally(() => setCargando(false));
  }, []);

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

      {paginaActual === "inicio" && (
        <div className="app-contenido">
          <main>
            <h1>Mueblería Hermanos Jota</h1>

            <section>
              <h2>Productos</h2>

              {cargando && !error && <p>Cargando productos...</p>}
              {!cargando && error && (
                <p>Ocurrió un error cargando los productos, detalle: {error}</p>
              )}

              {!cargando && !error && (
                <ProductList
                  productos={productos}
                  onSeleccionarProducto={verDetalle}
                  onAgregarCarrito={agregarAlCarrito}
                />
              )}
            </section>
          </main>
        </div>
      )}

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
