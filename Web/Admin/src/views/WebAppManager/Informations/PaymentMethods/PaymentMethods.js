import React, { useEffect } from 'react';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MyButton from 'components/MyButton';
import authService from 'services/authService.js';
import MyTableCard from 'components/MyTableCard';
import {  withRouter } from 'react-router-dom';
import AdminService from 'services/api.js';
import {makeStyles} from '@material-ui/styles';

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
    '& .MuiTextField-root': {
      // width: '100%'
  },
  '& .MuiOutlinedInput-input':{
      [theme.breakpoints.up('xl')]: {
        padding: '17px 25px',
        fontSize: 22,
      },
      [theme.breakpoints.down('lg')]: {
        padding: '12px 18px',
        fontSize: 15,
      },
      [theme.breakpoints.down('md')]: {
        padding: '8px 13px',
        fontSize: 11,
      },
    },
    '& .MuiOutlinedInput-multiline':{
      padding: 0
    },
    '& p':{
      marginBottom: 0
    }
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  item:{
    marginTop: theme.spacing(5),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: 'none',
  }, 
  div_indicator: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    paddingLeft: '50%',
    alignItems: 'center',
    marginTop: '-60px',
    zIndex: 999,
  },
  indicator: {
    color: 'gray'
  },
  error:{
      color: 'red',
      [theme.breakpoints.up('xl')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 13,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 9,
      },
  },
  headerTitle:{
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
  sepaTitle:{
    [theme.breakpoints.up('xl')]: {
      fontSize :28
    },
    [theme.breakpoints.down('lg')]: {
      fontSize :20
    },
    [theme.breakpoints.down('md')]: {
      fontSize :14
    },
  },
}));
const PaymentMethods = (props) => {
  const {history}=props;
  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }
  const accessBuildings = authService.getAccess('role_buildings');  
  const classes = useStyles();

  const [accountHolder, setAccountHolder] = React.useState('');
  const [accountAddress, setAccountAddress] = React.useState('');
  const [accountIban, setAccountIban] = React.useState('');
  const [dataList, setDataList] = React.useState([]);

  const handleClick = ()=>{
    history.goBack();
  };

  const handleChangeAccountHolder = (event) =>{
    setAccountHolder(event.target.value);
  };
  const handleChangeAccountAddress = (event) =>{
    setAccountAddress(event.target.value);
  };
  const handleChangeAccountIban = (event) =>{
    setAccountIban(event.target.value);
  };
 useEffect(() => {
    console.log('b');
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { ID: 1, card_digits: 'MasterCard-6914', card_name: 'MonSyndic', expiry_date: 'Exp. 12/2021' },
      { ID: 2, card_digits: 'MasterCard-6914', card_name: 'MonSyndic', expiry_date: 'Exp. 12/2021' },
      { ID: 3, card_digits: 'MasterCard-6914', card_name: 'MonSyndic', expiry_date: 'Exp. 12/2021' },
    ])
  };
  const cellList = [{key:'card_digits', field:''},{key:'card_name', field:''},{key:'expiry_date', field:''}]
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item>
          <p className={classes.headerTitle}><b>Moyens de paiement</b></p>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div> 
      <Grid container direction="column" >
          <Grid item container>
            <Grid item container justify="flex-start" direction="column"  className={classes.item}>
              <Grid item>
                <p className={classes.sepaTitle}><b>carte bancaire</b></p>
              </Grid>
            </Grid>
            <Grid  item sm={7}>
                <MyTableCard products={dataList} cells={cellList} leftBtn="Ajouter uno  carte" />
            </Grid>
          </Grid>
        <div>
          <Grid xs={12} sm={6} item container justify="flex-start" direction="column" spacing={5} className={classes.item}>
            <Grid item>
              <p className={classes.sepaTitle}><b>Compte bancaire - Prelevement SEPA</b></p>
            </Grid>
            <Grid item container direction="column" spacing={2} >
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>Nom du titulaire du compte</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined"
                      value={accountHolder}
                      onChange={handleChangeAccountHolder}
                      disabled={(accessBuildings ==='see'? true : false)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="flex-start" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>Adresse</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      rows={3} 
                      multiline 
                      variant="outlined"
                      value={accountAddress}
                      onChange={handleChangeAccountAddress}
                      disabled={(accessBuildings ==='see'? true : false)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>IBAN</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined"
                      value={accountIban}
                      onChange={handleChangeAccountIban}
                      disabled={(accessBuildings ==='see'? true : false)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid  item container justify="space-between" spacing={1}>
              <Grid item><MyButton name = {"Editer le mandat"} color={"1"} disabled={(accessBuildings ==='see'? true : false)}/></Grid>
              <Grid item><MyButton name = {"Supprimer"} bgColor="grey" disabled={(accessBuildings ==='see'? true : false)}/>  </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(PaymentMethods);
