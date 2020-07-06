import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography} from '@material-ui/core';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 'fit-content',
    align: 'center',
    bottom: 0,

    [theme.breakpoints.up('xl')]: {
      marginBottom: 29,
      marginLeft: 46,
    },
    [theme.breakpoints.between('lg','lg')]: {
      marginBottom: 20,
      marginLeft: 32,
    },
    [theme.breakpoints.between('md','md')]: {
      marginBottom: 14,
      marginLeft: 22,
    },
    [theme.breakpoints.between('sm','sm')]: {
      marginBottom: 10,
      marginLeft: 15,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 7,
      marginLeft: 11,
    },
    '& MuiSvgIcon-root' : {
      [theme.breakpoints.up('xl')]: {
        height: 30,
        width: 30
      },
      [theme.breakpoints.between('lg','lg')]: {
        height: 21,
        width: 21,
      },
      [theme.breakpoints.between('md','md')]: {
        height: 15,
        width: 15,
      },
      [theme.breakpoints.between('sm','sm')]: {
        height: 11,
        width: 11,
      },
      [theme.breakpoints.down('sm')]: {
        height: 8,
        width: 8,
      },
    }
  },
  medias:{
    display: 'flex',
    alignItems: 'center'
  },
  media: {
    color: 'white',
    [theme.breakpoints.up('xl')]: {
      height: 30,
      width: 30
    },
    [theme.breakpoints.between('lg','lg')]: {
      height: 21,
      width: 21,
    },
    [theme.breakpoints.between('md','md')]: {
      height: 15,
      width: 15,
    },
    [theme.breakpoints.between('sm','sm')]: {
      height: 11,
      width: 11,
    },
    [theme.breakpoints.down('sm')]: {
      height: 8,
      width: 8,
    },
    textAlign: 'flex-start',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  actions: {
    display: 'flex',
    color: 'white',
    alignItems: 'center'

  },
  fontsize: {
    cursor: 'pointer',
    [theme.breakpoints.up('xl')]: {
      fontSize:16, 
      paddingLeft:15,
    },
    [theme.breakpoints.between('lg','lg')]: {
      fontSize:11, 
      paddingLeft:10,
    },
    [theme.breakpoints.between('md','md')]: {
      fontSize:8, 
      paddingLeft:7,
    },
    [theme.breakpoints.between('sm','sm')]: {
      fontSize:6, 
      paddingLeft:5,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize:4, 
      paddingLeft:4,
    },
    textDecoration:'underline',
    color:'white',
  }
}));

const UpgradePlan = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.medias}>
        <SentimentSatisfiedIcon className={classes.media} />
      </div>
      <div className={classes.content}>

      </div>
      <div className={classes.actions}>
        <a
          align="center"
          className={classes.fontsize}
          href="/help"
        >
          J'ai besoin d'aide
        </a>
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string
};

export default UpgradePlan;
