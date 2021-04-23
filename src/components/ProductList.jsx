import Product from './Product';
import Grid from '@material-ui/core/Grid';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid key={product.id} item>
                <Product product={product} />
              </Grid>
            ))
          ) : (
            <h2>No products found</h2>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductList;
