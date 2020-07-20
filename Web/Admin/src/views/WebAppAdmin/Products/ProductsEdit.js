import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import MyButton from 'components/MyButton';
import authService from '../../../services/authService.js';
import Multiselect from '../../../components/Multiselect.js';
import {COUNTRIES} from '../../../components/countries';
import { withRouter } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import {EditProductStyles as useStyles} from './useStyles';

const ProductsEdit = (props) => {
  const {history}=props;
  const priceTypeList = ['','Editer', 'Voir', 'Refusé'];  
  //const token = authService.getToken();  
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessProducts = authService.getAccess('role_products');  
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
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
    if(accessProducts === 'denied'){
      setOpenDialog(true);
    }
    if(accessProducts !== 'denied'){
      
    }
  }, [accessProducts]);


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
    if(productName.length === 0) {setErrorsProductName('please enter your product name'); cnt++;}
    else setErrorsProductName('');
    if(productDescription.length === 0) {setErrorsProductDescription('please enter your product description'); cnt++;}
    else setErrorsProductDescription('');
    if(categorie.length === 0) {setErrorsCategorie('please select categorie'); cnt++;}
    else setErrorsCategorie('');
    if(billingCycle.length === 0) {setErrorsBillingCycle('please select billing cycle'); cnt++;}
    else setErrorsBillingCycle('');
    if(price.length === 0) {setErrorsPrice('please enter price'); cnt++;}
    else setErrorsPrice('');
    if(priceType.length === 0) {setErrorsPriceType('please enter your price type'); cnt++;}
    else setErrorsPriceType('');

    if(cnt ===0){

    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.headerTitle}>
                <b>Résidence les Pinsons</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la liste des Produit</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid item container direction="column" spacing={5} xs={12} sm={10} md={8} lg={6} xl={4}>
            <Grid item container><p  className={classes.headerTitle}><b>Informations</b></p></Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Catégorie</p></Grid>
                <Grid xs item container direction="column">
                    <Multiselect
                        selected={categorie}
                        no={'No companies found'}
                        all={companiesList} 
                        onSelected={handleChangeCategorie}
                        disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}
                    />
                    {errorsCategorie.length > 0 && 
                    <span className={classes.error}>{errorsCategorie}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Récurrence</p></Grid>
                <Grid xs item container direction="column">
                    <Multiselect
                        selected={billingCycle}
                        no={'No buildings found'}
                        all={buildingsList} 
                        onSelected={handleChangeBillingCycle}
                        disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}
                    />
                    {errorsBillingCycle.length > 0 && 
                    <span className={classes.error}>{errorsBillingCycle}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Renouvellement automatique</p></Grid>
                <Grid xs item container direction="column">
                    <Checkbox 
                        checked={renewal}
                        onChange={handleChangeRenewal} 
                        disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}
                    />
                    {errorsRenewal.length > 0 && 
                    <span className={classes.error}>{errorsRenewal}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                <Grid xs item container direction="column">
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={productName}
                        onChange={handleChangeProductName} 
                        disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}
                    />
                    {errorsProductName.length > 0 && 
                    <span className={classes.error}>{errorsProductName}</span>}
                </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Description</p></Grid>
                <Grid xs item container direction="column">
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined" 
                        value={productDescription}
                        onChange={handleChangeProductDescription} 
                        multiline
                        rows={5}
                        disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}
                    />
                    {errorsProductDescription.length > 0 && 
                    <span className={classes.error}>{errorsProductDescription}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item ><p className={classes.itemTitle}>Tarification</p></Grid>
                <Grid xs item container direction="column">
                    <MySelect 
                        color="gray" 
                        data={priceTypeList} 
                        onChangeSelect={handleChangePriceType}
                        value={priceType}
                        width="80%"
                        disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}
                    />
                    {errorsPriceType.length > 0 && 
                    <span className={classes.error}>{errorsPriceType}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Prix (€ HT par lot)</p></Grid>
                <Grid xs item container direction="column">
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined" 
                        value={price}
                        onChange={handleChangePrice} 
                        disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}
                    />
                    {errorsPrice.length > 0 && 
                    <span className={classes.error}>{errorsPrice}</span>}
                </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton name = {"Sauvegarder"} color={"1"} onClick={handleClickAdd} disabled={(accessProducts ==='see'? 'disabled' : !'disabled')}/>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(ProductsEdit);
