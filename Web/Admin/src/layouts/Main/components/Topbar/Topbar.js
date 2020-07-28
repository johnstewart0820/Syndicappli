import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Button, Avatar, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import authService from 'services/authService';
import useGlobal from 'Global/global';
import AdminService from 'services/api.js';
import { SearchInput } from 'components';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 233px)',
      height: '146px'
    },
    [theme.breakpoints.up('xl')]: {
      width: 'calc(100% - 333px)',
      height: '146px'
    },
    '& .MuiButton-root': {
      textTransform: 'none'
    },
    backgroundColor: 'white',
    '& .MuiInputBase-root': {

      [theme.breakpoints.up('xl')]: {
        fontSize: 20
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 14
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 10
      },
    },
  },
  paper: {
    '& .MuiInputBase-root': {
      [theme.breakpoints.up('xl')]: {
        fontSize: 20
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 14
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 10
      },
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  alertButton: {
    color: 'lightgrey',
  },
  avatar: {

    [theme.breakpoints.up('xl')]: {
      fontSize: 21,
      width: 50,
      height: 50
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 15,
      width: 35,
      height: 35
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 11,
      width: 25,
      height: 25
    },
  },
  down: {
    color: '#707070',
    [theme.breakpoints.up('xl')]: {
      width: 55,
      height: 20
    },
    [theme.breakpoints.down('lg')]: {
      width: 35,
      height: 14
    },
    [theme.breakpoints.down('md')]: {
      width: 25,
      height: 10
    },
  },
  toolbar: {
    flex: 1,
  },
  menuIcon: {
    color: 'grey'
  },
  menu_item: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 18,
      minHeight: 0,
      lineHeight: 0
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 13,
      minHeight: 0,
      lineHeight: 0
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 9,
      minHeight: 0,
      lineHeight: 0
    },

    justifyContent: 'center',
  },
  menuProps: {
    textAlign: 'center',
    borderColor: '#707070',
    paddingBottom: 0,
    borderRadius: 8,
    boxShadow: '5px 5px 19px #b6acf8',
    maxWidth: 270,
    [theme.breakpoints.up('xl')]: {
      marginTop: 90,
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: 80,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 45,
    },
  },
  searchInput: {
    [theme.breakpoints.up('xl')]: {
      borderRadius: 50,
      height: 50,
      width: 308,
    },
    [theme.breakpoints.down('lg')]: {
      borderRadius: 35,
      height: 35,
      width: 215,
    },
    [theme.breakpoints.down('md')]: {
      borderRadius: 25,
      height: 25,
      width: 151,
    },
    marginRight: theme.spacing(2),
    boxShadow: '0px 3px 5px 2px rgba(182, 172, 251, .42)',
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const {history} = props;
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [globalState, globalActions] = useGlobal();
  const [notifications] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickLogout = (event) => {
    authService.logout();
    localStorage.setItem("select", JSON.stringify(0));
    setAnchorEl(null);
    history.push('/login');
    window.location.reload();
  };
  const handleClose = () => {
    localStorage.setItem("select", JSON.stringify(0));
    setAnchorEl(null);
    // window.location.reload();
  };
  const handleClickManagerMyAccount = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/manager/myaccount');
    window.location.reload();
  }
  const handleClickManagerMyCompany = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/manager/mycompany');
    window.location.reload();
  }
  const handleClickManagerInvoices = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/manager/invoices');
    window.location.reload();
  }
  const handleClickManagerPayment = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/manager/payment-methods');
    window.location.reload();
  }
  const handleClickOwnerMyAccount = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/owner/myaccount');
    window.location.reload();
  }
  const handleClickOwnerInvoices = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/owner/invoices');
    window.location.reload();
  }
  const handleClickOwnerSubAccounts = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/owner/subaccounts');
    window.location.reload();
  }
  const handleClickAdminMyAccount = () => {
    localStorage.setItem("select", JSON.stringify(-1));
    setAnchorEl(null);
    history.push('/admin/myaccount');
    window.location.reload();
  }
  useEffect(() => {
    AdminService.getProfile()
      .then(
        response => {
          switch (response.data.code) {
            case 200:
              localStorage.setItem("token", JSON.stringify(response.data.data.token));
              const profile = response.data.data.profile;
              globalActions.setID(profile.userID);
              globalActions.setFirstName(profile.firstname);
              globalActions.setLastName(profile.lastname);
              globalActions.setAvatarUrl(profile.photo_url);
              break;
            case 401:
              authService.logout();
              window.location.replace("/login");
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          console.log('fail');
        }
      );
  }, []);
  const webApp = authService.getAccess('usertype');
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        {/* <SearchBar
          className={classes.searchBar}
          onChange={handleChange}
          value={value}
          placeholder="Rechercher..."
          onRequestSearch={() => console.log('onRequestSearch')}
        /> */}
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Rechercher..."
          />
        </div>
        <IconButton color="inherit" >
          <Badge
            className={classes.alertButton}
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <Avatar className={classes.avatar} src='/images/alarm.png' />
          </Badge>
        </IconButton>
        <IconButton
          className={classes.signOutButton}
          onClick={handleClick}
          color="inherit"
        >
          <Avatar
            alt={globalState.firstname + ' ' + globalState.lastname}
            className={classes.avatar}
            src={globalState.avatarurl}
          >
            {globalState.firstname[0] + globalState.lastname[0]}
          </Avatar>
        </IconButton>
        <Paper className={classes.paper}>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              className: classes.menuProps
            }}
          >
            {
              webApp === 'manager' ?
                <div>
                  <MenuItem onClick={handleClickManagerMyAccount} >
                    <ListItemIcon>
                      <img src="/images/my_account.png" alt="image" />
                    </ListItemIcon>
                    <ListItemText className={classes.menu_item}>Mon compte</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClickManagerMyCompany} >
                    <ListItemIcon>
                      <img src="/images/my_company.png" alt="image" />
                    </ListItemIcon>
                    <ListItemText className={classes.menu_item}>Mon Cabinet</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClickManagerInvoices} >
                    <ListItemIcon>
                      <img src="/images/invoice.png" alt="image" />
                    </ListItemIcon>
                    <ListItemText className={classes.menu_item}>Mes Factures</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClickManagerPayment} >
                    <ListItemIcon>
                      <img src="/images/payment.png" alt="image" />
                    </ListItemIcon>
                    <ListItemText className={classes.menu_item}>Mes Moyens de paiement</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClickLogout}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText className={classes.menu_item}>Déconnexion</ListItemText>
                  </MenuItem>
                </div>

                : webApp === 'owner' ?

                  <div>
                    <MenuItem onClick={handleClickOwnerMyAccount} >
                      <ListItemIcon>
                        <img src="/images/my_account.png" alt="image" />
                      </ListItemIcon>
                      <ListItemText className={classes.menu_item}>Mon compte</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClickOwnerInvoices} >
                      <ListItemIcon>
                        <img src="/images/invoice.png" alt="image" />
                      </ListItemIcon>
                      <ListItemText className={classes.menu_item}>Mes Factures</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClickOwnerSubAccounts} >
                      <ListItemIcon>
                        <img src="/images/sub_accounts.png" alt="image" />
                      </ListItemIcon>
                      <ListItemText className={classes.menu_item}>Sous comptes</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClickLogout}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText className={classes.menu_item}>Déconnexion</ListItemText>
                    </MenuItem>
                  </div>
                  :

                  <div>
                    <MenuItem onClick={handleClickAdminMyAccount} >
                      <ListItemIcon>
                        <img src="/images/my_account.png" alt="image" />
                      </ListItemIcon>
                      <ListItemText className={classes.menu_item}>Mon compte</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClickLogout}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText className={classes.menu_item}>Déconnexion</ListItemText>
                    </MenuItem>
                  </div>
            }
          </Menu>
        </Paper>
        <Button onClick={handleClick}>
          <p className={classes.menu_item}><b>{globalState.firstname + ' ' + globalState.lastname}</b></p>
          <img src='/images/down.png' className={classes.down} />
        </Button>
      </Toolbar>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default withRouter(Topbar);
