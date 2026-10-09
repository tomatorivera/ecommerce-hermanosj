const ProductCard = ({ producto, onSeleccionarProducto, onAgregarCarrito }) => {
  const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  return (
    <article className="product-card">
      <section onClick={() => onSeleccionarProducto(producto.id)}>
        <img
          className="product-image"
          src={`../${producto.imagen}`}
          alt={`Imagen del producto ${producto.nombre}`}
          loading="lazy"
        />
        <section className="product-body">
          <h3 className="product-name">{producto.nombre}</h3>
          <p className="product-price">{formateadorPrecio.format(producto.precio)}</p>
        </section>
      </section>

      <button
        className="btn-agregar-carrito"
        type="button"
        onClick={() => onAgregarCarrito(producto)}
      >
        Agregar al carrito
      </button>
    </article>
  );
};

export default ProductCard;
