function ProductDetail({ name, image, price, description, details }) {
  return (
    <>
      <div className="ProductDetail">
        <h3>{name}</h3>
        <img src={image} alt={name} />
        <p>{price}</p>
        <p>{description}</p>
        <p>{details}</p>
      </div>
    </>
  );
}

export default ProductDetail;
