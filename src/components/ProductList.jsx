import Product from './Product';

const ProductList = ({ products }) => {
  return (
    <div style={ProductListStyle}>
      {products.length > 0 ? (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <h4>No products found</h4>
      )}
    </div>
  );
};

const ProductListStyle = { padding: '10px' };

export default ProductList;
