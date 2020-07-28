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
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(PaymentMethods);
