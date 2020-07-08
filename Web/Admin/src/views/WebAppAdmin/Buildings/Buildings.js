import React, { useState, useEffect } from 'react';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
import MyTable from '../../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import MyDialog from '../../../components/MyDialog';
import CloseIcon from '@material-ui/icons/Close';
import AddBuilding from './AddBuilding';
import {  withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AdminService from '../../../services/api.js';
import MySelect from '../../../components/MySelect';
import useStyles from './useStyles';

const Buildings = (props) => {
  const {history}=props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessBuildings = authService.getAccess('role_buildings');  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId,setDeleteId] = useState(-1);
  const [footerItems, setFooterItems] = useState([]);
  let company = [];
  const [companies, setCompanies] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [totalpage , setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num , setPageNum] = useState(1);
  const [companyID, setCompanyID] = useState(-1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method , setSortMethod] = useState('asc');
  const selectList=[20, 50, 100, 200, -1];
  const cellList = [ 
    {key : 'name' , field : 'Nom'}, 
    {key : 'address' , field : 'Adresse'},
    {key : 'account_IBAN' , field : 'CA HT'}, 
  ];

  const columns = [];
  for(let i = 0; i < 3; i++)
    columns[i] = 'asc';
    
  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/admin/buildings/edit/'+id);
  }
  const handleChangeSelect = (value) => {
    setRowCount(selectList[value]);
  }
  const handleChangeCompanies = (val) =>{
    setCompanies(val);
    if(val < companyList.length)
      setCompanyID(companyList[val].companyID);
    else
      setCompanyID(-1);
  };
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
    ToastsStore.success('Add new building successfully!');
    getBuildings();
  };
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
          if(!data.totalpage)
            setTotalPage(1);
          else 
            setTotalPage(data.totalpage);
          setDataList(data.buildinglist);
          let amount = 0;

          const  items = ['Total',data.totalcount,amount];
          setFooterItems(items);
        }
      },
      error => {
        console.log('fail');        
        // setVisibleIndicator(false);
      }
    );
  }
  const handleClickDelete = (id)=>{
    if(accessBuildings === 'Edit'){
      setOpenDelete(true);
      setDeleteId(id);
    }else{
      setOpenDialog(true);
    }
  };
  useEffect(()=>{
    if(accessBuildings === 'Denied'){
      setOpenDialog(true);
    }else{
      getCompanies();
    }
  },[accessBuildings]);
  useEffect(() => {
    if(accessBuildings !== 'Denied')
        getBuildings();
  }, [page_num, row_count,sort_column, sort_method, companyID]);



  const handleDelete = ()=>{
    handleCloseDelete();
    setDeleteId(-1);
    AdminService.deleteUser(deleteId)
    .then(      
      response => {        
        console.log(response.data);
        // setVisibleIndicator(false);  
        if(response.data.code !== 200){
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
              <Typography variant="h2" className={classes.titleText}>
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
                  <Grid xs={12} item ><p id="transition-modal-title" className={classes.modalTitle}><b>Nouvel immmeuble</b></p></Grid>
                </Grid>
                <AddBuilding  onCancel={handleClose} onAdd={handleAdd}/>
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
                      data={company} 
                      onChangeSelect={handleChangeCompanies}
                      value={companies}
                  />
                </Grid>
              </Grid>
          </Grid>
        </Grid>
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
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(Buildings);
