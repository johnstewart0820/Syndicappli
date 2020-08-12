import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import InvoiceTable from '../../../../../components/InvoiceTable';
import MySelect from '../../../../../components/MySelect';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import authService from '../../../../../services/authService.js';
import { makeStyles } from '@material-ui/styles';
import { ManagerService as Service } from 'services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
const ManagerService = new Service();
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  titleText: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 35
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 25
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 18
    },
  },
  tool: {
    paddingTop: 30,
    paddingBottom: 65,
    [theme.breakpoints.up('xl')]: {
      minHeight: 60
    },
    [theme.breakpoints.down('lg')]: {
      minHeight: 42
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 29
    },
  },

  close: {
    cursor: 'pointer',
    color: 'gray'
  }
}));
const InvoiceAddons = (props) => {
  const { history } = props;
  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }

  const classes = useStyles();
  const accessInvoices = authService.getAccess('role_invoices');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [dataList, setDataList] = useState([]);
  const [building, setBuilding] = useState(0);
  const [buildings, setBuildings] = useState([]);
  const [buildingID, setBuildingID] = useState(-1);
  const [companyID, setCompanyID] = useState(-1);
  const [buildingList, setBuildingList] = useState([]);
  const cellList = [
    { key: 'addon_bundle_name', field: 'Produit' },
    { key: 'building', field: 'Immeuble' },
    { key: 'purchase_date', field: 'Date' },
    { key: 'invoice_total', field: 'Montant' },
  ];
  const handleClickEdit = (id) => {
    console.log(id);
    // history.push('/manager/buildings/edit/'+id);
  }
  const getDataList = () => {
    setDataList([
      { ID: 1, addon_bundle_name: 'Pack modules', building: 'Résidence les Pinsons bleus', purchase_date: '12/03/2020', invoice_total: '4.90€ TTC' },
      { ID: 21, addon_bundle_name: 'Pack modules', building: '7 rue Berlioz, 75012 Paris', purchase_date: '12/03/2020', invoice_total: '4.90€ TTC' },
      { ID: 23, addon_bundle_name: 'Pack modules', building: '33 avenue du Général de Gaulle,78200 Meaux', purchase_date: '12/03/2020', invoice_total: '4.90€ TTC' },
    ])
  }
  useEffect(() => {
    if (accessInvoices !== 'denied') {
      getCompanies();
    }
  }, [accessInvoices]);
  useEffect(() => {
    if (companyID !== -1)
      getBuildings();
  }, [companyID]);
  useEffect(() => {
    if (accessInvoices !== 'denied') {
      if (buildingID !== -1)
        getDataList();
    }
  }, [buildingID])
  const getCompanies = () => {
    setVisibleIndicator(true);
    ManagerService.getCompanyListByUser()
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              data.companylist.map((item) => (
                setCompanyID(item.companyID)
              )
              );
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
  const getBuildings = () => {
    const requestData = {
      'search_key': '',
      'page_num': 0,
      'row_count': -1,
      'sort_column': -1,
      'sort_method': 'asc',
      'companyID': companyID,
      'status': 'active'
    }
    setVisibleIndicator(true);
    ManagerService.getBuildingList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              buildingList.splice(0, buildingList.length);
              buildings.splice(0, buildings.length)
              buildingList.push('')
              localStorage.setItem("token", JSON.stringify(data.token));
              data.buildinglist.map((item) => (
                buildings.push(item.name)
              )
              );
              setBuildingList(data.buildinglist);
              if (data.buildinglist.length !== 0) {
                setBuildings(buildings);
                setBuildingID(data.buildinglist[0].buildingID);
                // setBuildingName(data.buildinglist[0].name);
              }
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
  const handleChangeBuilding = (val) => {
    setBuilding(val);
    setBuildingID(buildingList[val].buildingID);
  }
  return (
    <div>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
      <div className={classes.tool}>
        <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
          <Grid item ><p className={classes.subTitle}>Immeuble</p></Grid>
          <Grid xs item container direction="row-reverse">
            <Grid item container direction="column" alignItems="stretch">
              <MySelect
                color="gray"
                data={buildings}
                onChangeSelect={handleChangeBuilding}
                value={building}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.body}>
        <InvoiceTable
          products={dataList}
          cells={cellList}
          onClickEdit={handleClickEdit}
          columns={4}
        />
      </div>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(InvoiceAddons);
