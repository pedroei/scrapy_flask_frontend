import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Loading from './components/layout/Loading';

import axios from 'axios';

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

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStore, setFilterStore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [lastSearch, setLastSearch] = useState('');

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
        filterStore.forEach((store) => {
          allProducts
            .filter((product) => product.store === store)
            .forEach((el) => filteredProducts.push(el));
        });
        setProducts(filteredProducts);
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

  //TODO: Random
  return (
    <div>
      <h1>Products scraper</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Only: </span>
          <input
            type="checkbox"
            name="Amazon ES"
            value="Amazon ES"
            onChange={handleChangeFilter}
          />
          <label htmlFor="Amazon ES">Amazon ES</label>&nbsp;&nbsp;
          <input
            type="checkbox"
            name="Ebay"
            value="Ebay"
            onChange={handleChangeFilter}
          />
          <label htmlFor="Ebay">Ebay</label>&nbsp;&nbsp;
          <input
            type="checkbox"
            name="KuantoKusta"
            value="KuantoKusta"
            onChange={handleChangeFilter}
          />
          <label htmlFor="KuantoKusta">KuantoKusta</label>
        </div>
        <br />
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {isLoading ? <Loading /> : <ProductList products={products} />}
    </div>
  );
};

export default App;
