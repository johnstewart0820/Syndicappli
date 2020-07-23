import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MySelect from '../../../components/MySelect';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import TrashTable from 'components/TrashTable';

const TrashManagers = (props) => {
  const { history } = props;
  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }
  const accessManagers = authService.getAccess('role_managers');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [footerItems, setFooterItems] = useState([]);
  const [deleteId, setDeleteId] = useState(-1);
  const classes = useStyles();
  let company = [];
  const [companies, setCompanies] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [companyID, setCompanyID] = useState(-1);
  const [building, setBuilding] = useState([]);
  const [buildings, setBuildings] = useState('');
  const [buildingList, setBuildingList] = useState([]);
  const [buildingID, setBuildingID] = useState(-1);

  const [dataList, setDataList] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num, setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method, setSortMethod] = useState('asc');
  const selectList = [20, 50, 100, 200, -1];

  const handleChangeCompanies = (val) => {
    setCompanies(val);
    setCompanyID(companyList[val].companyID);
  };
  const handleChangeBuildings = (val) => {
    setBuildings(val);
    setBuildingID(buildingList[val].buildingID);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
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
  useEffect(() => {
    if (accessManagers === 'denied') {
      setOpenDialog(true);
    } else {
      getCompanies();
    }
  }, [accessManagers]);
  useEffect(() => {
    getBuildings();
  }, [companyID]);
  useEffect(() => {
    if (accessManagers === 'denied') {
      setOpenDialog(true);
    }
    if (accessManagers !== 'denied')
      getTrashManagers();
  }, [page_num, row_count, sort_column, sort_method, buildingID]);
  useEffect(()=>{
    getTrashManagers();
  },[buildingList])
  const cellList = [
    { key: 'lastname', field: 'Nom' },
    { key: 'firstname', field: 'Prénom' },
    { key: 'email', field: 'Email' },
    { key: 'connection', field: 'Connexions/mois' },
    { key: 'dailytime', field: 'Temps connexion/jour' },
    { key: 'apartment', field: 'Lots' },
    { key: '', field: ''}
  ];
  const columns = [];
  for (let i = 0; i < 6; i++)
    columns[i] = 'asc';
    const handleClickRestore = (id) => {
        let data={
            'status': 'active'
        }
      AdminService.deleteManager(id,data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Restored successfully!");
              getTrashManagers();
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

  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data={
        'status':'active'
    }
    AdminService.deleteUser(deleteId,data)
      .then(
        response => {
          console.log(response.data);
          setVisibleIndicator(false);
          if (response.data.code !== 200) {
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
          setVisibleIndicator(false);
        }
      );
  }
  const getTrashManagers = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'buildingID': buildingID,
      'companyID': companyID,
      'status' : 'trash'
    }
    setVisibleIndicator(true);
    AdminService.getManagerList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
                const data = response.data.data;
                localStorage.setItem("token", JSON.stringify(data.token));
                if(data.totalpage)
                    setTotalPage(data.totalpage);
                else
                    setTotalPage(1);
                setDataList(data.managerlist);
                let amount_connection = 0;
                const items = ['Total', '', data.totalcount, amount_connection, amount_connection, amount_connection];
                setFooterItems(items);
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
  const getCompanies = () => {
    setVisibleIndicator(true);
    AdminService.getCompanyListByUser()
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
                const data = response.data.data;
                localStorage.setItem("token", JSON.stringify(data.token));
                company.push('Tout');
                data.companylist.map((item) => (
                  company.push(item.name)
                )
                );
                setCompanyList([{ 'companyID': -1 }, ...data.companylist]);
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
      'companyID': companyID
    }
    setVisibleIndicator(true);
    AdminService.getBuildingListByCompany(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              building.splice(0,building.length);
              buildingList.splice(0,buildingList.length)
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              building.push('Tout');
              data.buildinglist.map((item) => (
                building.push(item.name)
              )
              );
              setBuilding(building);
              setBuildingList([{ buildingID: -1 }, ...data.buildinglist]);
              setBuildings(0);
              setBuildingID(-1)
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
  return (
    <>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
      <div className={classes.title}>
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
        <MyDialog open={openDialog} role={accessManagers} onClose={handleCloseDialog} />
        <TrashTable
          onChangeSelect={handleChangeSelect}
          onChangePage={handleChangePagination}
          onSelectSort={handleSort}
          page={page_num}
          columns={columns}
          products={dataList}
          totalpage={totalpage}
          cells={cellList}
          onClickRestore={handleClickRestore}
          tblFooter="true"
          footerItems={footerItems}
          access={accessManagers}
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
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </>
  );
};

export default withRouter(TrashManagers);
