import React, { useState, useEffect } from 'react';
import OrderTable from './OrderTable';
import authService from '../../../../services/authService.js';
import MyDialog from '../../../../components/MyDialog';
import AdminService from '../../../../services/api.js';
import { withRouter } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../../components/MyButton';
import MySelect from '../../../../components/MySelect';
import {
  Budget,
  LatestSales,
} from '../components';
import CurveChart from '../components/CurveChart';

const OrdersManager = (props) => {
  const { history } = props;

  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }
  const accessOrders = authService.getAccess('role_orders');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [company, setCompany] = useState(0);
  const [building, setBuilding] = useState(0);
  const [product, setProduct] = useState(0);
  const [period, setPeriod] = useState(0);
  const [deleteId, setDeleteId] = useState(-1);
  const [open, setOpen] = React.useState(false);
  const [dataList, setDataList] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num, setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method, setSortMethod] = useState('asc');
  const selectList = [20, 50, 100, 200, -1];
  const companyList = ['', 20, 50, 100];
  const buildingList = ['', 20, 50, 100];
  const productList = ['', 20, 50, 100];
  const periodList = ['', 'last 7 days', 'last 30 days', 'last 90 days', 'last year']

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
  const handleAdd = () => {

  };
  const handleClickExport = () => {
    if (accessOrders === 'edit') {
      setOpen(true);
    }
    if (accessOrders === 'see') {
      setOpenDialog(true);
    }
  };
  const handleChangeCompany = (value) => {
    setCompany(value);
  }
  const handleChangeBuilding = (value) => {
    setBuilding(value);
  }
  const handleChangeProduct = (value) => {
    setProduct(value);
  }
  const handleChangePeriod = (value) => {
    setPeriod(value);
  }
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
  useEffect(() => {
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { userID: 1, order_number: 'Cheese', customer_name: 4.9 },
      { userID: 2, order_number: 'Milk', customer_name: 1.9 },
      { userID: 3, order_number: 'Yoghurt', customer_name: 2.4 },
      { userID: 4, order_number: 'Heavy Cream', customer_name: 3.9 },
    ])
  }
  const cellList = [
    { key: 'order_number', field: 'Commande #' },
    { key: 'customer_name', field: 'Client' },
    { key: 'order_date', field: 'Date' },
    { key: 'total', field: 'Total' },
    { key: 'payment_status', field: 'Paiement' },
    { key: 'date_of_next_payment', field: 'Prochain paiement' },
    { key: 'order_status', field: 'Statut' },
  ];
  const getDatas = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method
    }
    AdminService.getUserList(requestData)
      .then(
        response => {
          console.log(response.data);
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
          console.log('fail');
          // setVisibleIndicator(false);
        }
      );
  }
  useEffect(() => {
    if (accessOrders === 'denied') {
      setOpenDialog(true);
    }
  });
  useEffect(() => {
    //  getDataList();
    if (accessOrders !== 'denied')
      getDatas();
  }, [page_num, row_count, sort_column, sort_method]);

  const columns = [];
  for (let i = 0; i < 2; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/admin/orders/edit/' + id);
  };
  const handleClickDownload = (id)=>{

  }
  const handleClickDelete = (id) => {
    if (accessOrders === 'edit') {
      setOpenDelete(true);
      setDeleteId(id);
    } else {
      setOpenDialog(true);
    }
  };
  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    AdminService.deleteUser(deleteId)
      .then(
        response => {
          console.log(response.data);
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
          console.log('fail');
          // setVisibleIndicator(false);
        }
      );
  }
  return (
    <Grid item container spacing={3} direction="column">
      <Grid item></Grid>
      <Grid item container spacing={2} direction="row-reverse" >
        <Grid item>
          <MySelect
            color="gray"
            width="239px"
            data={periodList}
            value={period}
            onChangeSelect={handleChangePeriod}
          />
        </Grid>
        <Grid item>
          <MySelect
            color="gray"
            width="239px"
            data={productList}
            value={product}
            onChangeSelect={handleChangeProduct}
          />
        </Grid>
        <Grid item>
          <MySelect
            color="gray"
            width="239px"
            data={buildingList}
            value={building}
            onChangeSelect={handleChangeBuilding}
          />
        </Grid>
        <Grid item>
          <MySelect
            color="gray"
            width="239px"
            data={companyList}
            value={company}
            onChangeSelect={handleChangeCompany}
          />
        </Grid>
      </Grid>
      <Grid item
        container
        justify="space-between"
      >
        <Grid item sm={3} container direction="column" justify="space-between">
          <Grid item>
            <Budget title="COMMANDES" body="924" pro="3.48%" tail="en 1 mois" income={2} color={"#2DCE9C"} />
          </Grid>
          <Grid item>
            <Budget title="REVENUS" body="53 456€ HT" pro="1.17%" tail="en 1 mois" income={1} color={"#FC5555"} />
          </Grid>
        </Grid>
        <Grid item sm={4} container alignItems="stretch" >
          <LatestSales />
        </Grid>
        <Grid item sm={4} container alignItems="stretch">
          <CurveChart />
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 48 }}>
        <MyButton name={"Exporter les factures"} color={"1"} onClick={handleClickExport} />
      </Grid>
      <MyDialog open={openDialog} role={accessOrders} onClose={handleCloseDialog} />
      <OrderTable
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
        onClickDownload={handleClickDownload}
        access={accessOrders}
      />
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
    </Grid>
  );
};

export default withRouter(OrdersManager);
