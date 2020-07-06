import React, { useState, useEffect } from 'react';
import MyTable from '../../../components/MyTable';
import authService from '../../../services/authService.js';
import MyDialog from '../../../components/MyDialog';
import AdminService from '../../../services/api.js';
import { withRouter } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const ProductsOwner = (props) => {
  const {history} = props;

  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/login");
  //   window.location.reload();
  // }

  const accessProducts = authService.getAccess('role_products');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [deleteId,setDeleteId] = useState(-1);
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
  const handleOpenDelete = () => {
    setOpenDelete(true);
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
    if(accessProducts === 'Edit'){
      setOpen(true);
    }
    if(accessProducts === 'See'){
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
      }
    );
  }
  useEffect(()=>{
    if(accessProducts === 'Denied'){
      setOpenDialog(true);
    }
  });
  useEffect(() => {
    // getDataList();
    if(accessProducts !== 'Denied')
        getDatas();
  }, [page_num, row_count,sort_column, sort_method]);
  const cellList = [ 
    {key : 'productname' , field : 'Nom'}, 
    {key : 'price' , field : 'Prix'},
  ];
  const columns = [];
  for(let i = 0; i < 2; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/products/edit/'+id);
  };
  const handleClickDelete = (id)=>{
    if(accessProducts === 'Edit'){
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
    <div>
        <div>
            <MyDialog open={openDialog} role={accessProducts} onClose={handleCloseDialog}/>
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

export default withRouter(ProductsOwner);
