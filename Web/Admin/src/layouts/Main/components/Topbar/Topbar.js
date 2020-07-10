import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Button, Avatar, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SearchBar from 'material-ui-search-bar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import authService from 'services/authService';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 233px)',
      height: '146px'
    },
    [theme.breakpoints.up('xl')]: {
      width: 'calc(100% - 333px)',
      height: '146px'
    },
    '& .MuiButton-root':{
      textTransform : 'none'
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
    '& .MuiIconButton-root':{
      padding : 0,
      // margin:0

    },
    '& .SearchBar-searchIconButton-18':{
      [theme.breakpoints.up('xl')]: {
        marginRight: -18
      },
      [theme.breakpoints.down('lg')]: {
        marginRight: -13
      },
      [theme.breakpoints.down('md')]: {
        marginRight: -9
      },
    },
    '& .SearchBar-icon-19':{
      [theme.breakpoints.up('xl')]: {
        width: 34,
        height: 34,
      },
      [theme.breakpoints.down('lg')]: {
        width: 24,
        height: 24,
      },
      [theme.breakpoints.down('md')]: {
        width: 17,
        height: 17,
      },
    },
    '& .SearchBar-searchContainer-21':{
        display:'flex',
        width: '100%',
        [theme.breakpoints.up('xl')]: {
          marginLeft: 18,
          marginRight: 18
        },
        [theme.breakpoints.down('lg')]: {
          marginLeft: 13,
          marginRight: 13
        },
        [theme.breakpoints.down('md')]: {
          marginLeft: 9,
          marginRight: 9
        },
    },
  },
  paper: {
    backgroundColor: 'red',
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
  searchBar: {
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
  avatar: {

    [theme.breakpoints.up('xl')]: {
      width: 50,
      height: 50
    },
    [theme.breakpoints.down('lg')]: {
      width: 35,
      height: 35
    },
    [theme.breakpoints.down('md')]: {
      width: 25,
      height: 25
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
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const [value ,setValue] = useState('');
  const [notifications] = useState([]);

  const firstname = authService.getAccess('firstname');  
  const lastname = authService.getAccess('lastname');  
  const photo_url = authService.getAccess('photo_url');  
  const handleChange = (newValue) =>{
    setValue(newValue);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickLogout = (event) => {
    authService.logout();
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);

  };
  const webApp = authService.getAccess('web_app');  
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
            <MenuIcon className={classes.menuIcon}/>
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        <SearchBar
          className={classes.searchBar}
          onChange={handleChange}
          value={value}
          onRequestSearch={() => console.log('onRequestSearch')}
        />
        <IconButton color="inherit" >
          <Badge
            className={classes.alertButton}
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon className={classes.avatar}/>
          </Badge>
        </IconButton>
        <IconButton
          className={classes.signOutButton}
          color="inherit"
        >
          <Avatar
            alt={firstname + ' ' + lastname}
            className={classes.avatar}
            component={RouterLink}
            src={photo_url}
            onClick={handleClick}
          >
            {firstname[0] + lastname[0]}
          </Avatar>
          <Paper className={classes.paper}>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style:{
                    textAlign: 'center',
                    borderColor: '#707070',
                    paddingBottom: 0,
                      borderRadius: 8,
                      boxShadow:'5px 5px 19px #b6acf8'
              }
              }}
            >
              {
                webApp === 'manager' ?

                    <div>
                      <RouterLink to="/manager/myaccount">
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/my_account.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText className={classes.menu_item}>Mon compte</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <RouterLink to="/manager/mycompany">
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/my_company.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText className={classes.menu_item}>Mon Cabinet</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <RouterLink to="/manager/invoices">
                        <MenuItem  onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/invoice.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText className={classes.menu_item}>Mes Factures</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <RouterLink to="/manager/payment-methods">
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/payment.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText  className={classes.menu_item}>Mes Moyens de paiement</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <RouterLink to="/login">
                        <MenuItem onClick={handleClickLogout}>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText className={classes.menu_item}>Déconnexion</ListItemText>
                        </MenuItem>
                      </RouterLink>
                    </div>

                : webApp === 'owner' ?

                    <div>
                      <RouterLink to="/owner/myaccount">
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/my_account.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText className={classes.menu_item}>Mon compte</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <RouterLink to="/owner/invoices">
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/invoice.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText className={classes.menu_item}>Mes Factures</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <RouterLink to="/owner/subaccounts">
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/sub_accounts.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText className={classes.menu_item}>Sous comptes</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <RouterLink to="/login">
                        <MenuItem onClick={handleClickLogout}>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText className={classes.menu_item}>Déconnexion</ListItemText>
                        </MenuItem>
                      </RouterLink>
                    </div>
                :

                    <div>
                      <RouterLink to="/admin/myaccount">
                        <MenuItem onClick={handleClose} >
                          <ListItemIcon>
                            <img src="/images/my_account.png" alt="image"/>
                          </ListItemIcon>
                          <ListItemText className={classes.menu_item}>Mon compte</ListItemText>
                        </MenuItem>
                      </RouterLink>
                      <Divider />
                      <RouterLink to="/login">
                        <MenuItem onClick={handleClickLogout}>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText className={classes.menu_item}>Déconnexion</ListItemText>
                        </MenuItem>
                      </RouterLink>
                    </div>
              }
            </Menu>
          </Paper>

        </IconButton>
        <Button onClick={handleClick}>
            <p className={classes.menu_item}><b>{firstname + ' ' + lastname}</b></p>
            <ArrowDropDownIcon className={classes.avatar}/>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
