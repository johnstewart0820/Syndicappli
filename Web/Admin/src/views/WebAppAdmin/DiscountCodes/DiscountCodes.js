import React, { useState, useEffect } from 'react';
import {withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import AddDiscountCode from './AddDiscountCode';
import CloseIcon from '@material-ui/icons/Close';
import AdminService from '../../../services/api.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import authService from '../../../services/authService.js';
import MyDialog from '../../../components/MyDialog';
import useStyles from './useStyles';

const DiscountCodes = (props) => {
  const { history } = props;

  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }
  const accessDiscountCodes = authService.getAccess('role_discountcodes');

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [deleteId,setDeleteId] = useState(-1);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dataList, setDataList] = useState([]);
  const [totalpage , setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num , setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method , setSortMethod] = useState('asc');
  const selectList=[20, 50, 100, 200, -1];

  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpenDelete = () => {
  //   setOpenDelete(true);
  // };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
  const handleAdd = ()=>{

  };
  const handleClickAdd = ()=>{
    if(accessDiscountCodes === 'edit'){
      setOpen(true);
    }
    if(accessDiscountCodes === 'see'){
      setOpenDialog(true);
    }
  };
  const handleChangeSelect = (value) => {
    setRowCount(selectList[value]);
  }
  const handleChangePagination = (value)=>{
    setPageNum(value);
  }
  const handleSort = (index , direct)=>{
    setSortColumn(index);
    setSortMethod(direct);
  }
  const getDatas = ()=>{
    const requestData = {
      'search_key': '',
      'page_num' : page_num-1,
      'row_count' : row_count,
      'sort_column' : sort_column,
      'sort_method' : sort_method
    }
    AdminService.getUserList(requestData)
    .then(      
      response => {        
        // setVisibleIndicator(false);  
        switch(response.data.code){
          case 200:

            break;
          case 401:
            authService.logout();
            history.push('/login');
            window.location.reload();
            break;
          default:
            // ToastsStore.error(response.data.message);
        }
      },
      error => {
        // setVisibleIndicator(false);
      }
    );
  }
  useEffect(()=>{
    if(accessDiscountCodes === 'denied'){
      setOpenDialog(true);
    }
  });
  useEffect(() => {
    // getDataList();
    if(accessDiscountCodes !== 'denied')
        getDatas();
  }, [page_num, row_count,sort_column, sort_method]);
  const cellList = [ 
    {key : 'codename' , field : 'Nom'}, 
    {key : 'customer_type' , field : 'Catégorie'},
    {key : 'discount_amount' , field : 'Réduction'}, 
    {key : 'start_date' , field : 'Début'},
    {key : 'end_date' , field : 'Fin'},
    {key : 'amount_times' , field : 'Activations'},
    {key : 'status' , field : 'Statut'}
  ];
  const columns = [];
  for(let i = 0; i < 7; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/admin/discountcodes/edit/'+id);
  };
  const handleClickDelete = (id)=>{
    if(accessDiscountCodes === 'edit'){
      setOpenDelete(true);
      setDeleteId(id);
    }else{
      setOpenDialog(true);
    }
  };
  const handleDelete = ()=>{
    handleCloseDelete();
    setDeleteId(-1);
    AdminService.deleteUser(deleteId)
    .then(      
      response => {        
        // setVisibleIndicator(false);
        switch(response.data.code){
          case 200:

            break;
          case 401:
            authService.logout();
            history.push('/login');
            window.location.reload();
            break;
          default:
            // ToastsStore.error(response.data.message);
        }
      },
      error => {
        // setVisibleIndicator(false);
      }
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.titleText}>
                <b>Mes Codes Promo</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton name = {"Nouveau code"} color={"1"} onClick={handleClickAdd}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} >
                  <Grid xs={12} item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid xs={12} item ><p id="transition-modal-title" className={classes.modalTitle}><b>Nouveau Code Promo</b></p></Grid>
                </Grid>
                <AddDiscountCode onCancel={handleClose} onAdd={handleAdd}/>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div> 
      <div className={classes.body}>
        <MyDialog open={openDialog} role={accessDiscountCodes} onClose={handleCloseDialog}/>
        <MyTable 
          onChangeSelect={handleChangeSelect} 
          onChangePage={handleChangePagination} 
          onSelectSort={handleSort} 
          page={page_num} 
          columns={columns} 
          products={dataList} 
          totalpage={totalpage} 
          cells={cellList} 
          onClickEdit={handleClickEdit}
          onClickDelete={handleClickDelete}
          access={accessDiscountCodes}
        />
      </div>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(DiscountCodes);
