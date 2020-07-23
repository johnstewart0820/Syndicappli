import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      [theme.breakpoints.up('xl')]: {
        marginTop: 24,
      },
      [theme.breakpoints.between('lg','lg')]: {
        marginTop: 17,
      },
      [theme.breakpoints.down('md')]: {
        marginTop: 12,
      },
    },
  },
  input: {
    [theme.breakpoints.up('xl')]: {
      padding: '17px 25px',
      fontSize: 22,
    },
    [theme.breakpoints.down('lg')]: {
      padding: '12px 18px',
      fontSize: 15,
    },
    [theme.breakpoints.down('md')]: {
      padding: '8px 13px',
      fontSize: 11,
    },
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    // padding: '2px 26px 2px 12px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    color:'#707070',
    fontFamily: [
      'Poppins',
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
  const classes = useStyles(props);
  const [items] = React.useState(props.data);
  const [value, setValue] = React.useState(0);
  const handleChange = (event) => {
    props.onChangeSelect(event.target.value);
    setValue(event.target.value);
  };
  useEffect(()=>{
    setValue(props.value);
  },[props.value]);
  return (
      <FormControl className={classes.margin}>
        <NativeSelect
          value={value}
          onChange={handleChange}
          input={<BootstrapInput />}
          disabled={props.disabled === true? true : null}
        >
          {
            items.map((item, i) =>
              <option  value={i} key={i} > {item}</option>
          )}
        </NativeSelect>
      </FormControl>
  );
}