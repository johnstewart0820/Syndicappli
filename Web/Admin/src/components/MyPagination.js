import React from 'react';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import theme from 'theme';
const useStyles = makeStyles((theme) => ({
  ul: {
    //   display: 'flex',
      listStyle: 'none',
      alignItems: 'center'
  },
  disabled: {
      opacity: '0.38',
  },
  li: {
      widht: 30,
      height: 30,
      alignItems: 'center'
  }
}));
export default function MyPagination(props) {
  const classes = useStyles();
  return (
    <div>
      <ul className={classes.ul}>
          <li className={classes.li}>
            <button className={ classes.default, classes.disabled}>
                <ArrowBackIosIcon/>
            </button>
          </li>
          <li className={classes.li}>
            <button className={classes.disabled}>
                1
            </button>
          </li>
          <li className={classes.li}>
            <button className={classes.disabled}>
                <ArrowForwardIosIcon/>
            </button>
          </li>
      </ul>
    </div>
  );
}