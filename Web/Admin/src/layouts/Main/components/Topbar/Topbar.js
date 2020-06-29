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
      width: 'calc(100% - 333px)',
      height: '209px'
    },
    backgroundColor: 'white',
    '& .MuiInputBase-root': {
      fontSize: 20
    },
  },
  paper: {
    backgroundColor: 'red',
    '& .MuiInputBase-root': {
      fontSize: 20
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
    borderRadius: '50px',
    height: '50px',
    width: 308,
    marginRight: theme.spacing(2),
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
  },
  avatar: {
    width: 50,
    height: 50
  },
  toolbar: {
    flex: 1,
  },
  menuIcon: {
    color: 'grey'
  },
  menu_item: {
    fontSize: 18,
    justifyContent: 'center',
    padding: theme.spacing(3)
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
                  fontSize: 18,
                  width: 272,
                  borderRadius: 15,
                  textAlign: 'center',
                  borderColor: '#707070',
                  boxShadow:'20px 20px 60px #b6acf8'
                },
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
