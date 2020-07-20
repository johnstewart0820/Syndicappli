import React from 'react';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import {COUNTRIES} from '../../../components/countries';
import Multiselect from '../../../components/Multiselect.js';
import { Checkbox } from '@material-ui/core';
import {AddProductStyles as useStyles} from './useStyles';

const AddProducts = (props) => {
  const classes = useStyles();
  
  const priceTypeList = ['','Editer', 'Voir', 'Refusé'];
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
  const companiesList = COUNTRIES.map((country,id) => {
    return {
      label: country
    }
  })
  const buildingsList = companiesList;

  const [renewal, setRenewal] = React.useState(false);
  const [productName, setProductName] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [priceType, setPriceType] = React.useState('');
  const [price, setPrice] = React.useState('');

  const [errorsCategorie, setErrorsCategorie] = React.useState('');
  const [errorsBillingCycle, setErrorsBillingCycle] = React.useState('');
  const [errorsRenewal, setErrorsRenewal] = React.useState('');
  const [errorsProductName, setErrorsProductName] = React.useState('');
  const [errorsProductDescription, setErrorsProductDescription] = React.useState('');
  const [errorsPriceType, setErrorsPriceType] = React.useState('');
  const [errorsPrice, setErrorsPrice] = React.useState('');

  const handleClose = ()=>{
    props.onCancel();
  };
  const handleCreate = ()=>{
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

        handleClose();
    }
  }
  const handleChangeProductName = (event) => {
      setProductName(event.target.value);
  }
const handleChangeProductDescription = (event) => {
    setProductDescription(event.target.value);
}
const handleChangePrice = (val) => {
    setPrice(val);
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
  return (
    <div className={classes.root}>
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.title}>Catégorie</p></Grid>
                    <Grid xs item container>
                        <Multiselect
                            selected={categorie}
                            no={'No companies found'}
                            all={companiesList} 
                            onSelected={handleChangeCategorie}
                        />
                        {errorsCategorie.length > 0 && 
                        <span className={classes.error}>{errorsCategorie}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.title}>Récurrence</p></Grid>
                    <Grid xs item container>
                         <Multiselect
                            selected={billingCycle}
                            no={'No buildings found'}
                            all={buildingsList} 
                            onSelected={handleChangeBillingCycle}
                        />
                        {errorsBillingCycle.length > 0 && 
                        <span className={classes.error}>{errorsBillingCycle}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.title}>Renouvellement automatique</p></Grid>
                    <Grid xs item container>
                        <Checkbox 
                            checked={renewal}
                            onChange={handleChangeRenewal} 
                        />
                        {errorsRenewal.length > 0 && 
                        <span className={classes.error}>{errorsRenewal}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.title}>Nom</p></Grid>
                    <Grid xs item container>
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
                    <Grid item><p className={classes.title}>Description</p></Grid>
                    <Grid xs item container>
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
                    <Grid item ><p className={classes.title}>Tarification</p></Grid>
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
                    <Grid item><p className={classes.title}>Prix (€ HT par lot)</p></Grid>
                    <Grid xs item container>
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
            </Grid>    
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Creer"} color={"1"} onClick={handleCreate}/>
                    <MyButton name = {"Annuler"} bgColor="grey" onClick={handleClose}/>
                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddProducts;
