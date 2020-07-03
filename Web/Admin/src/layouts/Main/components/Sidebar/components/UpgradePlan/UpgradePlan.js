import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography} from '@material-ui/core';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'fit-content',
    bottom: 0,
    marginBottom: 29,
    marginLeft: 46,
  },
  media: {
    // paddingTop: theme.spacing(2),
    height: 30,
    textAlign: 'flex-start',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  actions: {
    display: 'flex',
    color: 'white'

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
      <div className={classes.media}>
        <SentimentSatisfiedIcon style={{color: 'white'}}/>
      </div>
      <div className={classes.content}>

      </div>
      <div className={classes.actions}>
        <Typography
          align="center"
          style={{fontSize:'16px', paddingLeft:'15px',textDecoration:'underline', color:'white'}}
          href="https://devias.io/products/devias-kit-pro"
        >
          J'ai besoin d'aide
        </Typography>
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string
};

export default UpgradePlan;
