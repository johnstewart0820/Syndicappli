import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      minHeight: 209,
      padding: 16,
    },
    [theme.breakpoints.between('lg','lg')]: {
      minHeight: 146,
      padding: 11,
    },
    [theme.breakpoints.between('md','md')]: {
      minHeight: 102,
      padding: 8,
    },
    [theme.breakpoints.between('sm','sm')]: {
      minHeight: 71,
      padding: 6,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 50,
      padding: 4,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    [theme.breakpoints.up('xl')]: {
      width:199,
      height: 41,
    },
    [theme.breakpoints.between('lg','lg')]: {
      width:140,
      height: 28,
    },
    [theme.breakpoints.between('md','md')]: {
      width:98,
      height: 20,
    },
    [theme.breakpoints.between('sm','sm')]: {
      width:69,
      height: 14,
    },
    [theme.breakpoints.down('sm')]: {
      width:48,
      height: 10,
    },
    display: 'flex',
  },
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    avatar: '/images/Logo.png',
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <img
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
