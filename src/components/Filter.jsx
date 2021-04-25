import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Filter({ handleChangeFilter }) {
  const classes = useStyles();

  return (
    <FormGroup row className={classes.center}>
      {/* <span>Only: </span> */}
      <FormControlLabel
        control={
          <Checkbox
            name="Amazon ES"
            value="Amazon ES"
            onBlur={handleChangeFilter}
            color="primary"
          />
        }
        label="Amazon ES"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="Ebay"
            value="Ebay"
            onBlur={handleChangeFilter}
            color="primary"
          />
        }
        label="Ebay"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="KuantoKusta"
            value="KuantoKusta"
            onBlur={handleChangeFilter}
            color="primary"
          />
        }
        label="KuantoKusta"
      />
    </FormGroup>
  );
}

export default Filter;
