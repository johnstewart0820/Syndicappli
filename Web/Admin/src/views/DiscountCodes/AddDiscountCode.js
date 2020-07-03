import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../components/MyButton';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../components/MySelect';
const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,
        padding: theme.spacing(2, 4, 3),
    },
    footer: {
        paddingTop: 89,
    },
    root: {
        '& .MuiTextField-root': {
            width: '500',
        },
        '& .MuiOutlinedInput-root':{
            width: 200
        },
        '& .MuiOutlinedInput-input':{
            padding: '8px 12px',
            fontSize: 17
        },
        '& p':{
            marginBottom: 0
        },
    },
    input: {
        display: 'none'
    },
    error:{
        color: 'red'
    }
}));

const AddDiscountCode = (props) => {
  const classes = useStyles();
  
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
  
  const handleClose = ()=>{
    props.onCancel();
  };
  const handleCreate = ()=>{
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

  return (
    <div className={classes.root}>
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Catégorie</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={customerTypeList} 
                            onChangeSelect={handleChangeCustomerType}
                            value={customerType}
                            width="283px"
                        />
                        {errorsCustomerType.length > 0 && 
                        <span className={classes.error}>{errorsCustomerType}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Nom</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={codeName}
                            onChange={handleChangeCodeName} 
                        />
                        {errorsCodeName.length > 0 && 
                        <span className={classes.error}>{errorsCodeName}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container  alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Date de début</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={startDate}
                            onChange={handleChangeStartDate} 
                            type="date"
                            fullWidth
                        />
                        {errorsStartDate.length > 0 && 
                        <span className={classes.error}>{errorsStartDate}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container alignItems="center" spacing={1}>
                    <Grid item ><p style={{fontSize:18}}>Date de fin</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={endDate}
                            onChange={handleChangeEndDate} 
                            type="date"
                            fullWidth
                        />
                        {errorsEndDate.length > 0 && 
                        <span className={classes.error}>{errorsEndDate}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Type de réduction</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={discountTypeList} 
                            onChangeSelect={handleChangeDiscountType}
                            value={discountType}
                            width="134px"
                        />
                        {errorsDiscountType.length > 0 && 
                        <span className={classes.error}>{errorsDiscountType}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Montant</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={disocuntAmount}
                            onChange={handleChangeDiscountAmount} 
                        />
                        {errorsDiscountAmount.length > 0 && 
                        <span className={classes.error}>{errorsDiscountAmount}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Appliqué sur</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={billingCyclesList} 
                            onChangeSelect={handleChangeBillingCycles}
                            value={billingCycles}
                            width="134px"
                        />
                        {errorsBillingCycles.length > 0 && 
                        <span className={classes.error}>{errorsBillingCycles}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Nombre maximal d'activations</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={maxAmountOfUse}
                            onChange={handleChangeMaxAmountOfUse} 
                        />
                        {errorsMaxAmountOfUse.length > 0 && 
                        <span className={classes.error}>{errorsMaxAmountOfUse}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:18}}>Nombre maximal d'activations par utilisateur</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={maxAmountOfUsePerUser}
                            onChange={handleChangeMaxAmountOfUsePerUser} 
                        />
                        {errorsMaxAmountOfUsePerUser.length > 0 && 
                        <span className={classes.error}>{errorsMaxAmountOfUsePerUser}</span>}
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
    </div>
  );
};

export default AddDiscountCode;
