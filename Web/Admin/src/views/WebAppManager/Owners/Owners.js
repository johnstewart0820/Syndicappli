import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import SelectTable from '../../../components/SelectTable';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ManagerService as Service } from '../../../services/api.js';
import MySelect from '../../../components/MySelect';
import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import DeleteConfirmDialog from 'components/DeleteConfirmDialog';
const ManagerService = new Service();
const Owners = (props) => {
  const { history } = props;

  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }

  const accessOwners = authService.getAccess('role_owners');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);

  const [company, setCompany] = useState([]);
  const [companyID, setCompanyID] = useState(-1);

  const [building, setBuilding] = useState([]);
  const [buildings, setBuildings] = useState('');
  const [buildingList, setBuildingList] = useState([]);
  const [buildingID, setBuildingID] = useState(-1);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [deleteId, setDeleteId] = useState(-1);
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num, setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method, setSortMethod] = useState('asc');
  const [role, setRole] = useState(0);
  const selectList = [20, 50, 100, 200, -1];
  const roleList = ['Tout', 'Copropriétaire', 'Sous-compte', 'member of the council'];
  const owner_role = ['all', 'owner', 'subaccount', 'member'];

  const handleChangeBuildings = (val) => {
    setBuildings(val);
    setBuildingID(buildingList[val].buildingID);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
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
  const handleChangeRoles = (value) => {
    setRole(value);
    console.log(roleList[role])
  }
  useEffect(() => {
    getCompanies()
  }, [accessOwners]);
  useEffect(() => {
    if (accessOwners !== 'denied') {
      getBuildings();
    }
  }, [companyID]);
  useEffect(() => {
    if (accessOwners !== 'denied') {
      getOwners();
    }
  }, [page_num, row_count, sort_column, sort_method, buildingID, role, props.refresh]);
  useEffect(() => {
    getOwners();
  }, [buildingList])
  const cellList = [
    { key: 'lastname', field: 'Nom' },
    { key: 'firstname', field: 'Prénom' },
    { key: 'email', field: 'Email' },
    { key: 'phone', field: 'Téléphone' },
    { key: 'owner_role', field: 'Role' },
    { key: 'count', field: 'Lot' }
  ];
  const columns = [];
  for (let i = 0; i < 6; i++)
    columns[i] = 'asc';
  const handleClickEdit = (id, buildingid) => {
    history.push('/manager/owners/edit?id=' + id + '&&buildingID=' + buildingid);
  };
  const handleClickDelete = (id, buildingID) => {
    setOpenDelete(true);
    setDeleteId(id);
  };
  const handleClickAllSelect = () => {
  }
  const handleClickImport = () => {
    // setPageNum();
  }
  const handleClickExport = () => {
    // setPageNum();
  }
  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data = {
      'status': 'trash'
    }
    ManagerService.deleteOwner(deleteId, data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              getOwners();
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
          ToastsStore.error('Cant connect to the server!');
          setVisibleIndicator(false);
        }
      );
  }
  const getBuildings = () => {
    const requestData = {
      'companyID': companyID
    }
    setVisibleIndicator(true);
    ManagerService.getBuildingListByCompany(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              building.splice(0, building.length);
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              building.push('Tout');
              data.buildinglist.map((item) => (
                building.push(item.name)
              )
              );
              setBuilding(building);
              setBuildingList([{ 'buildingID': -1 }, ...data.buildinglist]);
              setBuildings(0);
              setBuildingID(-1);
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
  const getOwners = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'role': owner_role[role],
      'buildingID': buildingID,
      'companyID': companyID,
      'status': 'active'
    }
    setVisibleIndicator(true);
    ManagerService.getOwnerList(requestData)
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
              setDataList(data.ownerlist);
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
      <div className={classes.tool}>
        <Grid container spacing={2} direction="column">
          <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
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
          <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Rôle</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect
                  color="gray"
                  data={roleList}
                  onChangeSelect={handleChangeRoles}
                  value={role}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.body}>
        <SelectTable
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
          onImport={handleClickImport}
          onExport={handleClickExport}
          access={accessOwners}
          type="owner"
        />
      </div>
      <DeleteConfirmDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        account={'owner'}
      />
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />

    </>
  );
};

export default withRouter(Owners);
