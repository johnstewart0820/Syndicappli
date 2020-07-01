import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddProduct from './AddProduct';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import authService from '../../services/authService.js';
import MyDialog from '../../components/MyDialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AdminService from '../../services/api.js';
import ProductsManager from './components/ProductsManager';
import ProductsBuilding from './components/ProductsBuilding';
import ProductsOwner from './components/ProductsOwner';
import { transform } from 'typescript';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTab-root': {
      textTransform: 'none'
    },
  },
  tool: {
    minHeight: '67px'
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
  padding: {
    padding: 32
  },
  close : {
    color: 'gray'
  },

}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Products = (props) => {
  const {history} = props;

  const token = authService.getToken();    
  if (!token) {
    history.push("/login");
    window.location.reload();
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const accessProducts = authService.getAccess('role_products');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [deleteId,setDeleteId] = useState(-1);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = ()=>{

  };
  const handleClickAdd = ()=>{
    if(accessProducts == 'Edit'){
      setOpen(true);
    }
    if(accessProducts == 'See'){
      setOpenDialog(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Mes Produits</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton name = {"Nouveau Produits"} color={"1"} onClick={handleClickAdd}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} justify="space-between">
                  <Grid item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid item ><h2 id="transition-modal-title">Nouveau Produits</h2></Grid>
                </Grid>
                <AddProduct  onCancel={handleClose} onAdd={handleAdd}/>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
        <Tabs value={value} onChange={handleChange} 
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#363636"
                }
              }}
        >
          <Tab xs={12} sm={4} label="Gestionnaires" {...a11yProps(0)} style={{fontSize:20}}/>
          <Tab xs={12} sm={4} label="Copropriétaires" {...a11yProps(1)} style={{fontSize:20}}/>
          <Tab xs={12} sm={4} label="Copropriété" {...a11yProps(2)} style={{fontSize:20}}/>
        </Tabs>
      </div> 
      <div className={classes.body}>
        <TabPanel value={value} index={0}>
          <ProductsManager />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductsOwner />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProductsBuilding />
        </TabPanel>
      </div>
    </div>
  );
};

export default withRouter(Products);
