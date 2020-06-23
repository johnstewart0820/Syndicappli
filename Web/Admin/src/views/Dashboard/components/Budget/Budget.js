import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoneyIcon from '@material-ui/icons/Money';
import { property } from 'underscore';

const useStyles = makeStyles((theme, props)=> ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: props=>props.color
  },
  differenceValue: {
    color: props=>props.color,
    marginRight: theme.spacing(1),
    fontSize: 15
  },
  show: {
    visibility: 'visible',
    position: 'absolute',
    color: props=>props.color,
    zIndex: 0
  },
  hide: {
    visibility : 'hidden',
    color: props=>props.color,
    zIndex: 1
  }
}));

const Budget = props => {
  const { className, ...rest } = props;
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [pro, setPro] = useState(props.pro);
  const [tail, setTail] = useState(props.tail); 
  const [avatar, setAvatar] = useState(props.avatar);
  const [income, setIncome] = useState(props.income);
  const classes = useStyles(props);
  let style1, style2 ;
  if(income === 1){

    style1 = classes.show;
    style2 = classes.hide;
  }
  else{
    style1 = classes.hide;
    style2 = classes.show;
  }
  console.log(income);
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
            className={classes.caption}
            variant="caption"
              style={{fontSize:18}}
            >
              {title}
            </Typography>
            <p style={{fontSize: 31}}>{body}</p>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowDownwardIcon className={style1} />
          <ArrowUpwardIcon className={style2} />
          <p
            className={classes.differenceValue}
          >
            {pro}
          </p>
          <Typography
            className={classes.caption}
            variant="caption"
            style={{fontSize: 15}}
          >
            {tail}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
