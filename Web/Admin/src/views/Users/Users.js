import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import AddUser from './AddUser';
import MySelect from '../../components/MySelect';
import CloseIcon from '@material-ui/icons/Close';
import AdminService from '../../services/api.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),

  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  tool: {
    minHeight: '67px'
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
  close: {
    color: 'gray'
  }
}));
const Users = (props) => {
  const { history } = props;
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleAdd = ()=>{

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
  useEffect(() => {
    // getDataList();
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
        if(response.data.code != 200){
          // if(response.data.status === 'Token is Expired') {
          //   authService.logout();
          //   history.push('/');
          // }
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
        // const resMessage =
        //     (error.response &&
        //       error.response.data &&
        //       error.response.data.message) ||
        //     error.message ||
        //     error.toString();
      }
    );    
  }, [page_num, row_count,sort_column, sort_method]);
  const cellList = [ 
    {key : 'lastname' , field : 'Nom'}, 
    {key : 'firstname' , field : 'Prénom'},
    {key : 'email' , field : 'Email'}, 
    {key : 'phone' , field : 'Téléphone'}
  ];
  const columns = [];
  for(let i = 0; i < 4; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/users/edit/'+id);
  };
  const handleClickDelete = (id)=>{
    setOpenDelete(true);
    setDeleteId(id);
  };
  const handleDelete = ()=>{
    handleCloseDelete();
    setDeleteId(-1);
  }
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Mes Utilisateurs</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <div onClick={handleOpen}><MyButton name = {"Nouvel Utilisateur"} color={"1"}/></div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} >
                  <Grid xs={12} item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close}/></Grid>
                  <Grid xs={12} item ><p id="transition-modal-title" style={{fontSize:28}}><b>Nouvel Utilisateur</b></p></Grid>
                </Grid>
                <AddUser onCancel={handleClose} onAdd={handleAdd}/>
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

export default withRouter(Users);
