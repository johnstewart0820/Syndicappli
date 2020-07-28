import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import MyTable from '../../../components/MyTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
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
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dataList, setDataList] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num, setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method, setSortMethod] = useState('asc');
  const selectList = [20, 50, 100, 200, -1];
  const [isDisableDelete, setIsDisableDelete] = useState(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
  const handleAdd = () => {

  };
  const handleClickAdd = () => {
    if (accessDiscountCodes === 'edit') {
      setOpen(true);
    }
    if (accessDiscountCodes === 'see') {
      setOpenDialog(true);
    }
  };
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
  const getDatas = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'status': 'active'
    }
    setVisibleIndicator(true);
    AdminService.getDiscountCodesList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if (!data.totalpage)
                setTotalPage(1);
              else
                setTotalPage(data.totalpage);
              // setDataList(data.codelist);
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
          setVisibleIndicator(false);
          ToastsStore.error("Can't connect to the server.");
        }
      );
  }
  useEffect(() => {
    if (accessDiscountCodes === 'denied') {
      setOpenDialog(true);
    }
  });
  useEffect(() => {
    if (accessDiscountCodes !== 'denied')
      getDatas();
  }, [page_num, row_count, sort_column, sort_method, props.refresh]);
  const cellList = [
    { key: 'codename', field: 'Nom' },
    { key: 'customer_type', field: 'Catégorie' },
    { key: 'discount_amount', field: 'Réduction' },
    { key: 'start_date', field: 'Début' },
    { key: 'end_date', field: 'Fin' },
    { key: 'amount_times', field: 'Activations' },
    { key: 'status', field: 'Statut' }
  ];
  const columns = [];
  for (let i = 0; i < 7; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/admin/discountcodes/edit/' + id);
  };
  const handleClickDelete = (id) => {
    if (accessDiscountCodes === 'edit') {
      setOpenDelete(true);
      setDeleteId(id);
    } else {
      setOpenDialog(true);
    }
  };
  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data = {
      'status': 'trash'
    }
    AdminService.deleteDiscountCode(deleteId, data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              getDatas();
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
  const inputTextChange = (event) => {
    console.log(event.target.value);
    if (event.target.value === "delete") {
      setIsDisableDelete(false);
    } else {
      setIsDisableDelete(true);
    }
  }
  return (
    <>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
      <div className={classes.tool}>
      </div>
      <div className={classes.body}>
        <MyDialog open={openDialog} role={accessDiscountCodes} onClose={handleCloseDialog} />
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
          Are you sure to delete this building?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Type <b style={{ color: "red" }}>delete</b> into the text field
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
    </>
  );
};

export default withRouter(DiscountCodes);
