/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      marginLeft:'24px',
      marginRight:'-10px',
    },
    [theme.breakpoints.between('lg','lg')]: {
      marginLeft:'16px',
      marginRight:'-7px',
    },
    [theme.breakpoints.between('md','md')]: {
      marginLeft:'11px',
      marginRight:'-5px',
    },
    [theme.breakpoints.between('sm','sm')]: {
      marginLeft:'8px',
      marginRight:'-4px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft:'6px',
      marginRight:'-3px',
    },
     paddingTop:'0'
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
      height: 67,
      borderRadius: 15,
      padding: '10px 8px 8px 24px',
    },
    [theme.breakpoints.between('lg','lg')]: {
      fontSize: 14,
      height: 47,
      borderRadius: 11,
      padding: '7px 6px 6px 17px',
    },
    [theme.breakpoints.between('md','md')]: {
      fontSize: 10,
      height: 33,
      borderRadius: 8,
      padding: '5px 4px 4px 12px',
    },
    [theme.breakpoints.between('sm','sm')]: {
      fontSize: 7,
      height: 23,
      borderRadius: 6,
      padding: '4px 3px 3px 8px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 5,
      height: 16,
      borderRadius: 4,
      padding: '3px 2px 2px 6px',
    },
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgb(255,255,255,80%)',
      color:'#00bf82',
    },
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    // fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    '&:hover,&:focus': {
      // backgroundColor: 'white',
      color:'#00bf82',
    },
    [theme.breakpoints.up('xl')]: {
      width: 24,
      height: 24,
      marginRight: 16
    },
    [theme.breakpoints.between('lg','lg')]: {
      width: 17,
      height: 17,
      marginRight: 11
    },
    [theme.breakpoints.between('md','md')]: {
      width: 12,
      height: 12,
      marginRight: 7
    },
    [theme.breakpoints.between('sm','sm')]: {
      width: 8,
      height: 8,
      marginRight: 5
    },
    [theme.breakpoints.down('sm')]: {
      width: 6,
      height: 6,
      marginRight: 4
    },
    display: 'flex',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'white',
    color: '#00bf82',
    // fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: '#00bf82'
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
