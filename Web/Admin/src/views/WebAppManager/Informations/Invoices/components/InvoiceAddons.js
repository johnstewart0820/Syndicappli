import React, { useState, useEffect } from 'react';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
import InvoiceTable from '../../../../../components/InvoiceTable';
import MySelect from '../../../../../components/MySelect';
import Grid from '@material-ui/core/Grid';
import {  withRouter } from 'react-router-dom';
import authService from '../../../../../services/authService.js';
import { makeStyles } from '@material-ui/styles';

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
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  titleText: {
    [theme.breakpoints.up('xl')]: {
      fontSize :35
    },
    [theme.breakpoints.down('lg')]: {
      fontSize :25
    },
    [theme.breakpoints.down('md')]: {
      fontSize :18
    },
  },
  tool: {
    paddingTop:30,
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
    color: 'gray'
  }
}));
const InvoiceAddons = (props) => {
  const {history}=props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/manager/login");
  //   window.location.reload();
  // }
 
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const [buildings, setBuildings] = useState(0);
  const buildingList = ['','20','all'];
  const cellList = [ 
    {key : 'addon_bundle_name' , field : 'Produit'}, 
    {key : 'building' , field : 'Immeuble'}, 
    {key : 'purchase_date' , field : 'Date'},
    {key : 'invoice_total' , field : 'Montant'},
  ];
  const handleClickEdit = (id) => {
    console.log(id);
    // history.push('/manager/buildings/edit/'+id);
  }

  useEffect(() => {
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { ID: 1, addon_bundle_name: 'Pack modules', building: 'Résidence les Pinsons bleus', purchase_date: '12/03/2020', invoice_total: '4.90€ TTC'},
      { ID: 21, addon_bundle_name: 'Pack modules', building: '7 rue Berlioz, 75012 Paris', purchase_date: '12/03/2020', invoice_total: '4.90€ TTC'},
      { ID: 23, addon_bundle_name: 'Pack modules', building: '33 avenue du Général de Gaulle,78200 Meaux', purchase_date: '12/03/2020', invoice_total: '4.90€ TTC'},
    ])
  }

  const handleChangeBuildings = (val) => {
    setBuildings(val);
  }
  return (
    <div>
      <div className={classes.tool}>
        <Grid xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Immeuble</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect 
                    color="gray" 
                    data={buildingList} 
                    onChangeSelect={handleChangeBuildings}
                    value={buildings}
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
        />
      </div>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(InvoiceAddons);
