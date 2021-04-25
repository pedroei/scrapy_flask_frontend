import { useState, useEffect } from 'react';
import ProductList from '../ProductList';
import Loading from '../layout/Loading';

import axios from 'axios';
import Filter from '../Filter';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  marginTop: {
    marginTop: 25,
  },
  marginBottom: {
    marginBottom: 25,
  },
  marginBottomLow: {
    marginBottom: 15,
  },
});

const randomTerms = [
  'pc',
  'smartwatch',
  'phone',
  'apple',
  'samsung',
  'xiaomi',
  'asus',
  'windows',
  'macbook',
];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStore, setFilterStore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [lastSearch, setLastSearch] = useState('');

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    const startingTerm =
      randomTerms[Math.floor(Math.random() * randomTerms.length)];
    axios.get(`/lowest/${startingTerm}`).then((response) => {
      setIsLoading(false);
      setAllProducts(response.data);
      setProducts(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm === '' || searchTerm.startsWith(' ')) return;

    setIsLoading(true);

    if (searchTerm !== lastSearch) {
      axios.get(`/lowest/${searchTerm}`).then((response) => {
        setIsLoading(false);
        if (filterStore.length === 0) {
          setAllProducts(response.data);
          setProducts(response.data);
        } else {
          setAllProducts(response.data);
          const filteredProducts = [];
          filterStore.forEach((store) => {
            response.data
              .filter((product) => product.store === store)
              .forEach((el) => filteredProducts.push(el));
          });
          setProducts(filteredProducts);
        }
      });
      setLastSearch(searchTerm);
    } else {
      if (filterStore.length !== 0) {
        setIsLoading(false);
        const filteredProducts = [];
        let filteredSortedProducts = [];
        filterStore.forEach((store) => {
          allProducts
            .filter((product) => product.store === store)
            .forEach((el) => filteredProducts.push(el));
        });
        filteredProducts.forEach((product) => {
          if (product.price !== 'Not specified') {
            filteredSortedProducts.push(product);
          }
        });
        setProducts(filteredSortedProducts.sort((a, b) => a.price - b.price));
      } else {
        setIsLoading(false);
        setProducts(allProducts);
      }
    }
  };

  const handleChangeFilter = (e) => {
    if (!e.target.checked) {
      setFilterStore(filterStore.filter((elem) => elem !== e.target.value));
    } else {
      setFilterStore([...filterStore, e.target.value]);
    }
  };

  return (
    <Container>
      <Typography
        className={classes.marginTop}
        variant="h3"
        gutterBottom
        align="center"
      >
        Products Scraper
      </Typography>
      <Container align="center" className={classes.marginBottom}>
        <form onSubmit={handleSubmit}>
          <Filter handleChangeFilter={handleChangeFilter} />
          <br />
          <Grid item xs={2}>
            <TextField
              className={classes.marginBottomLow}
              label="Term"
              onBlur={(e) => setSearchTerm(e.target.value)} // using onBlur to be faster, onChange provokes slow writing
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </form>
      </Container>
      {isLoading ? <Loading /> : <ProductList products={products} />}
    </Container>
  );
}

export default Home;
