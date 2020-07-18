import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import SelectTable from '../../../components/SelectTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import MyDialog from '../../../components/MyDialog';
import CloseIcon from '@material-ui/icons/Close';
import AddBuilding from './AddBuilding';
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
const ManagerService = new Service();
const Buildings = (props) => {
  const { history } = props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/manager/login");
  //   window.location.reload();
  // }
  const accessBuildings = authService.getAccess('role_buildings');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const [footerItems, setFooterItems] = useState([]);

  const [allSelect, setAllSelect] = useState(-1);
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
  for (let i = 0; i < 3; i++)
    columns[i] = 'asc';

  const handleClickEdit = (id) => {
    console.log(id);
    history.push('/manager/buildings/edit/' + id);
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
  const handleAdd = () => {
    ToastsStore.success('Add new building successfully!');
    getBuildings();
  };
  useEffect(() => {
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { ID: 1, name: 'Cheese', address: 4.9 },
      { ID: 21, name: 'Milk', address: 1.9 },
      { ID: 23, name: 'Yoghurt', address: 2.4 },
      { ID: 44, name: 'Heavy Cream', address: 3.9 },
    ])
  }
  const getBuildings = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
    }
    setVisibleIndicator(true);
    ManagerService.getBuildingList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          if (response.data.code !== 200) {
            ToastsStore.error(response.data.message);
          } else {
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            if (!data.totalpage)
              setTotalPage(1);
            else
              setTotalPage(data.totalpage);
            let datalist = data.buildinglist;
            const itemlist = [];
            datalist.map((data, i) => {
              itemlist[i] = { isChecked: false, ...data };
            });
            setDataList(itemlist);
            let amount = 0;

            const items = ['Total', data.totalcount, amount];
            setFooterItems(items);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const handleClickDelete = (id) => {
    if (accessBuildings === 'Edit') {
      setOpenDelete(true);
      setDeleteId(id);
    } else {
      setOpenDialog(true);
    }
  };
  useEffect(() => {
    if (accessBuildings === 'Denied') {
      setOpenDialog(true);
    }
  }, [accessBuildings]);
  useEffect(() => {
    if (accessBuildings !== 'Denied')
      getBuildings();
  }, [page_num, row_count, sort_column, sort_method, companyID]);



  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    ManagerService.deleteUser(deleteId)
      .then(
        response => {
          console.log(response.data);
          // setVisibleIndicator(false);  
          if (response.data.code !== 200) {
            console.log('error');
          } else {
            console.log('success');
            alert('Deleted successful');
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
          }
        },
        error => {
          console.log('fail');
          // setVisibleIndicator(false);
        }
      );
  }
  return (
    <div className={classes.root}>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.titleText}>
                <b>Mes Immeubles</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
            <Grid>
              <MyButton name={"Nouvel Immeuble"} color={"1"} onClick={handleOpen} />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid item container className={classes.padding} >
                  <Grid xs={12} item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close} /></Grid>
                  <Grid xs={12} item ><p id="transition-modal-title" className={classes.modalTitle}><b>Nouvel immmeuble</b></p></Grid>
                </Grid>
                <AddBuilding onCancel={handleClose} onAdd={handleAdd} />
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div>
      <div className={classes.body}>
        <MyDialog open={openDialog} role={accessBuildings} onClose={handleCloseDialog} />
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
    </div>
  );
};

export default withRouter(Buildings);
