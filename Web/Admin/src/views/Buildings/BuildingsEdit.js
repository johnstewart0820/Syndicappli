import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import MyTableCard from '../../components/MyTableCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../components/MySelect';
import MyButton from 'components/MyButton';
import theme from 'theme';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MyTextField from '../../components/MyTextField';
import authService from '../../services/authService.js';
import { setStatic } from 'recompose';
import Multiselect from '../../components/Multiselect.js';
import {COUNTRIES} from '../../components/countries';
import { Link as RouterLink, withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-multiline':{
        padding: '3px 26px 3px 12px',
        fontSize: 16,
    },
    '& p':{
        marginBottom : 0
    },
  },
  tool: {
    minHeight: '67px'
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  body:{
    marginTop: theme.spacing(8),
    borderRadius: '30px',
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
    padding: theme.spacing(5)
  },
  item:{
    marginTop: theme.spacing(5),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  size: {
    width: 214,
    height: 214
  },
  input: {
    display: 'none'
  },
  error:{
    color: 'red'
  }
}));
const BuildingsEdit = (props) => {
  const {history}=props;
  const token = authService.getToken();    
  if (!token) {
    history.push("/login");
    window.location.reload();
  }
  const accessBuildings = authService.getAccess('role_buildings');  
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [accountHolder, setAccountHolder] = React.useState('');
  const [accountAddress, setAccountAddress] = React.useState('');
  const [accountIban, setAccountIban] = React.useState('');
  const [errorsName, setErrorsName] = React.useState('');
  const [errorsAddress, setErrorsAddress] = React.useState('');
  const [errorsAccountHolder, setErrorsAccountHolder] = React.useState('');
  const [errorsAccountAddress, setErrorsAccountAddress] = React.useState('');
  const [errorsAccountIban, setErrorsAccountIban] = React.useState('');
  const [errorsCompanies, setErrorsCompanies] = React.useState('');

  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
  const selected = [
    { label: "Albania",value: "Albania"},
    { label: "Argentina",value: "Argentina"},
    { label: "Austria",value: "Austria"},
    { label: "Cocos Islands",value: "Cocos Islands"},
    { label: "Kuwait",value: "Kuwait"},
    { label: "Sweden",value: "Sweden"},
    { label: "Venezuela",value: "Venezuela"}
  ];
  const [companies, setCompanies] = React.useState(selected);
  const allCompanies =  COUNTRIES.map((country,id) => {
    return {
      label: country, value: country
    }
  })
  useEffect(() => {
    if (!token) {
        history.push("/login");
        window.location.reload();
    }
  });
  useEffect(() => {
    console.log('b');
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
      { id: 2, name: 'Milk', price: 1.9, stock: 32 },
      { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
      { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
      { id: 5, name: 'Butter', price: 0.9, stock: 99 },
    ])
  };
  const handleClick = ()=>{
    history.goBack();
  };

  const handleChangeCompanies = (val) =>{
    setCompanies(val);
  };
  const handleChangeName = (event) =>{
    setName(event.target.value);
  };
  const handleChangeAddress = (event) =>{
    setAddress(event.target.value);
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
  const handleClickAdd = ()=>{
    let cnt = 0;
    if(name.length == 0) {setErrorsName('please enter your name'); cnt++;}
    else setErrorsName('');
    if(address.length == 0) {setErrorsAddress('please enter your first name'); cnt++;}
    else setErrorsAddress('');
    if(companies.length == 0) {setErrorsCompanies('please select companies'); cnt++;}
    else setErrorsCompanies('');
    // if(AccountAddress.length == 0) {setErrorsAccountAddress('please select buildings'); cnt++;}
    // else setErrorsAccountAddress('');
    // if(AccountHolder.length == 0) {setErrorsAccountHolder('please enter your email'); cnt++;}
    // else setErrorsAccountHolder('');
    // if(AccountIban.length == 0) {setErrorsAccountIban('please enter your phone number'); cnt++;}
    // else setErrorsAccountIban('');
    if(cnt ==0){

        handleClose();
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Résidence les Pinsons</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} style={{cursor:'pointer',fontSize:18}}>&lt; Retour à la liste des Immeubles</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid container direction="column" spacing={5} xs={12} sm={10} md={8}>
            <Grid item container><p  style={{fontSize:35}}><b>Informations</b></p></Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p style={{fontSize:25}}>Nom</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined" 
                  placeholder="Cabinet Loiselet & Daigremant"
                  value={name}
                  fullWidth
                  onChange={handleChangeName}
                  disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}
                />
                {errorsName.length > 0 && 
                <span className={classes.error}>{errorsName}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p style={{fontSize:25}}>Carbinets</p></Grid>
              <Grid xs item container alignItems="stretch">
                <Multiselect
                  selected={companies}
                  no={'No companies found'}
                  hint={'Add new Company'}
                  all={allCompanies} 
                  onSelected={handleChangeCompanies}
                  disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}
                />
                {errorsCompanies.length > 0 && 
                <span className={classes.error}>{errorsCompanies}</span>}
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item><p style={{fontSize:25}}>Adresse</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  rows={3} multiline 
                  variant="outlined" 
                  placeholder="41 route de"
                  value={address}
                  onChange={handleChangeAddress}
                  disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}
                />
                {errorsAddress.length > 0 && 
                <span className={classes.error}>{errorsAddress}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:18}}>Clefs de répartition</p></Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton name = {"Sauvegarder"} color={"1"} onClick={handleClickAdd} disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}/>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid xs={12} sm={6} item container justify="flex-start" direction="column" spacing={5} className={classes.item}>
            <Grid item>
              <p style={{fontSize:28}}><b>Compte bancaire - Prelevement SEPA</b></p>
            </Grid>
            <Grid item container direction="column" spacing={2} >
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:18}}>Nom du titulaire du compte</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined"
                      value={accountHolder}
                      onChange={handleChangeAccountHolder}
                      disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="flex-start" spacing={2}>
                <Grid item><p style={{fontSize:18}}>Adresse</p></Grid>
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
                      disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:18}}>IBAN</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined"
                      value={accountIban}
                      onChange={handleChangeAccountIban}
                      disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid  item container justify="space-between" spacing={1}>
              <Grid item><MyButton name = {"Editer le mandat"} color={"1"} disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}/></Grid>
              <Grid item><MyButton name = {"Supprimer"} bgColor="grey" disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}/>  </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(BuildingsEdit);
