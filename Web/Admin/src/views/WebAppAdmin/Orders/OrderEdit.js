import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import MyButton from 'components/MyButton';
import authService from '../../../services/authService.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { withRouter } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import { EditOrderStyles as useStyles } from './useStyles';
import AdminService from 'services/api.js';

const OrderEdit = (props) => {
  const classes = useStyles();
  const { history } = props;

  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const accessOrders = authService.getAccess('role_roders');
  const customerTypeList = [ 'gestionnaire', 'copropriétaires', 'copropriété'];
  const discountTypeList = [ 'fixe', 'pourcentage'];
  const billingCyclesList = [ 'une fois', '2 mois', '3 mois', '6 mois', '1 an', 'tout le cycle'];
  const [customerType, setCustomerType] = React.useState(0);
  const [codeName, setCodeName] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [discountType, setDiscountType] = React.useState(0);
  const [disocuntAmount, setDiscountAmount] = React.useState('');
  const [billingCycles, setBillingCycles] = React.useState(0);
  const [maxAmountOfUse, setMaxAmountOfUse] = React.useState('');
  const [maxAmountOfUsePerUser, setMaxAmountOfUsePerUser] = React.useState('');
  const [renewal, setRenewal] = React.useState(false);

  const [errorsCustomerType, setErrorsCustomerType] = React.useState('');
  const [errorsCodeName, setErrorsCodeName] = React.useState('');
  const [errorsStartDate, setErrorsStartDate] = React.useState('');
  const [errorsEndDate, setErrorsEndDate] = React.useState('');
  const [errorsDiscountType, setErrorsDiscountType] = React.useState('');
  const [errorsDiscountAmount, setErrorsDiscountAmount] = React.useState('');
  const [errorsBillingCycles, setErrorsBillingCycles] = React.useState('');
  const [errorsMaxAmountOfUse, setErrorsMaxAmountOfUse] = React.useState('');
  const [errorsMaxAmountOfUsePerUser, setErrorsMaxAmountOfUsePerUser] = React.useState('');

  const handleClickSave = () => {
    let cnt = 0;
    if (customerType.length === 0) { setErrorsCustomerType('please select cutomer type'); cnt++; }
    else setErrorsCustomerType('');
    if (codeName.length === 0) { setErrorsCodeName('please enter code name'); cnt++; }
    else setErrorsCodeName('');
    if (startDate.length === 0) { setErrorsStartDate('please select start date'); cnt++; }
    else setErrorsStartDate('');
    if (endDate.length === 0) { setErrorsEndDate('please select end date'); cnt++; }
    else setErrorsEndDate('');
    if (discountType.length === 0) { setErrorsDiscountType('please enter discount type'); cnt++; }
    else setErrorsDiscountType('');
    if (disocuntAmount.length === 0) { setErrorsDiscountAmount('please enter discount amount'); cnt++; }
    else setErrorsDiscountAmount('');
    if (billingCycles.length === 0) { setErrorsBillingCycles('please enter amount of billing cycles'); cnt++; }
    else setErrorsBillingCycles('');
    if (maxAmountOfUse.length === 0) { setErrorsMaxAmountOfUse('please enter max amount of use'); cnt++; }
    else setErrorsMaxAmountOfUse('');
    if (maxAmountOfUsePerUser.length === 0) { setErrorsMaxAmountOfUsePerUser('please enter max amount of use per user'); cnt++; }
    else setErrorsMaxAmountOfUsePerUser('');

    if (cnt === 0) {
      updateOrder();
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
  const handleChangeRenewal = (event) => {
    setRenewal(event.target.checked);
  }
  const getOrder = () => {
    setVisibleIndicator(true);
    AdminService.getOrder(props.match.params.id)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data.product;
              localStorage.setItem("token", JSON.stringify(response.data.data.token));

              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const updateOrder = () => {
    const requestData = {
      // 'buyer_type': en_categorieList[categorie],
      // 'billing_cycle': en_billingCycleList[billingCycle],
      // 'renewal': renewal,
      // 'name': productName,
      // 'description': productDescription,
      // 'price_type': en_priceTypeList[priceType],
      // 'price': price,
      // 'vat_option': vat_state,
      // 'vat_fee': vat_fee,
    }
    setVisibleIndicator(true);
    AdminService.updateOrder(props.match.params.id, requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success('Updated successfully!');
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const handleClick = () => {
    history.goBack();
  };
  return (
    <div className={classes.root}>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
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
          <Grid item container spacing={5} xs={12} sm={10} md={8} lg={6} xl={4}>
            <Grid item container><p className={classes.headerTitle}><b>Informations</b></p></Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Catégorie</p></Grid>
              <Grid xs item container direction="column">
                <MySelect
                  color="gray"
                  data={customerTypeList}
                  onChangeSelect={handleChangeCustomerType}
                  value={customerType}
                />
                {errorsCustomerType.length > 0 &&
                  <span className={classes.error}>{errorsCustomerType}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Produit</p></Grid>
              <Grid xs item container direction="column">
                <MySelect
                  color="gray"
                  data={customerTypeList}
                  onChangeSelect={handleChangeCustomerType}
                  value={customerType}
                />
                {errorsCustomerType.length > 0 &&
                  <span className={classes.error}>{errorsCustomerType}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Client</p></Grid>
              <Grid xs item container direction="column">
                <MySelect
                  color="gray"
                  data={customerTypeList}
                  onChangeSelect={handleChangeCustomerType}
                  value={customerType}
                />
                {errorsCustomerType.length > 0 &&
                  <span className={classes.error}>{errorsCustomerType}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Tarification</p></Grid>
              <Grid xs item container direction="column">
                <MySelect
                  color="gray"
                  data={customerTypeList}
                  onChangeSelect={handleChangeCustomerType}
                  value={customerType}
                />
                {errorsCustomerType.length > 0 &&
                  <span className={classes.error}>{errorsCustomerType}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Prix (€ HT par lot)</p></Grid>
              <Grid xs item container direction="column">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={codeName}
                  onChange={handleChangeCodeName}
                />
                {errorsCodeName.length > 0 &&
                  <span className={classes.error}>{errorsCodeName}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Nombre de lots</p></Grid>
              <Grid xs item container direction="column">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={codeName}
                  onChange={handleChangeCodeName}
                />
                {errorsCodeName.length > 0 &&
                  <span className={classes.error}>{errorsCodeName}</span>}
              </Grid>
            </Grid>
            <Grid xs={6} item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Date de début</p></Grid>
              <Grid xs item container>
                <TextField
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
              <Grid item ><p className={classes.title}>Date de fin</p></Grid>
              <Grid xs item container>
                <TextField
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
              <Grid item><p className={classes.title}>Paiement</p></Grid>
              <Grid xs item container direction="column">
                <MySelect
                  color="gray"
                  data={discountTypeList}
                  onChangeSelect={handleChangeDiscountType}
                  value={discountType}
                />
                {errorsDiscountType.length > 0 &&
                  <span className={classes.error}>{errorsDiscountType}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Renouvellement automatique</p></Grid>
              <Grid xs item container>
                <Checkbox
                  checked={renewal}
                  onChange={handleChangeRenewal}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Code promo</p></Grid>
              <Grid xs item container direction="column">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={codeName}
                  onChange={handleChangeCodeName}
                />
                {errorsCodeName.length > 0 &&
                  <span className={classes.error}>{errorsCodeName}</span>}
              </Grid>
            </Grid>
            <Grid item container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
              <MyButton name={"Sauvegarder"} color={"1"} onClick={handleClickSave} disabled={(accessOrders === 'see' ? true : false)} />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(OrderEdit);
