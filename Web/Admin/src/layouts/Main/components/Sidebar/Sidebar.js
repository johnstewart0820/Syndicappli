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
import HomeIcon from '@material-ui/icons/Home'
import authService from '../../../../services/authService.js';
import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('xl')]: {
      width: 333,
    },
    [theme.breakpoints.between('lg','lg')]: {
      width: 233,
    },
    [theme.breakpoints.down('md')]: {
      width: 163,
    },
    background:'transparent',
    borderTopRightRadius: 15,
    borderRight: 'none'
    // [theme.breakpoints.between('sm','sm')]: {
    //   width: 114,
    // },
    // [theme.breakpoints.down('sm')]: {
    //   width: 80,
    // },
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
    [theme.breakpoints.down('md')]: {
      width: 12,
      height: 12,
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
    justifyContent: 'space-between',
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
  const usertype = authService.getAccess('usertype');  
  const accessUsers = authService.getAccess('role_users');  
  const accessCompanies = authService.getAccess('role_companies'); 
  const accessBuildings = authService.getAccess('role_buildings'); 
  const accessDiscountCodes = authService.getAccess('role_discountcodes'); 
  const accessOwners = authService.getAccess('role_owners'); 
  const accessProducts = authService.getAccess('role_products'); 
  const accessManagers = authService.getAccess('role_managers'); 
  const accessOrders = authService.getAccess('role_orders'); 
  const accessChat = authService.getAccess('role_chat'); 
  const accessInvoices = authService.getAccess('role_invoices'); 
  const accessEvents = authService.getAccess('role_events');   
  const accessProviders = authService.getAccess('role_providers'); 
  const accessIncidents = authService.getAccess('role_incidents'); 
  const accessAddons = authService.getAccess('role_addons');   
  const accessCompany = authService.getAccess('role_company'); 
  const accessAssemblies = authService.getAccess('role_assemblies'); 
  const accessTeam = authService.getAccess('role_team');   
  const accessAdvertisement = authService.getAccess('role_advertisement'); 
  const accessPayments = authService.getAccess('role_payments'); 

  const admin_pages = [
    {
      title: 'Accueil',
      href: '/admin/dashboard',
      icon: <HomeIcon className={classes.icon}/>,
      status: 'visible'
    },
    {
      title: 'Mes Cabinets',
      href: '/admin/companies',
      icon: <TextFieldsIcon className={classes.icon}/>,
      status: accessCompanies
    },
    {
      title: 'Mes Gestionnaires',
      href: '/admin/managers',
      icon: <AccountBoxIcon className={classes.icon}/>,
      status: accessManagers
    },
    {
      title: 'Mes immeubles',
      href: '/admin/buildings',
      icon: <PeopleIcon className={classes.icon}/>,
      status: accessBuildings
    },
    {
      title: 'Mes Copropriétaires',
      href: '/admin/owners',
      icon: <SettingsIcon className={classes.icon}/>,
      status: accessOwners
    },
    {
      title: 'Mes Commandes',
      href: '/admin/orders',
      icon: <SettingsIcon className={classes.icon}/>,
      status: accessOrders
    },
    {
      title: 'Mes produits',
      href: '/admin/products',
      icon: <LockOpenIcon className={classes.icon}/>,
      status: accessProducts
    },
    {
      title: 'Mes Codes Promo',
      href: '/admin/discountcodes',
      icon: <ImageIcon className={classes.icon}/>,
      status: accessDiscountCodes
    },
    {
      title: 'Mes Utilisateurs',
      href: '/admin/users',
      icon: <ShoppingBasketIcon className={classes.icon}/>,
      status: accessUsers
    },
  ];
  
  const manager_pages = [
    {
      title: 'Accueil',
      href: '/manager/dashboard',
      icon: <HomeIcon color={classes.icon} />,
      status: 'visible'
    },
    {
      title: 'Mes immeubles',
      href: '/manager/buildings',
      icon: <TextFieldsIcon className={classes.icon}/>,
      status: accessBuildings
    },
    {
      title: 'Mes Copropriétaires',
      href: '/manager/owners',
      icon: <AccountBoxIcon className={classes.icon}/>,
      status: accessOwners
    },
    {
      title: 'Messagerie',
      href: '/manager/chat',
      icon: <PeopleIcon className={classes.icon}/>,
      status: accessChat
    },
    {
      title: 'Incidents',
      href: '/manager/incidents',
      icon: <SettingsIcon className={classes.icon}/>,
      status: accessIncidents
    },
    {
      title: 'Assemblées',
      href: '/manager/assemblies',
      icon: <LockOpenIcon className={classes.icon}/>,
      status: accessAssemblies
    },
    {
      title: 'Événements',
      href: '/manager/events',
      icon: <ImageIcon className={classes.icon}/>,
      status: accessEvents
    },
    {
      title: 'Mon équipe',
      href: '/manager/team',
      icon: <ShoppingBasketIcon className={classes.icon}/>,
      status: accessTeam
    },
    {
      title: 'Mes prestataires',
      href: '/manager/providers',
      icon: <LockOpenIcon className={classes.icon}/>,
      status: accessProviders
    },
    {
      title: 'Annonces',
      href: '/manager/announcements',
      icon: <ImageIcon className={classes.icon}/>,
      status: accessAdvertisement
    },
    {
      title: 'Modules',
      href: '/manager/addons',
      icon: <ShoppingBasketIcon className={classes.icon}/>,
      status: accessAddons
    },
  ];
  const owner_pages = [
    {
      title: 'Accueil',
      href: '/owner/dashboard',
      icon: <HomeIcon className={classes.icon}/>,
      status: 'visible'
    },
    {
      title: 'Messagerie',
      href: '/owner/chat',
      icon: <TextFieldsIcon className={classes.icon}/>,
      status: accessChat
    },
    {
      title: 'Incidents',
      href: '/owner/incidents',
      icon: <AccountBoxIcon className={classes.icon}/>,
      status: accessIncidents
    },
    {
      title: 'Assemblées',
      href: '/owner/assemblies',
      icon: <PeopleIcon className={classes.icon}/>,
      status: accessAssemblies
    },
    {
      title: 'Événements',
      href: '/owner/events',
      icon: <SettingsIcon className={classes.icon}/>,
      status: accessEvents
    },
    {
      title: 'Modules',
      href: '/owner/addons',
      icon: <SettingsIcon className={classes.icon}/>,
      status: accessAddons
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

      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div>
          <Profile />
          <SidebarNav
            className={classes.nav}
            pages={usertype === 'manager' ? manager_pages : 
                  usertype === 'owner' ? owner_pages : 
                  usertype === 'admin' ? admin_pages :
                  usertype === 'superadmin' ? admin_pages :
                  null
                }
          />
        </div>
        <UpgradePlan />
      </div>
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
