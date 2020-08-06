import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import authService from 'services/authService.js';
import { ManagerService as Service } from 'services/api.js';
import MySelect from 'components/MySelect';
import useStyles from './useStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResolutionTable from './component/ResolutionTable';
import useGlobal from 'Global/global';
import DeleteConfirmDialog from 'components/DeleteConfirmDialog';

const ManagerService = new Service();

const Resolutions = (props) => {
  const { history } = props;
  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  const accessAssemblies = authService.getAccess('role_assemblies');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
  const [globalState, globalActions] = useGlobal();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(-1);
  const [dataList, setDataList] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [row_count, setRowCount] = useState(20);
  const [page_num, setPageNum] = useState(1);
  const [sort_column, setSortColumn] = useState(-1);
  const [sort_method, setSortMethod] = useState('asc');
  const selectList = [20, 50, 100, 200, -1];
  const cellList = [
    { key: 'name', field: 'N°' },
    { key: 'title', field: 'Titre' },
    { key: 'vote_branch', field: 'Clef de répartition' },
    { key: 'calc_mode', field: 'Type de majorité' },
    { key: 'result', field: 'Résultat' },
  ];

  const columns = [];
  for (let i = 0; i < 5; i++)
    columns[i] = 'asc';

  const handleClickEdit = (id) => {
    globalActions.setResolutionID(id);
  }
  useEffect(() => {
    if (accessAssemblies !== 'denied')
      getDecisions();
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
    let data = {
      'status': 'trash'
    }
    ManagerService.deleteDecision(deleteId, data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              getDecisions();
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
  const getDecisions = () => {
    setDataList([
      {ID : 1, name: 'asd', title: 'asdf', vote_branch: 'vote1', calc_mode: 'simple', result: 'ok'},
      {ID : 2, name: 'asd', title: 'asdf', vote_branch: 'vote1', calc_mode: 'simple', result: 'ok'},
      {ID : 3, name: 'asd', title: 'asdf', vote_branch: 'vote1', calc_mode: 'simple', result: 'ok'},
      {ID : 4, name: 'asd', title: 'asdf', vote_branch: 'vote1', calc_mode: 'simple', result: 'ok'},
    ])
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'status': 'active'
    }
    // setVisibleIndicator(true);
    ManagerService.getDecisionList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));

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
    <div>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
      <div className={classes.title}>
      </div>
      <div >
        <ResolutionTable
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
          access={accessAssemblies}
        />
      </div>
      <DeleteConfirmDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        account={'decision'}
      />
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(Resolutions);
