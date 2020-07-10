import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddOrder from './AddOrder';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import useStyles from './useStyles';
import OrdersManager from './components/OrdersManager';
import OrdersOwner from './components/OrdersOwner';
import OrdersOwnerShip from './components/OrdersOwnerShip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

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
        <Box >
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
const Orders = (props) => {
  const {history}=props;

  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const accessOrders = authService.getAccess('role_orders');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = ()=>{

  };
  const handleClickAdd = ()=>{
    if(accessOrders === 'Edit'){
      setOpen(true);
    }
    if(accessOrders === 'See'){
      setOpenDialog(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.titleText}>
                <b>Mes Commandes</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton name = {"Nouveau Commandes"} color={"1"} onClick={handleClickAdd}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} justify="space-between">
                  <Grid item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid><h2 id="transition-modal-title" className={classes.modalTitle}>Nouveau Commande</h2></Grid> 
                </Grid>
                <AddOrder  onCancel={handleClose} onAdd={handleAdd}/>
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
          <Tab xs={12} sm={4} label="Gestionnaires" {...a11yProps(0)} className={classes.tabTitle}/>
          <Tab xs={12} sm={4} label="Copropriétaires" {...a11yProps(1)} className={classes.tabTitle}/>
          <Tab xs={12} sm={4} label="Copropriété" {...a11yProps(2)} className={classes.tabTitle}/>
        </Tabs>
      </div> 
      <div className={classes.body}>
        <TabPanel value={value} index={0}>
          <OrdersManager />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrdersOwner />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OrdersOwnerShip />
        </TabPanel>
      </div>
    </div>
  );
};

export default withRouter(Orders);
