import React, { useState, useEffect } from 'react';
import MyTable from '../../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import MySelect from '../../../components/MySelect';
import CloseIcon from '@material-ui/icons/Close';
import AddManager from './AddManager';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import MyDialog from '../../../components/MyDialog';
import AdminService from '../../../services/api.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './useStyles';
const Managers = (props) => {
  const {history}=props;
  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessManagers = authService.getAccess('role_managers');

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [footerItems, setFooterItems] = useState([]);
  const [deleteId,setDeleteId] = useState(-1);
  const classes = useStyles();
  let company = [];
  const [companies, setCompanies] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [companyID, setCompanyID] = useState(-1);

  let building = [];
  const [buildings, setBuildings] = useState('');
  const [buildingList, setBuildingList] = useState([]);
  const [buildingID, setBuildingID] = useState(-1);

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
  const handleChangeCompanies = (val) =>{
    setCompanies(val);
    if(val < companyList.length)
      setCompanyID(companyList[val].companyID);
    else
      setCompanyID(-1);
  };
  const handleChangeBuildings = (val) =>{
    setBuildings(val);
    if(val < buildingList.length)
      setBuildingID(buildingList[val].buildingID);
    else
      setBuildingID(-1);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
  const handleAdd = ()=>{

  };
  const handleClickAdd = ()=>{
    if(accessManagers === 'Edit'){
      setOpen(true);
    }
    if(accessManagers === 'See'){
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
  useEffect(()=>{
    if(accessManagers === 'Denied'){
      setOpenDialog(true);
    }else{
      getCompanies();
    }
  },[accessManagers]);
  useEffect(() => {
    if(accessManagers === 'Denied'){
      setOpenDialog(true);
    }
    if(accessManagers !== 'Denied')
        getManagers();
  }, [page_num, row_count,sort_column, sort_method]);
  const cellList = [ 
    {key : 'lastname' , field : 'Nom'},
    {key : 'firstname' , field : 'Prénom'} ,
    {key : 'email' , field : 'Email'},
    {key : 'connection' , field : 'Connexions/mois'}, 
    {key : 'dailytime' , field : 'Temps connexion/jour'},
    {key : 'apartment' , field : 'Lots'}
  ];
  const columns = [];
  for(let i = 0; i < 5; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/admin/managers/edit/'+id);
  };
  const handleClickDelete = (id)=>{
    if(accessManagers === 'Edit'){
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
          // getDatas();
        }
      },
      error => {
        console.log('fail');        
        // setVisibleIndicator(false);
      }
    );
  }
  const getBuildings = ()=>{
    const requestData = {
      'search_key': '',
      'page_num' : page_num-1,
      'row_count' : row_count,
      'sort_column' : sort_column,
      'sort_method' : sort_method,
      'companyID' : companyID
    }
    AdminService.getBuildingList(requestData)
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
          data.buildinglist.map((item)=>(
            building.push(item.name)
          )
          );
          setBuildingList(data.buildinglist);
          setBuildingID(data.buildinglist[0].buildingID);
          building.push('all');
        }
      },
      error => {
        console.log('fail');        
        // setVisibleIndicator(false);
      }
    );
  }
  const getManagers = ()=>{
    const requestData = {
      'search_key': '',
      'page_num' : page_num-1,
      'row_count' : row_count,
      'sort_column' : sort_column,
      'sort_method' : sort_method,
      'companyID' : companyID,
      'buildingID' : buildingID
    }
    AdminService.getManagerList(requestData)
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
          setDataList(data.managerlist);
              let amount_connection = 0;
          const items = ['Total','',data.totalcount,amount_connection, amount_connection, amount_connection];
          setFooterItems(items);
        }
      },
      error => {
        console.log('fail');        
        // setVisibleIndicator(false);
      }
    );
  }
  const getCompanies = ()=>{
    AdminService.getCompanyListByUser()
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
          data.companylist.map((item)=>(
            company.push(item.name)
          )
          );
          setCompanyList(data.companylist);
          setCompanyID(data.companylist[0].companyID);
          company.push('all');
          getBuildings();
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
                <b>Mes Gestionnaires</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton name = {"Nouveau Gestionnaires"} color={"1"} onClick={handleClickAdd}/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} justify="space-between">
                  <Grid item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid item><h2 id="transition-modal-title" className={classes.modalTitle}>Nouveau Gestionnaires</h2></Grid>
                </Grid>
                <AddManager  onCancel={handleClose} onAdd={handleAdd}/>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      <Grid container spacing={2} direction="column">
        <Grid xs={10} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Carbinet</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect 
                    color="gray" 
                    data={company} 
                    onChangeSelect={handleChangeCompanies}
                    value={companies}
                />
              </Grid>
            </Grid>
        </Grid>
        <Grid xs={10} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Immeuble</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect 
                    color="gray" 
                    data={building} 
                    onChangeSelect={handleChangeBuildings}
                    value={buildings}
                />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      </div> 
      <div className={classes.body}>
        <MyDialog open={openDialog} role={accessManagers} onClose={handleCloseDialog}/>
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

export default withRouter(Managers);
