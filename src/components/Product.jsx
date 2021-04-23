import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 400,
  },
});

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt={product.name}
          image={product.image}
          title="Scraped Product"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            maxLength="1"
            className="lengthTitle"
          >
            {product.name}
          </Typography>
          <Typography color="textSecondary" component="p">
            {product.store}
          </Typography>
          <Typography variant="body2" component="p">
            {product.price}
            {!isNaN(product.price) && '€'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography>
          <Link href={product.link} target="_blank" rel="noreferrer">
            See product in store
          </Link>
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Product;
