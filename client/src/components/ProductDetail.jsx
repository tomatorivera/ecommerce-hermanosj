const formateadorPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function ProductDetail({ producto, onAgregarCarrito }) {
  return (
    <article className="ProductDetail">
      <img src={`../${producto.imagen}`} alt={`Imagen del producto ${producto.nombre}`} />
      <section>
        <h2 className="product-name">{producto.nombre}</h2>
        <p className="product-price">{formateadorPrecio.format(producto.precio)}</p>
        <p>{producto.descripcion}</p>
        <ul>
          {producto.detalles.map((detalle) => (
            <li key={detalle.titulo}>
              <strong>{detalle.titulo}:</strong> {detalle.descripcion}
            </li>
          ))}
        </ul>
        <button
          className="btn-agregar-carrito"
          type="button"
          onClick={() => onAgregarCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </section>
    </article>
  );
}

export default ProductDetail;
