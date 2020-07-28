import React from 'react';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import { AddOrderStyles as useStyles } from './useStyles';
import { Scrollbars } from 'react-custom-scrollbars';
import AdminService from '../../../services/api.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import {withRouter} from 'react-router-dom';
import authService from 'services/authService';
import { Checkbox } from '@material-ui/core';
const AddOrder = (props) => {
    const classes = useStyles();
    const { history } = props;

    const [visibleIndicator, setVisibleIndicator] = React.useState(false);
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

    const handleClose = () => {
        props.onCancel();
    };
    const handleCreate = () => {
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
            createDiscountCode();
            handleClose();
        }
    }
    const createDiscountCode = () => {
        const requestData = {
            // 'companyID': companyID,
            // 'name': name,
            // 'address': address,
            // 'vote_branches': clefList,
            // 'sepa_name': accountHolder,
            // 'sepa_address': accountAddress,
            // 'iban': accountIban
        }
        setVisibleIndicator(true);
        AdminService.createDiscountCode(requestData)
            .then(
                response => {
                    setVisibleIndicator(false);
                    switch (response.data.code) {
                        case 200:
                            const data = response.data.data;
                            localStorage.setItem("token", JSON.stringify(data.token));
                            props.onAdd();
                            handleClose();
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
    return (
        <Scrollbars style={{ height: '100vh' }}>
            <div className={classes.root}>
                {
                    visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
                }
                <div className={classes.paper} sm={12}>
                    <Grid container spacing={2} >
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
                    </Grid>
                    <div className={classes.footer}>
                        <Grid container justify="space-between">
                            <MyButton name={"Creer"} color={"1"} onClick={handleCreate} />
                            <MyButton name={"Annuler"} bgColor="grey" onClick={handleClose} />
                        </Grid>
                    </div>
                </div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
            </div>
        </Scrollbars>
    );
};

export default withRouter(AddOrder);
