import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {  Drawer } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('xl')]: {
      width: 333,
    },
    [theme.breakpoints.between('lg','lg')]: {
      width: 233,
    },
    [theme.breakpoints.between('md','md')]: {
      width: 163,
    },
    [theme.breakpoints.between('sm','sm')]: {
      width: 114,
    },
    [theme.breakpoints.down('sm')]: {
      width: 80,
    },
  },
  icon: {
    '&:hover,&:focus': {
      // backgroundColor: 'white',
      color:'#00bf82',
    },
    [theme.breakpoints.up('xl')]: {
      width: 24,
      height: 24,
    },
    [theme.breakpoints.between('lg','lg')]: {
      width: 17,
      height: 17,
    },
    [theme.breakpoints.between('md','md')]: {
      width: 12,
      height: 12,
    },
    [theme.breakpoints.between('sm','sm')]: {
      width: 8,
      height: 8,
    },
    [theme.breakpoints.down('sm')]: {
      width: 6,
      height: 6,
    },
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2)
  },
  root: {
    background: 'linear-gradient(0deg, #00C9FF 30%, #0CC77C 100%)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowX: 'hidden',
    justifyContent: 'space-between'
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <HomeIcon className={classes.icon}/>
    },
    {
      title: 'Companies',
      href: '/companies',
      icon: <TextFieldsIcon className={classes.icon}/>
    },
    {
      title: 'Managers',
      href: '/managers',
      icon: <AccountBoxIcon className={classes.icon}/>
    },
    {
      title: 'Buildings',
      href: '/buildings',
      icon: <PeopleIcon className={classes.icon}/>
    },
    {
      title: 'Owners',
      href: '/owners',
      icon: <SettingsIcon className={classes.icon}/>
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: <SettingsIcon className={classes.icon}/>
    },
    {
      title: 'Products',
      href: '/products',
      icon: <LockOpenIcon className={classes.icon}/>
    },
    {
      title: 'Discount Codes',
      href: '/discountcodes',
      icon: <ImageIcon className={classes.icon}/>
    },
    {
      title: 'Users',
      href: '/users',
      icon: <ShoppingBasketIcon className={classes.icon}/>
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
    {/* <Scrollbars style={{ height: "100vh" }}> */}

      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div>
          <Profile />
          <SidebarNav
            className={classes.nav}
            pages={pages}
          />
        </div>
        <UpgradePlan />
      </div>
    {/* </Scrollbars> */}

    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
