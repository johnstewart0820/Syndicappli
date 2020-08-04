import React, { useState, useEffect } from 'react';
import OrderTable from './OrderTable';
import authService from '../../../../services/authService.js';
import AdminService from '../../../../services/api.js';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteConfirmDialog from 'components/DeleteConfirmDialog';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../../components/MyButton';
import MySelect from '../../../../components/MySelect';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import {
  Budget,
  LatestSales,
} from '../components';
import CurveChart from '../components/CurveChart';
import { OrdersManagerStyles as useStyles } from '../useStyles';
const OrdersManager = (props) => {
  const { history } = props;

  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  const accessOrders = authService.getAccess('role_orders');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
  const [company, setCompany] = useState(0);
  const [companyID, setCompanyID] = useState(-1);
  const [buildingID, setBuildingID] = useState(-1);
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
  const periodList = ['', 'les 7 derniers jours', 'les 30 derniers jours', 'les 90 derniers jours', 'la dernière année'];
  const en_periodList = ['', 'last 7 days', 'last 30 days', 'last 90 days', 'last year'];

  const handleClickExport = () => {
    if (accessOrders === 'edit') {
      setOpen(true);
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
    getBuyerList();
  }, []);
  useEffect(() => {
    getOrdersManager();
  }, [companyID]);
  const cellList = [
    { key: 'ID', field: 'Commande #' },
    { key: 'buyer_name', field: 'Client' },
    { key: 'start_date', field: 'Date' },
    { key: 'price_with_vat', field: 'Total' },
    { key: 'payment_status', field: 'Paiement' },
    { key: 'end_date', field: 'Prochain paiement' },
    { key: 'status', field: 'Statut' },
  ];
  useEffect(() => {
    if (accessOrders !== 'denied')
      getOrdersManager();
  }, [page_num, row_count, sort_column, sort_method, props.refresh]);

  const columns = [];
  for (let i = 0; i < 7; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id) => {
    history.push('/admin/orders/edit/' + id);
    window.location.reload();
  };
  const handleClickDownload = (id) => {

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
    let data = {
      'status': 'trash'
    }
    AdminService.deleteOrder(deleteId, data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              getOrdersManager();
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
  const getOrdersManager = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'status': 'active',
      'type': 'managers',
      'companyID': companyID,
      'buildingID': buildingID
    }
    setVisibleIndicator(true);
    AdminService.getOrderList(requestData)
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
              setDataList(data.orderlist);
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
  const getBuyerList = () => {
    let data = {
      'buyer_type': 'managers'
    }
    setVisibleIndicator(true);
    AdminService.getBuyerList(data)
      .then(
        async response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if (data.buyerlist.length !== 0) {
                if (data.buyerlist[0].companyID)
                  setCompanyID(data.buyerlist[0].companyID);
                if (data.buyerlist[0].buildingID)
                  setBuildingID(data.buyerlist[0].buildingID);
              }
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
  return (
    <Grid item container spacing={3} direction="column">
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
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
      <Grid item>
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
      </Grid>
      <DeleteConfirmDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        account={'product'}
      />
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </Grid>
  );
};

export default withRouter(OrdersManager);
