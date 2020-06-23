import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import MySelect from '../../components/MySelect';
import CloseIcon from '@material-ui/icons/Close';
import AddProduct from './AddProduct';
import { Link as RouterLink, withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4)
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
  }
}));
const Products = (props) => {
  const {history} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/products/edit/'+id);
  }
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
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Mes Produits</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <div onClick={handleOpen}><MyButton name = {"Nouveau Produits"} color={"1"}/></div>
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
      </div> 
      <div className={classes.body}>
      <MyTable products={dataList} cells={cellList} onClickEdit={handleClickEdit}/>
      </div>
    </div>
  );
};

export default withRouter(Products);
