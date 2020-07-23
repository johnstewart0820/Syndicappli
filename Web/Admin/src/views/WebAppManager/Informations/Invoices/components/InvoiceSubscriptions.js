import React, { useState, useEffect } from 'react';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
import InvoiceTable from '../../../../../components/InvoiceTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
  tool: {
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
const InvoiceSubscriptions = (props) => {
  const {history}=props;
  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }
 
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const cellList = [ 
    {key : 'subscription_name' , field : 'Produit'}, 
    {key : 'amount_apartments' , field : 'Nombre de lots'},
    {key : 'price_per_apart' , field : 'Prix par lot'},
    {key : 'date' , field : 'Date'},
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
      { ID: 1, subscription_name: 'Abonnement mensuel', amount_apartments: '10.000', price_per_apart: '0.40cts HT', date: 'du 12/03/2020 au 12/04/2020', invoice_total: '4000€ HT'},
      { ID: 21, subscription_name: 'Abonnement mensuel', amount_apartments: '10.000', price_per_apart: '0.40cts HT', date: 'du 12/02/2020 au 12/03/2020', invoice_total: '4000€ HT'},
      { ID: 23, subscription_name: 'Abonnement mensuel', amount_apartments: '10.000', price_per_apart: '0.40cts HT', date: 'du 12/01/2020 au 12/02/2020', invoice_total: '4000€ HT'},
    ])
  }


  return (
    <div >
      <div className={classes.tool}>
      </div> 
        <InvoiceTable 
          products={dataList} 
          cells={cellList} 
          onClickEdit={handleClickEdit}
        />
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(InvoiceSubscriptions);
