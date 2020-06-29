import React , {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme,props) => ({
  margin: {
    width: 160
  },
  button1: {
    background: 'linear-gradient(90deg, #00C9FF 10%, #0CC77C 90%)',
    border: 0,
    borderRadius: '40px',
    color: 'white',
    padding: '10px 30px',
    textTransform: 'none'
  },
  button2: {
    border: '1px solid',
    borderColor: props=>props.bgColor,
    borderRadius: '40px',
    color: props=>props.bgColor,
    padding: '10px 30px',
    textTransform: 'none'
  },
}));

export default function MyButton(props) {
  const classes = useStyles(props);
  const [flag, setFlag] = useState(false);
  const btnClick = ()=>{
    if(props.onClick)
      props.onClick();
  };
  return (
    <div>
      <Button onClick={btnClick} className={props.color ? classes.button1 : classes.button2} 
        style={{fontSize:20}}
        disabled={props.disabled == 'disabled'? true : false}
        >
          {props.name}
      </Button>
    </div>
  );
}