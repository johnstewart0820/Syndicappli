import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme,props) => ({
  margin: {
    [theme.breakpoints.up('xl')]: {
      width: 160
    },
    [theme.breakpoints.down('lg')]: {
      width: 112
    },
    [theme.breakpoints.down('md')]: {
      width: 78
    },
    [theme.breakpoints.down('sm')]: {
      width: 54
    },
  },
  button1: {
    [theme.breakpoints.up('xl')]: {
      padding: '15px 30px',
      borderRadius: '52px',
    },
    [theme.breakpoints.down('lg')]: {
      padding: '10px 21px',
      borderRadius: '36px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '7px 15px',
      borderRadius: '25px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px 10px',
      borderRadius: '18px',
    },
    background: 'linear-gradient(90deg, #00C9FF 10%, #0CC77C 90%)',
    color: 'white',
    textTransform: 'none',
    border: '1px solid',
  },
  button2: {
    [theme.breakpoints.up('xl')]: {
      padding: '15px 30px',
      borderRadius: '52px',
      fontSize: 20
    },
    [theme.breakpoints.down('lg')]: {
      padding: '10px 21px',
      borderRadius: '36px',
      fontSize: 14
    },
    [theme.breakpoints.down('md')]: {
      padding: '7px 15px',
      borderRadius: '25px',
      fontSize: 10
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px 10px',
      borderRadius: '18px',
      fontSize: 7
    },
    border: '1px solid',
    borderColor: props=>props.bgColor,
    color: props=>props.bgColor,
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
        disabled={props.disabled === 'disabled'? true : false}
        >
          {props.name}
      </Button>
  );
}