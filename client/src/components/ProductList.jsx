import ProductCard from "./ProductCard";
import "../css/productos.css";

const ProductList = ({ productos, onSeleccionarProducto, onAgregarCarrito }) => {
  if (!productos || productos.length < 1)
    return <p className="catalog-error-msg">No hay productos para mostrar.</p>;

  return (
    <section className="catalog">
      {productos.map((p) => (
        <ProductCard
          key={p.id}
          producto={p}
          onSeleccionarProducto={onSeleccionarProducto}
          onAgregarCarrito={onAgregarCarrito}
        />
      ))}
    </section>
  );
};

export default ProductList;
