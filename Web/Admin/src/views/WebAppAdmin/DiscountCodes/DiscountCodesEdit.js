import React, {useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import MyButton from 'components/MyButton';
import authService from '../../../services/authService.js';
import {withRouter } from 'react-router-dom';
import {EditDiscountCodeStyles as useStyles} from './useStyles';

const DiscountCodesEdit = (props) => {
  const {history}=props;
  //const token = authService.getToken();  
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessDiscountCodes = authService.getAccess('role_discountcodes');  
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const customerTypeList = ['', 'gestionnaire', 'copropriétaires', 'copropriété'];
  const discountTypeList = ['', 'fixe', 'pourcentage'];
  const billingCyclesList = ['', 'une fois', '2 mois', '3 mois', '6 mois', '1 an', 'tout le cycle'];
  const [customerType, setCustomerType] = React.useState('');
  const [codeName, setCodeName] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [discountType, setDiscountType] = React.useState('');
  const [disocuntAmount, setDiscountAmount] = React.useState('');
  const [billingCycles, setBillingCycles] = React.useState('');
  const [maxAmountOfUse, setMaxAmountOfUse] = React.useState('');
  const [maxAmountOfUsePerUser, setMaxAmountOfUsePerUser] = React.useState('');

  const [errorsCustomerType, setErrorsCustomerType] = React.useState('');
  const [errorsCodeName, setErrorsCodeName] = React.useState('');
  const [errorsStartDate, setErrorsStartDate] = React.useState('');
  const [errorsEndDate, setErrorsEndDate] = React.useState('');
  const [errorsDiscountType, setErrorsDiscountType] = React.useState('');
  const [errorsDiscountAmount, setErrorsDiscountAmount] = React.useState('');
  const [errorsBillingCycles, setErrorsBillingCycles] = React.useState('');
  const [errorsMaxAmountOfUse, setErrorsMaxAmountOfUse] = React.useState('');
  const [errorsMaxAmountOfUsePerUser, setErrorsMaxAmountOfUsePerUser] = React.useState('');
  

  useEffect(() => {
    if(accessDiscountCodes === 'denied'){
      setOpenDialog(true);
    }
    if(accessDiscountCodes !== 'denied'){
      
    }
  }, [accessDiscountCodes]);


  const handleClick = ()=>{
    history.goBack();
  };
  const handleClose = ()=>{
    props.onCancel();
  };
const handleChangeCustomerType = (val) => {
    setCustomerType(val);
}
const handleChangeCodeName = (event) => {
    setCodeName(event.target.value);
}
const handleChangeStartDate = (event) => {
    setStartDate(event.target.value);
}
const handleChangeEndDate = (event) => {
    setEndDate(event.target.value);
}
const handleChangeDiscountType = (event) => {
    setDiscountType(event.target.value);
}
const handleChangeDiscountAmount = (event) => {
    setDiscountAmount(event.target.value);
}
const handleChangeBillingCycles = (val) => {
    setBillingCycles(val);
}
const handleChangeMaxAmountOfUse = (event) => {
    setMaxAmountOfUse(event.target.value);
}
const handleChangeMaxAmountOfUsePerUser = (event) => {
    setMaxAmountOfUsePerUser(event.target.value);
}
const handleClickSave = ()=>{
  let cnt = 0;
  if(customerType.length === 0) {setErrorsCustomerType('please select cutomer type'); cnt++;}
  else setErrorsCustomerType('');
  if(codeName.length === 0) {setErrorsCodeName('please enter code name'); cnt++;}
  else setErrorsCodeName('');
  if(startDate.length === 0) {setErrorsStartDate('please select start date'); cnt++;}
  else setErrorsStartDate('');
  if(endDate.length === 0) {setErrorsEndDate('please select end date'); cnt++;}
  else setErrorsEndDate('');
  if(discountType.length === 0) {setErrorsDiscountType('please enter discount type'); cnt++;}
  else setErrorsDiscountType('');
  if(disocuntAmount.length === 0) {setErrorsDiscountAmount('please enter discount amount'); cnt++;}
  else setErrorsDiscountAmount('');
  if(billingCycles.length === 0) {setErrorsBillingCycles('please enter amount of billing cycles'); cnt++;}
  else setErrorsBillingCycles('');
  if(maxAmountOfUse.length === 0) {setErrorsMaxAmountOfUse('please enter max amount of use'); cnt++;}
  else setErrorsMaxAmountOfUse('');
  if(maxAmountOfUsePerUser.length === 0) {setErrorsMaxAmountOfUsePerUser('please enter max amount of use per user'); cnt++;}
  else setErrorsMaxAmountOfUsePerUser('');
  
  if(cnt ===0){

      handleClose();
  }
}

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
            <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Catégorie</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={customerTypeList} 
                            onChangeSelect={handleChangeCustomerType}
                            value={customerType}
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsCustomerType.length > 0 && 
                        <span className={classes.error}>{errorsCustomerType}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={codeName}
                            onChange={handleChangeCodeName} 
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsCodeName.length > 0 && 
                        <span className={classes.error}>{errorsCodeName}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container  alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Date de début</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={startDate}
                            onChange={handleChangeStartDate} 
                            type="date"
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsStartDate.length > 0 && 
                        <span className={classes.error}>{errorsStartDate}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container alignItems="center" spacing={1}>
                    <Grid item ><p className={classes.itemTitle}>Date de fin</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={endDate}
                            onChange={handleChangeEndDate} 
                            type="date"
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsEndDate.length > 0 && 
                        <span className={classes.error}>{errorsEndDate}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Type de réduction</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={discountTypeList} 
                            onChangeSelect={handleChangeDiscountType}
                            value={discountType}
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsDiscountType.length > 0 && 
                        <span className={classes.error}>{errorsDiscountType}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Montant</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={disocuntAmount}
                            onChange={handleChangeDiscountAmount} 
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsDiscountAmount.length > 0 && 
                        <span className={classes.error}>{errorsDiscountAmount}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Appliqué sur</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={billingCyclesList} 
                            onChangeSelect={handleChangeBillingCycles}
                            value={billingCycles}
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsBillingCycles.length > 0 && 
                        <span className={classes.error}>{errorsBillingCycles}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Nombre maximal d'activations</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={maxAmountOfUse}
                            onChange={handleChangeMaxAmountOfUse} 
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsMaxAmountOfUse.length > 0 && 
                        <span className={classes.error}>{errorsMaxAmountOfUse}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>Nombre maximal d'activations par utilisateur</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={maxAmountOfUsePerUser}
                            onChange={handleChangeMaxAmountOfUsePerUser} 
                            disabled={(accessDiscountCodes ==='see'? true : false)}
                        />
                        {errorsMaxAmountOfUsePerUser.length > 0 && 
                        <span className={classes.error}>{errorsMaxAmountOfUsePerUser}</span>}
                    </Grid>
                </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton name = {"Sauvegarder"} color={"1"} onClick={handleClickSave} disabled={(accessDiscountCodes ==='see'? true : false)}/>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(DiscountCodesEdit);
