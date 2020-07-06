import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddCompany from './AddCompany';
import MyButton from '../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import authService from '../../services/authService.js';
import useStyles from './useStyles';

const Companies = (props) => {
  const {history}=props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/login");
  //   window.location.reload();
  // }
  const accessCompanies = authService.getAccess('role_companies');
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId,setDeleteId] = React.useState(-1);
  const [dataList, setDataList] = useState([]);
  const [totalpage , setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num , setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method , setSortMethod] = useState('asc');
  const selectList=[20, 50, 100, 200, -1];
  const cellList = [ 
    {key : 'name' , field : 'Nom'}, 
    {key : 'contact' , field : 'Contact'},
    {key : 'email' , field : 'Email'}, 
    {key : 'phone' , field : 'Téléphone'},
    {key : 'managers' , field : 'Gestionnaires'},
    {key : 'lots' , field : 'Lots'},
  ];

  const columns = [];
  for(let i = 0; i < cellList.length; i++)
    columns[i] = 'asc';
  
  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/companies/edit/'+id);
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = ()=>{

  };

  useEffect(() => {
    console.log('a');
  });
  useEffect(() => {
    console.log('b');
    getDataList();
  }, []);

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

  const handleClickDelete = (id)=>{
    setOpenDelete(true);
    setDeleteId(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDelete = ()=>{
    handleCloseDelete();
    setDeleteId(-1);
  }
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
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.titleText}>
                <b>Mes Cabinets</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton   name={"Nouveau Cabinet"} color={"1"} onClick={handleOpen}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} justify="space-between">
                  <Grid item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid item><p id="transition-modal-title" className={classes.modalTitle}><b>Nouveau Cabinet</b></p></Grid>
                </Grid>
                <AddCompany  onCancel={handleClose} onAdd={handleAdd}/>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div> 
      <div className={classes.body}>
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

export default withRouter(Companies);
