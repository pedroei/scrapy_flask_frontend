import Product from './Product';

const ProductList = ({ products }) => {
  return (
    <div style={ProductListStyle}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductListStyle = { padding: '10px' };

export default ProductList;
