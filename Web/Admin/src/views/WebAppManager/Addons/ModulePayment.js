import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import AdminService, { ManagerService as Service } from '../../../services/api.js';
import { ModulePaymentStyles as useStyles } from './useStyles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import MySelect from 'components/MySelect';


const ManagerService = new Service();
const ModulePayment = (props) => {
  const { history } = props;
  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  var SEPA = require("sepa");
  const accessAddons = authService.getAccess('role_addons');
  const classes = useStyles();
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [accountname, setAccountName] = useState('');
  const [accountaddress, setAccountAddress] = useState('');
  const [IBAN, setIBAN] = useState('');
  const [bundle_name, setBundleName] = useState('');
  const [building_name, setBuildingName] = useState('');
  const [real_price, setRealPrice] = useState(0);
  const [temp_price, setTempPrice] = useState(0);
  const [real_fee_price, setRealFeePrice] = useState(0);
  const [temp_fee_price, setTempFeePrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  // const [codes, setCodes] = useState(['']);
  const [code, setCode] = useState('');
  const [codeID, setCodeID] = useState(-1);
  const [productID, setProductID] = useState(-1);
  const [codeList, setCodeList] = useState(['']);
  const [vat_option, setVatOption] = useState(false);
  const [vat_pro, setVatPro] = useState(0);
  const [apply, setApply] = useState(false);
  const [discount_amount, setDiscountAmount] = useState(0);
  const [discount_type, setDiscountType] = useState('fixed');
  const [renewal, setRenewal] = useState('false');
  const [price_type, setPriceType] = useState('');
  const [billing_cycle, setBillingCycle] = useState('');
  const [price, setPrice] = useState(0);
  const [payment_method, setPaymentMethod] = useState('SEPA');
  const [apartment_amount, setApartAmount] = useState(1);
  const [companyID, setCompanyID] = useState(-1);
  const [buildingID, setBuildingID] = useState(-1);
  const [buyer_name, setBuyerName] = useState('');
  const [errorsIBAN, setErrorsIBAN] = useState('');
  const [errorsCode, setErrorsCode] = useState('');
  const handleClickApply = () => {
    if (codeID !== -1) {
      if (apply) {
        calc_price();
      }
    }else{
      setRealPrice(temp_price);
      setRealFeePrice(temp_fee_price);
    }
  }
  const handleClickPay = () => {
    if(!SEPA.validateIBAN(IBAN)){
      setErrorsIBAN('please enter correct IBAN');
    }
    else if ( accessAddons !== 'denied') {
      let requestData = {
        'productID': productID,
        'companyID': companyID,
        'buildingID': buildingID,
        'buyerID': companyID,
        'buyer_name': buyer_name,
        'billing_cycle': billing_cycle,
        'renewal': renewal,
        'price_type': price_type,
        'price': price,
        'vat_option': vat_option ? 'true' : 'false',
        'vat_fee': vat_pro,
        'apartment_amount': apartment_amount,
        'payment_method': payment_method,
        'discount_codeID': codeID,
        'discount_type': discount_type,
        'discount_amount': discount_amount
      };
      setVisibleIndicator(true);
      ManagerService.buyAddon(requestData)
        .then(
          response => {
            setVisibleIndicator(false);
            switch (response.data.code) {
              case 200:
                const data = response.data.data;
                localStorage.setItem("token", JSON.stringify(data.token));
                ToastsStore.success('You bought new module successfully');
                handleClick();
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
  }
  const handleChangeAccountName = (event) => {
    setAccountName(event.target.value);
  }

  const handleChangeAccountAddress = (event) => {
    setAccountAddress(event.target.value);
  }
  const handleChangeCode = (event) => {
    setCode(event.target.value);
    if(validateCode(event.target.value) !== -1){
      setErrorsCode('');
      setCodeID(codeList[validateCode(event.target.value)].discount_codeID);
    }else{
      setErrorsCode('Invalid Code Promo');
      setCodeID(-1);
    }
  }
  const validateCode = (c) => {
    if(codeList){
      if(codeList.length !== 0){
        for(let i = 0; i < codeList.length; i++)
        if(codeList[i].name === c){
          return i;
        }
      }
    }
    return -1;
  }
  const handleChangeIBAN = (event) => {
    if (!SEPA.validateIBAN(event.target.value))
      setErrorsIBAN('please enter correct IBAN');
    else
      setErrorsIBAN('');
    setIBAN(event.target.value);
  }
  useEffect(() => {
    if (accessAddons !== 'denied') {
      getDatas();
      getBuilding();
      setVisibleIndicator(true);
      ManagerService.getAddon()
        .then(
          response => {
            setVisibleIndicator(false);
            switch (response.data.code) {
              case 200:
                const data = response.data.data;
                localStorage.setItem("token", JSON.stringify(data.token));
                const addon = data.addon[0];
                if (addon) {
                  setBundleName(addon.name);
                  setVatOption(addon.vat_option === 'true' ? true : false);
                  setVatPro(addon.vat_fee);
                  setRealPrice((((100 + addon.vat_fee) * addon.price) / 100).toFixed(2));
                  setTempPrice((((100 + addon.vat_fee) * addon.price) / 100).toFixed(2));
                  setRealFeePrice(((addon.vat_fee * addon.price) / 100).toFixed(2));
                  setTempFeePrice(((addon.vat_fee * addon.price) / 100).toFixed(2));
                  setProductID(addon.productID);
                  setRenewal(addon.renewal);
                  setPriceType(addon.price_type);
                  setBillingCycle(addon.billing_cycle);
                  setPrice(addon.price);
                }
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
  }, [accessAddons]);
  const calc_price = () => {
    if (discount_type === 'fixed') {
      setRealPrice((temp_price - discount_amount).toFixed(2));
      setRealFeePrice((vat_pro * (price - discount_amount)/100).toFixed(2));
    } else if (discount_type === 'percentage') {
      setRealPrice((temp_price * (100 - discount_amount) / 100).toFixed(2));
      setRealFeePrice((vat_pro * (price - (100 - discount_amount))/100).toFixed(2));
    }
    setApply(false);
  }
  useEffect(() => {
    if (codeID !== -1) {
      setApply(true);
      getDiscountCode();
    }
  }, [codeID]);
  const getDiscountCode = () => {
    setVisibleIndicator(true);
    ManagerService.getDiscountCode(codeID)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data.discountCodes;
              localStorage.setItem("token", JSON.stringify(response.data.data.token));
              setDiscountAmount(data.discount_amount);
              setDiscountType(data.discount_type);
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
  const getDatas = () => {
    const requestData = {
      'user_type': 'buildings',
    }
    setVisibleIndicator(true);
    ManagerService.getDiscountCodesList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              codeList.splice(0, codeList.length);
              localStorage.setItem("token", JSON.stringify(data.token));
              setCodeList(data.discountcodelist);
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
          setVisibleIndicator(false);
          ToastsStore.error("Can't connect to the server.");
        }
      );
  }
  const getBuilding = () => {
    setVisibleIndicator(true);
    ManagerService.getBuilding(props.match.params.id)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if (data.building) {
                const building = data.building[0];
                setBuildingName(building.name);
                setAddress(building.address);
                setBuildingID(building.buildingID);
              }
              if (data.company_list) {
                const company = data.company_list[0];
                setAccountName(company.account_holdername ? company.account_holdername : '');
                setAccountAddress(company.account_address ? company.account_address : '');
                setIBAN(company.account_IBAN ? company.account_IBAN : '');
                setBuyerName(company.name);
                setCompanyID(company.companyID);
              }
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
        <Grid item xs={12} sm={6} container justify="flex-start" >
          <Grid item>
            <Typography variant="h2" className={classes.headerTitle}>
              <b>Modules - Paiement</b>
            </Typography>
          </Grid>
        </Grid>
      </div>
      <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la des Modules</p>
      <div className={classes.tool}>
        <Grid item container spacing={1}>
          <Grid item container justify="space-between">
            <Grid item>
              <p className={classes.billingAddress}><b>{bundle_name}</b> : {building_name}</p>
            </Grid>
            <Grid item>
              <p className={classes.billingAddress}>x{quantity}</p>
            </Grid>
          </Grid>
          <Grid item container justify="space-between">
            <Grid item>
              <p className={classes.itemTitle}></p>
            </Grid>
            <Grid item>
              <p className={classes.price}>{real_price}€</p>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.body}>
        <Grid item container direction="column" spacing={5}>
          <Grid item container spacing={1}>
            <Grid item container justify="space-between">
              <Grid item>
                <p className={classes.headerTitle}><b>TOTAL</b></p>
              </Grid>
              <Grid item>
                <p className={classes.price}><b>{real_price}€</b></p>
              </Grid>
            </Grid>
            {
              vat_option ?
                <Grid item container justify="space-between">
                  <Grid item>
                    <p className={classes.itemTitle}>dont TVA à {vat_pro}%</p>
                  </Grid>
                  <Grid item>
                    <p className={classes.itemTitle}>{real_fee_price}€</p>
                  </Grid>
                </Grid>
                :
                null
            }
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <p className={classes.itemTitle}><b>Adresse de Facturation</b></p>
            </Grid>
            <Grid item xs={12}>
              <p className={classes.billingAddress}>{address}</p>
            </Grid>
            <Grid item>
              <p className={classes.modifier}><u>Modifier</u></p>
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={3}>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.sepaItemTitle}>Code Promo</p></Grid>
              <Grid xs={12} sm={4} item container alignItems="stretch">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={code}
                  onChange={handleChangeCode}
                  fullWidth
                />
                {errorsCode.length > 0 &&
                  <span className={classes.error}>{errorsCode}</span>}
              </Grid>
            </Grid>
            <Grid item>
              <MyButton name={"Appliquer"} color={"1"} onClick={handleClickApply} />
            </Grid>
          </Grid>
          <Grid xs={12} sm={10} md={8} lg={6} item container direction="column" spacing={3}>
            <Grid item>
              <p className={classes.itemTitle}><b>Moyen de Paiement</b></p>
            </Grid>
            <Grid item>
              <p className={classes.sepaItemTitle}>Compte bancaire - Prelevement SEPA</p>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>Nom du titulaire du compte</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={accountname}
                      onChange={handleChangeAccountName}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="flex-start" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>Adresse</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      multiline
                      variant="outlined"
                      value={accountaddress}
                      onChange={handleChangeAccountAddress}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>IBAN</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={IBAN}
                      onChange={handleChangeIBAN}
                      fullWidth
                    />
                    {errorsIBAN.length > 0 &&
                      <span className={classes.error}>{errorsIBAN}</span>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justify="center" style={{ marginTop: 80 }}>
          <MyButton name={"Payer"} color={"1"} onClick={handleClickPay} />
        </Grid>
      </div>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(ModulePayment);
