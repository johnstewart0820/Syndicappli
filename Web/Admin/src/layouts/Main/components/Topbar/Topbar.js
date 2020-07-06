import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SearchBar from 'material-ui-search-bar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import authService from 'services/authService';

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
    backgroundColor: 'white',
    '& .MuiInputBase-root': {
      
      [theme.breakpoints.up('xl')]: {
        fontSize: 20
      },
      [theme.breakpoints.between('lg','lg')]: {
        fontSize: 14
      },
      [theme.breakpoints.between('md','md')]: {
        fontSize: 10
      },
      [theme.breakpoints.between('sm','sm')]: {
        fontSize: 7
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 5
      },
    },
    '& .SearchBar':{
      display: 'flex',
      width: '80%',
      margin: 'auto auto'
    },
    '& .MuiIconButton-root':{
      padding : 0
    },
    '& .SearchBar-icon':{
      [theme.breakpoints.up('xl')]: {
        width: 34,
        height: 34,
      },
      [theme.breakpoints.between('lg','lg')]: {
        width: 24,
        height: 24,
      },
      [theme.breakpoints.between('md','md')]: {
        width: 17,
        height: 17,
      },
      [theme.breakpoints.between('sm','sm')]: {
        width: 12,
        height: 12,
      },
      [theme.breakpoints.down('sm')]: {
        width: 8,
        height: 8,
      },
    },
    '& .SearchBar-searchIconButton-19':{
      [theme.breakpoints.up('xl')]: {
        marginRight: -33
      },
      [theme.breakpoints.between('lg','lg')]: {
        marginRight: -23
      },
      [theme.breakpoints.between('md','md')]: {
        marginRight: -16
      },
      [theme.breakpoints.between('sm','sm')]: {
        marginRight: -11
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: -8
      },
    }
  },
  paper: {
    backgroundColor: 'white',
    '& .MuiInputBase-root': {
      [theme.breakpoints.up('xl')]: {
        fontSize: 20
      },
      [theme.breakpoints.between('lg','lg')]: {
        fontSize: 14
      },
      [theme.breakpoints.between('md','md')]: {
        fontSize: 10
      },
      [theme.breakpoints.between('sm','sm')]: {
        fontSize: 7
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 5
      },
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    color: 'lightgrey',
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
    [theme.breakpoints.between('lg','lg')]: {
      borderRadius: 35,
      height: 35,
      width: 215,
    },
    [theme.breakpoints.between('md','md')]: {
      borderRadius: 25,
      height: 25,
      width: 151,
    },
    [theme.breakpoints.between('sm','sm')]: {
      borderRadius: 18,
      height: 25,
      width: 106,
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: 13,
      height: 18,
      width: 74,
    },
    marginRight: theme.spacing(2),
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
  },
  avatar: {
    [theme.breakpoints.up('xl')]: {
      width: 50,
      height: 50
    },
    [theme.breakpoints.between('lg','lg')]: {
      width: 35,
      height: 35
    },
    [theme.breakpoints.between('md','md')]: {
      width: 25,
      height: 25
    },
    [theme.breakpoints.between('sm','sm')]: {
      width: 25,
      height: 25,
    },
    [theme.breakpoints.down('sm')]: {
      width: 18,
      height: 18,
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
      padding: theme.spacing(3),
      minHeight: 0,
      lineHeight: 0
    },
    [theme.breakpoints.between('lg','lg')]: {
      fontSize: 13,
      padding: theme.spacing(2),
      minHeight: 0,
      lineHeight: 0
    },
    [theme.breakpoints.between('md','md')]: {
      fontSize: 9,
      padding: theme.spacing(1),
      minHeight: 0,
      lineHeight: 0
    },
    [theme.breakpoints.between('sm','sm')]: {
      fontSize: 6,
      minHeight: 0,
      lineHeight: 0
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 4,
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
  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
  const handleChange = (newValue) =>{
    setValue(newValue);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickProfile = (event) => {
    handleClose();
  };
  const handleClickLogin = (event) => {
    authService.logout();
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);

  };
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
           onRequestSearch={value}
          value={value}
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
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            onClick={handleClick}
          />
          <Paper className={classes.paper}>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style:{
                    textAlign: 'center',
                    borderColor: '#707070',
                    paddingBottom: 0,

                      fontSize: 9,
                      width: 133,
                      borderRadius: 8,
                      boxShadow:'10px 10px 29px #b6acf8'
              }
              }}
            >
              <RouterLink to={"/myaccount"}>
                <MenuItem className={classes.menu_item} onClick={handleClickProfile} >Mon compte</MenuItem>
              </RouterLink>
              <Divider />
              <RouterLink to={"/login"}>
                <MenuItem className={classes.menu_item} onClick={handleClickLogin}>Déconnexion</MenuItem>
              </RouterLink>
            </Menu>
          </Paper>

        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
