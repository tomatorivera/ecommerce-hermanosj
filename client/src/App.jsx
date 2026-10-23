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

  // Carrito de compras: lista de productos agregados, cada uno con su cantidad
  const [carrito, setCarrito] = useState([]);
  const [paginaActual, setPaginaActual] = useState("inicio");

  // Total de unidades, no de líneas del carrito
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const producto = productos.find((p) => p.id === productoSeleccionado);

  const navegar = (pagina) => {
    setProductoSeleccionado(null);
    setPaginaActual(pagina);
  };

  const verDetalle = (id) => {
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
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

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

      {paginaActual === "producto" && producto && (
        <div className="app-contenido">
          <main>
            <ProductDetail producto={producto} onAgregarCarrito={agregarAlCarrito} />
          </main>
        </div>
      )}

      {paginaActual === "contacto" && <ContactPage />}

      <Footer />
    </section>
  );
}

export default App;
