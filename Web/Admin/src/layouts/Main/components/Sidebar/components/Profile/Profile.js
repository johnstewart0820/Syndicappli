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
    [theme.breakpoints.down('md')]: {
      minHeight: 102,
      padding: 8,
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
    [theme.breakpoints.down('md')]: {
      width:98,
      height: 20,
    },
    display: 'flex',
  },
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    avatar: '/images/Login.png',
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
