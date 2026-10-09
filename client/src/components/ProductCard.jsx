const ProductCard = ({ producto, onSeleccionarProducto }) => {
  const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  return (
    <article className="product-card" onClick={() => onSeleccionarProducto(producto.id)}>
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
    </article>
  );
};

export default ProductCard;
