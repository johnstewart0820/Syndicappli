import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../components/MySelect';
import MyButton from 'components/MyButton';
import authService from '../../services/authService.js';
import Multiselect from '../../components/Multiselect.js';
import {COUNTRIES} from '../../components/countries';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
         width: '80%'
    },
    '& .MuiOutlinedInput-multiline':{
        padding: '3px 12px 3px 12px',
        fontSize: 22,
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
const ProductsEdit = (props) => {
  const {history}=props;
  const token = authService.getToken();  
  const priceTypeList = ['','Editer', 'Voir', 'Refusé'];  
  if (!token) {
    history.push("/login");
    window.location.reload();
  }
  const accessBuildings = authService.getAccess('role_buildings');  
  const classes = useStyles();

  const [renewal, setRenewal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [priceType, setPriceType] = useState('');
  const [price, setPrice] = useState('');

  const [errorsCategorie, setErrorsCategorie] = useState('');
  const [errorsBillingCycle, setErrorsBillingCycle] = useState('');
  const [errorsRenewal, setErrorsRenewal] = useState('');
  const [errorsProductName, setErrorsProductName] = useState('');
  const [errorsProductDescription, setErrorsProductDescription] = useState('');
  const [errorsPriceType, setErrorsPriceType] = useState('');
  const [errorsPrice, setErrorsPrice] = useState('');

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
  const [categorie, setCategorie] = React.useState(selected);
  const [billingCycle, setBillingCycle] = React.useState(selected);
  const companiesList =  COUNTRIES.map((country,id) => {
    return {
      label: country, value: country
    }
  })
  const buildingsList = companiesList;
  useEffect(() => {
    if (!token) {
        history.push("/login");
        window.location.reload();
    }
  });

  const handleClick = ()=>{
    history.goBack();
  };

  const handleChangeProductName = (event) => {
    setProductName(event.target.value);
}
const handleChangeProductDescription = (event) => {
  setProductDescription(event.target.value);
}
const handleChangePrice = (event) => {
  setPrice(event.target.value);
}
const handleChangePriceType = (val) => {
  setPriceType(val);
}
const handleChangeCategorie = (val) => {
  setCategorie(val);
}
const handleChangeBillingCycle = (val) => {
  setBillingCycle(val);
}
const handleChangeRenewal = (event) => {
  setRenewal(event.target.checked);
}
  const handleClickAdd = ()=>{
    let cnt = 0;
    if(productName.length == 0) {setErrorsProductName('please enter your product name'); cnt++;}
    else setErrorsProductName('');
    if(productDescription.length == 0) {setErrorsProductDescription('please enter your product description'); cnt++;}
    else setErrorsProductDescription('');
    if(categorie.length == 0) {setErrorsCategorie('please select categorie'); cnt++;}
    else setErrorsCategorie('');
    if(billingCycle.length == 0) {setErrorsBillingCycle('please select billing cycle'); cnt++;}
    else setErrorsBillingCycle('');
    if(price.length == 0) {setErrorsPrice('please enter price'); cnt++;}
    else setErrorsPrice('');
    if(priceType.length == 0) {setErrorsPriceType('please enter your price type'); cnt++;}
    else setErrorsPriceType('');

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
          <Grid item container direction="column" spacing={5} xs={12} sm={10} md={8}>
            <Grid item container><p  style={{fontSize:35}}><b>Informations</b></p></Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:25}}>Catégorie</p></Grid>
                <Grid xs item container direction="column">
                    <Multiselect
                        selected={categorie}
                        no={'No companies found'}
                        hint={'Add new Companies'}
                        all={companiesList} 
                        onSelected={handleChangeCategorie}
                    />
                    {errorsCategorie.length > 0 && 
                    <span className={classes.error}>{errorsCategorie}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:25}}>Récurrence</p></Grid>
                <Grid xs item container direction="column">
                    <Multiselect
                        selected={billingCycle}
                        no={'No buildings found'}
                        hint={'Add new Buildings'}
                        all={buildingsList} 
                        onSelected={handleChangeBillingCycle}
                    />
                    {errorsBillingCycle.length > 0 && 
                    <span className={classes.error}>{errorsBillingCycle}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:25}}>Renouvellement automatique</p></Grid>
                <Grid xs item container direction="column">
                    <Checkbox 
                        checked={renewal}
                        onChange={handleChangeRenewal} 
                    />
                    {errorsRenewal.length > 0 && 
                    <span className={classes.error}>{errorsRenewal}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:25}}>Nom</p></Grid>
                <Grid xs item container direction="column">
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={productName}
                        onChange={handleChangeProductName} 
                    />
                    {errorsProductName.length > 0 && 
                    <span className={classes.error}>{errorsProductName}</span>}
                </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
                <Grid item><p style={{fontSize:25}}>Description</p></Grid>
                <Grid xs item container direction="column">
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined" 
                        value={productDescription}
                        onChange={handleChangeProductDescription} 
                        multiline
                        rows={5}
                    />
                    {errorsProductDescription.length > 0 && 
                    <span className={classes.error}>{errorsProductDescription}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item ><p style={{fontSize:25}}>Tarification</p></Grid>
                <Grid xs item container direction="column">
                    <MySelect 
                        color="gray" 
                        data={priceTypeList} 
                        onChangeSelect={handleChangePriceType}
                        value={priceType}
                        width="80%"
                    />
                    {errorsPriceType.length > 0 && 
                    <span className={classes.error}>{errorsPriceType}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:25}}>Prix (€ HT par lot)</p></Grid>
                <Grid xs item container direction="column">
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined" 
                        value={price}
                        onChange={handleChangePrice} 
                    />
                    {errorsPrice.length > 0 && 
                    <span className={classes.error}>{errorsPrice}</span>}
                </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton name = {"Sauvegarder"} color={"1"} onClick={handleClickAdd} disabled={(accessBuildings =='See'? 'disabled' : !'disabled')}/>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(ProductsEdit);
