const Product = ({ product }) => {
  return (
    <div style={ProductStyle}>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        width="200px"
        height="200px"
      />
      <p>{product.price}</p>
      <p>{product.store}</p>
    </div>
  );
};

const ProductStyle = {
  border: '2px solid gray',
  padding: '10px',
  marginBottom: '15px',
};

export default Product;