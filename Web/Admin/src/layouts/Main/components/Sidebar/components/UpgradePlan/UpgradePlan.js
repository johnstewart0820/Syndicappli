import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import authService from '../../../../../../services/authService';

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
    [theme.breakpoints.down('md')]: {
      marginBottom: 14,
      marginLeft: 22,
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
      [theme.breakpoints.down('md')]: {
        height: 15,
        width: 15,
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
    [theme.breakpoints.down('md')]: {
      height: 15,
      width: 15,
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
    [theme.breakpoints.down('md')]: {
      fontSize:8, 
      paddingLeft:7,
    },
    textDecoration:'underline',
    color:'white',
  }
}));

const UpgradePlan = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const webApp = authService.getAccess('web_app');  
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
          href={webApp === 'manager' ? "/manager/help" : webApp === 'owner' ? "/owner/help" : "/admin/help"}
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
