import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '209px',
    padding: '16px',
    justifyContent: 'center'
  },
  avatar: {
    width:199,
    height: 41,
    display: 'flex',

  },
  name: {

  }
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
