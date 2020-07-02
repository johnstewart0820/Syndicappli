import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import MySelect from '../../components/MySelect';
import MyDialog from '../../components/MyDialog';
import CloseIcon from '@material-ui/icons/Close';
import AddBuilding from './AddBuilding';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import authService from '../../services/authService.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AdminService from '../../services/api.js';
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
  }
}));
const Buildings = (props) => {
  const {history}=props;
  const token = authService.getToken();    
  if (!token) {
    history.push("/login");
    window.location.reload();
  }
  const accessBuildings = authService.getAccess('role_buildings');  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId,setDeleteId] = useState(-1);

  const [dataList, setDataList] = useState([]);
  const [totalpage , setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num , setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method , setSortMethod] = useState('asc');
  const selectList=[20, 50, 100, 200, -1];
  const cellList = [ 
    {key : 'lastname' , field : 'Nom'}, 
    {key : 'address' , field : 'Adresse'},
    {key : 'amount' , field : 'CA HT'}, 
  ];

  const columns = [];
  for(let i = 0; i < 3; i++)
    columns[i] = 'asc';
    
  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/buildings/edit/'+id);
  }
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
  const handleAdd = ()=>{

  };

  const handleClickDelete = (id)=>{
    if(accessBuildings == 'Edit'){
      setOpenDelete(true);
      setDeleteId(id);
    }else{
      setOpenDialog(true);
    }
  };
  useEffect(()=>{
    if(accessBuildings == 'Denied'){
      setOpenDialog(true);
    }
  });
  useEffect(() => {
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { id: 1, lastname: 'Cheese', address: 4.9, amount: 20 },
      { id: 2, lastname: 'Milk', address: 1.9, amount: 32 },
      { id: 3, lastname: 'Yoghurt', address: 2.4, amount: 12 },
      { id: 4, lastname: 'Heavy Cream', address: 3.9, amount: 9 },
      { id: 5, lastname: 'Butter', address: 0.9, amount: 99 },
      { id: 6, lastname: 'Sour Cream ', address: 2.9, amount: 86 },
      { id: 7, lastname: 'Fancy French Cheese 🇫🇷', address: 99, amount: 12 },
      { id: 8, lastname: 'Cheese', address: 4.9, amount: 20 },
      { id: 9, lastname: 'Milk', address: 1.9, amount: 32 },
      { id: 10, lastname: 'Yoghurt', address: 2.4, amount: 12 },
    ])
  }

    let amount = 0;
    for(let i = 0; i < dataList.length; i++)
      amount += dataList[i].amount;
  const  footerItems = ['Total',dataList.length,amount];

  const handleDelete = ()=>{
    handleCloseDelete();
    setDeleteId(-1);
    AdminService.deleteUser(deleteId)
    .then(      
      response => {        
        console.log(response.data);
        // setVisibleIndicator(false);  
        if(response.data.code != 200){
          // if(response.data.status === 'Token is Expired') {
          //   authService.logout();
          //   history.push('/');
          // }
          console.log('error');
        } else {
          console.log('success');
          alert('Deleted successful');
          const data = response.data.data;
          localStorage.setItem("token", JSON.stringify(data.token));
        }
      },
      error => {
        console.log('fail');        
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
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Mes Immeubles</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton name = {"Nouvel Immeubles"} color={"1"}  onClick={handleOpen}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} >
                  <Grid xs={12} item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid xs={12} item ><p id="transition-modal-title" style={{fontSize:28}}><b>Nouvel immmeuble</b></p></Grid>
                </Grid>
                <AddBuilding  onCancel={handleClose} onAdd={handleAdd}/>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div> 
      <div className={classes.body}>
      <MyDialog open={openDialog} role={accessBuildings} onClose={handleCloseDialog}/>
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
          tblFooter = "true"
          footerItems = {footerItems}
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

export default withRouter(Buildings);
