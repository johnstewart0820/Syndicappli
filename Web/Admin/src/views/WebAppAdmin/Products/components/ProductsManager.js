import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import MyTable from 'components/MyTable';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import authService from 'services/authService.js';
import {ProductsManagerStyles as useStyles} from '../useStyles';
import AdminService from 'services/api.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

const ProductsManager = (props) => {
  const { history } = props;
  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }
  const accessProducts = authService.getAccess('role_products');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(-1);
  const [dataList, setDataList] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num, setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method, setSortMethod] = useState('asc');
  const [isDisableDelete, setIsDisableDelete] = useState(true);
  const selectList = [20, 50, 100, 200, -1];
  const cellList = [
    { key: 'name', field: 'Nom' },
    { key: 'price', field: 'Prix' },
  ];

  const columns = [];
  for (let i = 0; i < 2; i++)
    columns[i] = 'asc';

  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/admin/products/edit/' + id);
  }
  useEffect(() => {
    if (accessProducts !== 'denied')
      getProductsManager();
  }, [page_num, row_count, sort_column, sort_method, props.refresh]);

  const handleChangeSelect = (value) => {
    setRowCount(selectList[value]);
  }
  const handleChangePagination = (value) => {
    setPageNum(value);
  }
  const handleSort = (index, direct) => {
    setSortColumn(index);
    setSortMethod(direct);
  }

  const handleClickDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data={
      'status':'trash'
    }
    AdminService.deleteProduct(deleteId,data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              getProductsManager();
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const getProductsManager = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'status': 'active',
      'type' : 'managers'
    }
    setVisibleIndicator(true);
    AdminService.getProductList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if (!data.totalpage)
                setTotalPage(1);
              else
                setTotalPage(data.totalpage);
              setDataList(data.productlist);
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          console.log('fail');
          setVisibleIndicator(false);
        }
      );
  }

  const inputTextChange = (event) => {
    console.log(event.target.value);
    if(event.target.value === "delete") {
      setIsDisableDelete(false);
    } else {
      setIsDisableDelete(true);
    }
  }

  return (
    <div>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
      <div className={classes.title}>
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
          access={accessProducts}
        />
      </div>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this company?
        </DialogTitle>
        <DialogContent>        
          <DialogContentText id="alert-dialog-description">
            Type <b style={{color: "red"}}>delete</b> into the text field
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"            
            type="text"
            fullWidth
            variant="outlined"
            onChange={inputTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button disabled={isDisableDelete} onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(ProductsManager);
