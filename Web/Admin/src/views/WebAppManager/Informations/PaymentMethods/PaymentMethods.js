import React, { useEffect } from 'react';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MyButton from 'components/MyButton';
import authService from 'services/authService.js';
import MyTableCard from 'components/MyTableCard';
import {  withRouter } from 'react-router-dom';
import MyDialog from 'components/MyDialog.js';
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
  body:{
    [theme.breakpoints.up('xl')]: {
      marginTop: 64,
      padding: 40,
      borderRadius: 30,
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: 45,
      padding: 28,
      borderRadius: 21,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 32,
      padding: 20,
      borderRadius: 15,
    },
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
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
  plus:{
    color: '#707070',
    [theme.breakpoints.up('xl')]: {
      width:31 , 
      height: 31,
    },
    [theme.breakpoints.down('lg')]: {
      width:22 , 
      height: 22,
    },
    [theme.breakpoints.down('md')]: {
      width:15 , 
      height: 15,
    },
  },
  size: {
    cursor: 'pointer',
    [theme.breakpoints.up('xl')]: {
      width: 214,
      height: 214,
    },
    [theme.breakpoints.down('lg')]: {
      width: 150,
      height: 150,
    },
    [theme.breakpoints.down('md')]: {
      width: 105,
      height: 105,
    },
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
  backTitle:{
    cursor: 'pointer',
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
  itemTitle:{
    [theme.breakpoints.up('xl')]: {
      fontSize: 25,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
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
  img: {
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    border: '1px dashed rgba(112,112,112,0.43)',
    borderRadius: 8,
    [theme.breakpoints.up('xl')]: {
      width: 362,
      height: 278,
      marginTop: 30,
      marginRight: 30
    },
    [theme.breakpoints.down('lg')]: {
      width: 253,
      height: 177,
      marginTop: 21,
      marginRight: 21
    },
    [theme.breakpoints.down('md')]: {
      width: 177,
      height: 124,
      marginTop: 15,
      marginRight: 15
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
  permissionItemTitle:{
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
}));
const PaymentMethods = (props) => {
  const {history}=props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessBuildings = authService.getAccess('role_buildings');  
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);

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
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
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
                      disabled={(accessBuildings ==='See'? 'disabled' : !'disabled')}
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
                      disabled={(accessBuildings ==='See'? 'disabled' : !'disabled')}
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
                      disabled={(accessBuildings ==='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid  item container justify="space-between" spacing={1}>
              <Grid item><MyButton name = {"Editer le mandat"} color={"1"} disabled={(accessBuildings ==='See'? 'disabled' : !'disabled')}/></Grid>
              <Grid item><MyButton name = {"Supprimer"} bgColor="grey" disabled={(accessBuildings ==='See'? 'disabled' : !'disabled')}/>  </Grid>
            </Grid>
            <MyDialog open={openDialog} role={accessBuildings} onClose={handleCloseDialog}/>
          </Grid>
        </div>
      </Grid>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(PaymentMethods);
