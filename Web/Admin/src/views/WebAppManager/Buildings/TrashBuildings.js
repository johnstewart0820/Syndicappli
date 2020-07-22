import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Dialog from '@material-ui/core/Dialog';
import MyDialog from '../../../components/MyDialog';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {ManagerService as Service} from '../../../services/api.js';
import useStyles from './useStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TrashTable from 'components/TrashTable';
const ManagerService = new Service();
const TrashBuildings = (props) => {
  const { history } = props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/login");
  //   window.location.reload();
  // }
  const accessBuildings = authService.getAccess('role_buildings');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
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
    { key: '', field: ''}
  ];

  const columns = [];
  for (let i = 0; i < 2; i++)
    columns[i] = 'asc';

    const handleClickRestore = (id) => {
      let data={
          'status': 'active'
      }
    ManagerService.deleteBuilding(id,data)
    .then(
      response => {
        setVisibleIndicator(false);
        switch(response.data.code){
          case 200:
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            ToastsStore.success("Restored successfully!");
            getTrashBuildings();
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
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
  const getCompanies = () => {
    setVisibleIndicator(true);
    ManagerService.getCompanyListByUser()
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
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
  const getTrashBuildings = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'companyID': companyID,
      'status': 'trash'
    }
    setVisibleIndicator(true);
    ManagerService.getBuildingList(requestData)
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
  const handleClickDelete = (id) => {
    if (accessBuildings === 'edit') {
      setOpenDelete(true);
      setDeleteId(id);
    } else {
      setOpenDialog(true);
    }
  };
  useEffect(() => {
    if (accessBuildings === 'denied') {
      setOpenDialog(true);
    } else {
      getCompanies();
    }
  }, [accessBuildings]);
  useEffect(() => {
    if (accessBuildings !== 'denied')
      getTrashBuildings();
  }, [page_num, row_count, sort_column, sort_method, companyID, props.refresh]);
  const handleChangeSelect = (value) => {
    setRowCount(selectList[value]);
  }
  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data={
      'status':'active'
    }
    ManagerService.deleteBuilding(deleteId,data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              console.log('success');
              alert('Deleted successful');
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
      <div className={classes.title}>
      </div>
      <div className={classes.tool}>
      </div>
      <div className={classes.body}>
        <MyDialog open={openDialog} role={accessBuildings} onClose={handleCloseDialog} />
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
          access={accessBuildings}
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

export default withRouter(TrashBuildings);
