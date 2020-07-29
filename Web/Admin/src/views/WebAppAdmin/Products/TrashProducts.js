import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import useStyles from './useStyles';
import AdminService from '../../../services/api.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import TrashTable from 'components/TrashTable';
import Grid from '@material-ui/core/Grid';
import MySelect from '../../../components/MySelect';
const TrashProducts = (props) => {
  const { history } = props;
  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }
  const accessProducts = authService.getAccess('role_products');
  const categorieList = ['Gestionnaires', 'Copropriétaires', 'immeubles'];
  const en_categorieList = ['managers','owners','buildings'];
  const [categorie, setCategorie] = React.useState(0);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
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
    { key: 'name', field: 'Nom' },
    { key: 'price', field: 'Prix' },
  ];

  const columns = [];
  for (let i = 0; i < 2; i++)
    columns[i] = 'asc';

  const handleClickRestore = (id) => {
      let data={
          'status': 'active'
      }
    AdminService.deleteProduct(id,data)
    .then(
      response => {
        setVisibleIndicator(false);
        switch(response.data.code){
          case 200:
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            ToastsStore.success("Restored successfully!");
            getTrashProducts();
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
  useEffect(() => {
    if (accessProducts !== 'denied')
      getTrashProducts();
  }, [page_num, row_count, sort_column, sort_method, props.refresh, categorie]);

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
  }
  const handleChangeCategorie = (val) => {
    setCategorie(val);
}
  const getTrashProducts = () => {
    const requestData = {
      'search_key': '',
      'page_num': page_num - 1,
      'row_count': row_count,
      'sort_column': sort_column,
      'sort_method': sort_method,
      'status': 'trash',
      'type' : en_categorieList[categorie]
    }
    setVisibleIndicator(true);
    AdminService.getProductList(requestData)
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
                setDataList(data.productlist);
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
          ToastsStore.error("Can't connect to the server");
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
      <div className={classes.tool}>
      <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Catégorie</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect
                  color="gray"
                  data={categorieList}
                  onChangeSelect={handleChangeCategorie}
                  value={categorie}
                />
              </Grid>
            </Grid>
          </Grid>
      </div>
      <div className={classes.body}>
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
          access={accessProducts}
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

export default withRouter(TrashProducts);
