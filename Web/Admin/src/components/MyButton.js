import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme,props) => ({
  margin: {
    width: 160
  },
  button1: {
    background: 'linear-gradient(90deg, #00C9FF 10%, #0CC77C 90%)',
    borderRadius: '52px',
    color: 'white',
    padding: '15px 30px',
    textTransform: 'none',
    border: '1px solid',
  },
  button2: {
    border: '1px solid',
    borderColor: props=>props.bgColor,
    borderRadius: '52px',
    color: props=>props.bgColor,
    padding: '15px 30px',
    textTransform: 'none'
  },
}));

export default function MyButton(props) {
  const classes = useStyles(props);
  const btnClick = ()=>{
    if(props.onClick)
      props.onClick();
  };
  return (
      <Button onClick={btnClick} className={props.color ? classes.button1 : classes.button2} 
        style={{fontSize:20}}
        disabled={props.disabled === 'disabled'? true : false}
        >
          {props.name}
      </Button>
  );
}