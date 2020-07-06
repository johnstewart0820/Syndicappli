import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddOrder from './AddOrder';
import { withRouter } from 'react-router-dom';
import authService from '../../services/authService.js';
import MyDialog from '../../components/MyDialog';
import useStyles from './useStyles';

const Orders = (props) => {
  const {history}=props;

  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/login");
  //   window.location.reload();
  // }
  const accessOrders = authService.getAccess('role_orders');
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/orders/edit/'+id);
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = ()=>{

  };
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    console.log('a');
  });
  useEffect(() => {
    console.log('b');
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
      { id: 2, name: 'Milk', price: 1.9, stock: 32 },
      { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
      { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
      { id: 5, name: 'Butter', price: 0.9, stock: 99 },
      { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
      { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
      { id: 8, name: 'Cheese', price: 4.9, stock: 20 },
      { id: 9, name: 'Milk', price: 1.9, stock: 32 },
      { id: 10, name: 'Yoghurt', price: 2.4, stock: 12 },
    ])
  }
  const cellList = [ 'name', 'price', 'stock']

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
              <MyButton name = {"Nouveau Commandes"} color={"1"} onClick={handleOpen}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} justify="space-between">
                  <Grid item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid><h2 id="transition-modal-title" className={classes.modalTitle}>Nouveau Commandes</h2></Grid> 
                </Grid>
                <AddOrder  onCancel={handleClose} onAdd={handleAdd}/>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div> 
      <div className={classes.body}>
      <MyDialog role={accessOrders} content="Access is denied!"/>
      <MyTable products={dataList} cells={cellList} onClickEdit={handleClickEdit}/>
      </div>
    </div>
  );
};

export default withRouter(Orders);
