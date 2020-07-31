import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import SelectTable from '../../../components/SelectTable';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import { ManagerService as Service } from '../../../services/api.js';
import useStyles from './useStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteConfirmDialog from 'components/DeleteConfirmDialog';
const ManagerService = new Service();
const Buildings = (props) => {
  const { history } = props;
  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  const accessBuildings = authService.getAccess('role_buildings');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const [dataList, setDataList] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num, setPageNum] = useState(1);
  const [companyID, setCompanyID] = useState(-1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method, setSortMethod] = useState('asc');
  const selectList = [20, 50, 100, 200, -1];
  const cellList = [
    { key: 'name', field: 'Nom' },
    { key: 'address', field: 'Adresse' },
  ];

  const columns = [];
  for (let i = 0; i < 2; i++)
    columns[i] = 'asc';

  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/manager/buildings/edit/' + id);
    window.location.reload();
  }
  const handleChangeSelect = (value) => {
    setRowCount(selectList[value]);
  }
  const handleClickAllSelect = () => {

  }
  const handleClickImport = () => {
    // setPageNum();
  }
  const handleClickExport = (data) => {
    // setPageNum();
    console.log(data);
  }

  const handleChangePagination = (value) => {
    setPageNum(value);
  }
  const handleSort = (index, direct) => {
    setSortColumn(index);
    setSortMethod(direct);
  }
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
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
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
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
              localStorage.setItem("token", JSON.stringify(data.token));
              if (!data.totalpage)
                setTotalPage(1);
              else
                setTotalPage(data.totalpage);
              setDataList(data.buildinglist);
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
  const handleClickDelete = (id, buildingID) => {
    setOpenDelete(true);
    setDeleteId(id);
  };
  useEffect(() => {
    getCompanies();
  }, [accessBuildings]);
  useEffect(() => {
    if (accessBuildings !== 'denied')
      getBuildings();
  }, [page_num, row_count, sort_column, sort_method, companyID, props.refresh]);

  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data = {
      'status': 'trash'
    }
    ManagerService.deleteBuilding(deleteId, data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success('Deleted successfully!');
              getBuildings();
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

  return (
    <>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
      <div className={classes.title}></div>
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
          access={accessBuildings}
        />
      </div>
      <DeleteConfirmDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        account={'building'}
      />
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </>
  );
};

export default withRouter(Buildings);
