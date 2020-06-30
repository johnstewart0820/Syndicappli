import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../components/MyButton';
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import {COUNTRIES} from '../../components/countries';
import Multiselect from '../../components/Multiselect.js';
const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,
        padding: theme.spacing(2, 4, 3),
    },
      footer: {
          paddingTop: 30,
      },
    root: {
        '& .MuiTextField-root': {
            width: '100%'
        },
        '& .MuiOutlinedInput-multiline':{
            padding: '3px 26px 3px 12px',
            fontSize: 16,
        },
        '& .MuiOutlinedInput-input':{
            padding: '3px 26px 3px 12px',
            fontSize: 16,
        },        
        '& p':{
            marginBottom : 0
        },
    },
    error:{
        color: 'red'
    }
}));

const AddBuilding = (props) => {
  const classes = useStyles();
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
  const companiesList = COUNTRIES.map((country,id) => {
    return {
      label: country
    }
  })
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
  const handleClose = ()=>{
    props.onCancel();
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
        <div className={classes.paper} >
            <Grid container spacing={4} xs={12}>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Cabinet</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <Multiselect
                            selected={companies}
                            no={'No companies found'}
                            hint={'Add new Companies'}
                            all={companiesList} 
                            onSelected={handleChangeCompanies}
                        />
                        {errorsCompanies.length > 0 && 
                        <span className={classes.error}>{errorsCompanies}</span>}
                    </Grid>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Nom</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            rows={3} 
                            multiline 
                            variant="outlined" 
                            value={name}
                            onChange={handleChangeName} 
                        />
                        {errorsName.length > 0 && 
                        <span className={classes.error}>{errorsName}</span>}
                    </Grid>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Adresse</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            rows={3} 
                            multiline 
                            variant="outlined" 
                            value={address}
                            onChange={handleChangeAddress} 
                        />
                        {errorsAddress.length > 0 && 
                        <span className={classes.error}>{errorsAddress}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Clefs de répartition</p></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Compte Bancaire - Prélèvement SEPA</p></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Nom du titulaire du compte</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={accountHolder}
                            onChange={handleChangeAccountHolder} 
                        />
                        {errorsAccountHolder.length > 0 && 
                        <span className={classes.error}>{errorsAccountHolder}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="flex-start" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Adresse</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            rows={3} 
                            multiline 
                            variant="outlined" 
                            value={accountAddress}
                            onChange={handleChangeAccountAddress} 
                        />
                        {errorsAccountAddress.length > 0 && 
                        <span className={classes.error}>{errorsAccountAddress}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>AccountIban</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={accountIban}
                            onChange={handleChangeAccountIban} 
                        />
                        {errorsAccountIban.length > 0 && 
                        <span className={classes.error}>{errorsAccountIban}</span>}
                    </Grid>
                </Grid>
                <Grid xs={12} item container direction="column"  spacing={2}>
                    
                </Grid>
            </Grid>
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Créer"} color={"1"} onClick={handleClickAdd}/>
                    <MyButton name = {"Annuler"} bgColor="gray" onClick={handleClose}/>  
                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddBuilding;
