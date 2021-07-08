import { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState('');
  const [idealPrice, setIdealPrice] = useState(0);
  const [product, setProduct] = useState(0);

  const [availableProducts, setAvailableProducts] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios.get(`/predict/mapping/terms`).then((response) => {
      setAvailableProducts(
        Object.keys(response.data).map((key) => {
          return {
            product_name: key,
            product_value: response.data[key],
          };
        })
      );
    });

    axios.get(`/predict/mapping/stores`).then((response) => {
      setAvailableStores(
        Object.keys(response.data).map((key) => {
          return {
            store_name: key,
            store_value: response.data[key],
          };
        })
      );
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStore = (event) => {
    setStore(event.target.value);
  };

  const handleChangeIdealPrice = (event) => {
    setIdealPrice(event.target.value);
  };

  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };

  const predictPrice = () => {
    if (store !== '' && idealPrice !== 0 && product !== '') {
      axios
        .get(`/predict/${idealPrice}/${store}/${product}`)
        .then((response) => {
          alert('We predict a price around ' + response.data + ' €');
        });
    }
  };

  return (
    <div>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        Predict price in store
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Predict Price</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose the store and ideal price
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Store</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={store}
              onChange={handleChangeStore}
            >
              {availableStores.map((store) => (
                <MenuItem key={store.store_value} value={store.store_value}>
                  {store.store_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="ideal-proce"
            label="Ideal Price"
            type="number"
            step="100"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeIdealPrice}
            variant="filled"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product}
              onChange={handleChangeProduct}
            >
              {availableProducts.map((product) => (
                <MenuItem
                  key={product.product_value}
                  value={product.product_value}
                >
                  {product.product_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={predictPrice} color="primary">
            Predict
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalComponent;
