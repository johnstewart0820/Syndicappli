import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme,props) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-multiline':{
        padding: '3px 26px 3px 12px',
        fontSize: props=>props.font,
    },
    '& .MuiOutlinedInput-input':{
        padding: '3px 26px 3px 12px',
        fontSize: props=>props.font,
    },
  },
}));

export default function MyTextField(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <TextField variant="outlined" placeholder={props.placeholder}/>
    </div>            
  );
}