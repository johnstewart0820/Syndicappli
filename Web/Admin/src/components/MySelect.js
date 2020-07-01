import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 17,
    padding: '2px 26px 2px 12px',
    height:33,
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme, props) => ({
  margin: {
    width: props => props.width,
    '& .MuiSelect-select.MuiSelect-select': {
      borderColor: props => props.color
    },
    '& .MuiSelect-icon': {
      color: props => props.color
    },
  },
}));

export default function CustomizedSelects(props) {
  const {onChangeSelect, ...rest} = props;
  const classes = useStyles(props);
  const [items, setItems] = React.useState(props.data);
  const [value, setValue] = React.useState(0);
  const handleChange = (event) => {
    props.onChangeSelect(event.target.value);
    setValue(event.target.value);
  };

  return (
      <FormControl className={classes.margin}>
        <NativeSelect
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={props.value}
          onChange={handleChange}
          input={<BootstrapInput />}
          disabled={props.disabled == 'disabled'? true : null}
        >
          {
            items.map((item, i) =>
              <option  value={i} key={item} > {item}</option>
          )}
        </NativeSelect>
      </FormControl>
  );
}