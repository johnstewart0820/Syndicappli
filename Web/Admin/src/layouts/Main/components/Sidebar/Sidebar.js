import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
import { Scrollbars } from 'react-custom-scrollbars';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 333,
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
      icon: <HomeIcon />
    },
    {
      title: 'Companies',
      href: '/companies',
      icon: <TextFieldsIcon />
    },
    {
      title: 'Managers',
      href: '/managers',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Buildings',
      href: '/buildings',
      icon: <PeopleIcon />
    },
    {
      title: 'Owners',
      href: '/owners',
      icon: <SettingsIcon />
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: <SettingsIcon />
    },
    {
      title: 'Products',
      href: '/products',
      icon: <LockOpenIcon />
    },
    {
      title: 'Discount Codes',
      href: '/discountcodes',
      icon: <ImageIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <ShoppingBasketIcon />
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
