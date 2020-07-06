import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import MySelect from '../../components/MySelect';
import CloseIcon from '@material-ui/icons/Close';
import AddOwner from './AddOwner';
import { withRouter } from 'react-router-dom';
import authService from '../../services/authService.js';
import MyDialog from '../../components/MyDialog';
import AdminService from '../../services/api.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './useStyles';

const Owners = (props) => {
  const {history}=props;
  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/login");
  //   window.location.reload();
  // }
  const accessOwners = authService.getAccess('role_owners');

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
    if(accessOwners === 'Edit'){
      setOpen(true);
    }
    if(accessOwners === 'See'){
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
        console.log(response.data);
        // setVisibleIndicator(false);  
        if(response.data.code !== 200){
          console.log('error');
        } else {
          console.log('success');
          const data = response.data.data;
          localStorage.setItem("token", JSON.stringify(data.token));

          setTotalPage(data.totalpage);
          setDataList(data.userlist);
        }
      },
      error => {
        console.log('fail');        
        // setVisibleIndicator(false);
      }
    );
  }
  useEffect(()=>{
    if(accessOwners === 'Denied'){
      setOpenDialog(true);
    }
  },[]);
  useEffect(() => {
    // getDataList();
    if(accessOwners !== 'Denied')
        getDatas();
  }, [page_num, row_count,sort_column, sort_method]);
  const cellList = [ 
    {key : 'lastname' , field : 'Nom'}, 
    {key : 'firstname' , field : 'Prénom'},
    {key : 'email' , field : 'Email'}, 
    {key : 'phone' , field : 'Téléphone'},
    {key : 'role' , field : 'Role'},
    {key : 'lot' , field : 'Lot'}
  ];
  const columns = [];
  for(let i = 0; i < 6; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/owners/edit/'+id);
  };
  const handleClickDelete = (id)=>{
    if(accessOwners === 'Edit'){
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
        console.log(response.data);
        // setVisibleIndicator(false);  
        if(response.data.code !== 200){
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
          getDatas();
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
              <Typography variant="h2" className={classes.titleText}>
                <b>Mes Copropriétaires</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton name = {"Nouveau copropriétaire"} color={"1"} onClick={handleClickAdd}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} justify="space-between">
                  <Grid item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid item><h2 id="transition-modal-title" className={classes.modalTitle}>Nouveau Copropriétaire</h2></Grid>
                </Grid>
                <AddOwner  onCancel={handleClose} onAdd={handleAdd}/>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      <Grid container spacing={2} direction="column">
        <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Carbinet</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect 
                    color="gray" 
                    data={selectList} 
                    // onChangeSelect={handleChangeCompanies}
                    // value={companies}
                />
              </Grid>
            </Grid>
        </Grid>
        <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Immeuble</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect 
                    color="gray" 
                    data={selectList} 
                    // onChangeSelect={handleChangeBuildings}
                    // value={buildings}
                />
              </Grid>
            </Grid>
        </Grid>
        <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Rôle</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect 
                    color="gray" 
                    data={selectList} 
                    // onChangeSelect={handleChangeBuildings}
                    // value={buildings}
                />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      </div> 
      <div className={classes.body}>
        <MyDialog open={openDialog} role={accessOwners} onClose={handleCloseDialog}/>
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

export default withRouter(Owners);
