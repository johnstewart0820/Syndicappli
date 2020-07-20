import React, { useEffect } from 'react';
import { AddUserStyles as useStyles } from './useStyles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Multiselect from '../../../components/Multiselect.js';
import AdminService from '../../../services/api.js';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import CircularProgress from '@material-ui/core/CircularProgress';
import useGlobal from 'Global/global';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const AddUser = (props) => {
    const classes = useStyles();
    const [globalState, globalActions] = useGlobal();
    const permissionList = ['Voir', 'Editer', 'Refusé'];
    const role_permission = ['see', 'edit', 'denied'];
    const [companyList, setCompanyList] = React.useState([]);
    let companyID = [];
    const [visibleIndicator, setVisibleIndicator] = React.useState(false);

    const [avatarurl, setAvatarUrl] = React.useState("");
    const [avatar, setAvatar] = React.useState(null);
    const [lastname, setLastName] = React.useState('');
    const [firstname, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phonenumber, setPhoneNumber] = React.useState('');
    const [companiesPermission, setCompaniesPermission] = React.useState(0);
    const [buildingsPermission, setBuildingsPermission] = React.useState(0);
    const [managersPermission, setManagersPermission] = React.useState(0);
    const [ownersPermission, setOwnersPermission] = React.useState(0);
    const [ordersPermission, setOrdersPermission] = React.useState(0);
    const [productsPermission, setProductsPermission] = React.useState(0);
    const [discountCodesPermission, setDiscountodesPermission] = React.useState(0);
    const [usersPermission, setUsersPermission] = React.useState(0);

    const [errorsCompanies, setErrorsCompanies] = React.useState('');
    const [errorsLastname, setErrorsLastname] = React.useState('');
    const [errorsFirstname, setErrorsFirstname] = React.useState('');
    const [errorsEmail, setErrorsEmail] = React.useState('');
    const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
    const handleClose = () => {
        props.onCancel();
    };
    const handleCreate = () => {
        let cnt = 0;
        if (lastname.length === 0) { setErrorsLastname('please enter your last name'); cnt++; }
        else setErrorsLastname('');
        if (firstname.length === 0) { setErrorsFirstname('please enter your first name'); cnt++; }
        else setErrorsFirstname('');
        if (globalState.multi_ID.length === 0) { setErrorsCompanies('please select companies'); cnt++; }
        else setErrorsCompanies('');
        if (email.length === 0) { setErrorsEmail('please enter your email'); cnt++; }
        else setErrorsEmail('');
        if (phonenumber.length === 0) { setErrorsPhonenumber('please enter your phone number'); cnt++; }
        else setErrorsPhonenumber('');
        if (cnt === 0) {
            createUser();
        }
    }
    const handleLoadFront = (event) => {
        setAvatar(event.target.files[0]);
        setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleChangeEmail = (event) => {
        event.preventDefault();
        let errorsMail =
            validEmailRegex.test(event.target.value)
                ? ''
                : 'Email is not valid!';
        setEmail(event.target.value);
        setErrorsEmail(errorsMail);
    }
    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleChangeCompanies = async (val) => {
        if (val !== null) {
            await globalActions.setMultiTags(val);
            companyID.splice(0, companyID.length)
            for (let i = 0; i < val.length; i++)
                for (let j = 0; j < companyList.length; j++)
                    if (val[i].label == companyList[j].name) {
                        companyID.push(companyList[j].companyID);
                    }
            globalActions.setMultiID(companyID);
        }
        else {
            await globalActions.setMultiTags([]);
            globalActions.setMultiID([]);
        }
    };
    const handleChangeCompaniesPermission = (val) => {
        setCompaniesPermission(val);
    }
    const handleChangeManagersPermission = (val) => {
        setManagersPermission(val);
    }
    const handleChangeBuildingsPermission = (val) => {
        setBuildingsPermission(val);
    }
    const handleChangeOwnersPermission = (val) => {
        setOwnersPermission(val);
    }
    const handleChangeOrdersPermission = (val) => {
        setOrdersPermission(val);
    }
    const handleChangeDiscountCodesPermission = (val) => {
        setDiscountodesPermission(val);
    }
    const handleChangeProductsPermission = (val) => {
        setProductsPermission(val);
    }
    const handleChangeUsersPermission = (val) => {
        setUsersPermission(val);
    }
    useEffect(() => {
        getCompanies();
    }, []);
    const getCompanies = () => {
        setVisibleIndicator(true);
        AdminService.getCompanyListByUser()
            .then(
                response => {
                    setVisibleIndicator(false);
                    if (response.data.code !== 200) {
                        ToastsStore.error(response.data.message);
                    } else {
                        const data = response.data.data;
                        localStorage.setItem("token", JSON.stringify(data.token));
                        let companies = [];
                        data.companylist.map((item, i) => (
                            companies[i] = { label: item.name, value: item.companyID }
                        )
                        );
                        setCompanyList(data.companylist);
                        globalActions.setMultiSuggestions(companies);
                    }
                },
                error => {
                    ToastsStore.error("Can't connect to the server!");
                    setVisibleIndicator(false);
                }
            );
    }
    const createUser = () => {
        let permissionInfos = [
            {
                'role_name': 'role_companies',
                'permission': role_permission[companiesPermission]
            },
            {
                'role_name': 'role_managers',
                'permission': role_permission[managersPermission]
            },
            {
                'role_name': 'role_buildings',
                'permission': role_permission[buildingsPermission]
            },
            {
                'role_name': 'role_owners',
                'permission': role_permission[ownersPermission]
            },
            {
                'role_name': 'role_orders',
                'permission': role_permission[ordersPermission]
            },
            {
                'role_name': 'role_products',
                'permission': role_permission[productsPermission]
            },
            {
                'role_name': 'role_discountcodes',
                'permission': role_permission[discountCodesPermission]
            },
            {
                'role_name': 'role_users',
                'permission': role_permission[usersPermission]
            },
        ]
        let formdata = new FormData();
        formdata.set('firstname', firstname);
        formdata.set('lastname', lastname);
        formdata.set('email', email);
        formdata.set('phone', phonenumber);
        formdata.set('companyID', JSON.stringify(globalState.multi_ID));
        formdata.set('logo', avatar === null ? '' : avatar);
        formdata.set('permission_info', JSON.stringify(permissionInfos));

        setVisibleIndicator(true);
        AdminService.createUser(formdata)
            .then(
                response => {
                    setVisibleIndicator(false);
                    if (response.data.code !== 200) {
                        ToastsStore.error(response.data.message);
                    } else {
                        const data = response.data.data;
                        localStorage.setItem("token", JSON.stringify(data.token));
                        props.onAdd();
                        handleClose();
                    }
                },
                error => {
                    ToastsStore.error("Can't connect to the server!");
                    setVisibleIndicator(false);
                }
            );
    }
    return (
        <div className={classes.root}>
            {
                visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
            }
            <div className={classes.paper} sm={12}>
                <Grid container spacing={2} >
                    <Grid item container alignItems="center">
                        <Grid xs={3} item container><p className={classes.title}>Carbinets</p></Grid>
                        <Grid xs={9} item container alignItems="stretch">
                            <Multiselect
                                selected={globalState.multi_tags}
                                no={'No companies found'}
                                all={globalState.multi_suggestions}
                                onSelected={handleChangeCompanies}
                                width="100%"
                            />
                            {errorsCompanies.length > 0 &&
                                <span className={classes.error}>{errorsCompanies}</span>}
                        </Grid>
                    </Grid>
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid xs={3} item container><p className={classes.title}>Nom</p></Grid>
                        <Grid xs={9} item container>
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                value={lastname}
                                onChange={handleChangeLastName}
                            />
                            {errorsLastname.length > 0 &&
                                <span className={classes.error}>{errorsLastname}</span>}
                        </Grid>
                        <Grid xs={3} item />
                    </Grid>
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid xs={3} item container><p className={classes.title}>Prénom</p></Grid>
                        <Grid xs={9} item container>
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                value={firstname}
                                onChange={handleChangeFirstName}
                            />
                            {errorsFirstname.length > 0 &&
                                <span className={classes.error}>{errorsFirstname}</span>}
                        </Grid>
                    </Grid>
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid xs={3} item container><p className={classes.title}>Email</p></Grid>
                        <Grid xs={9} item container>
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                            {errorsEmail.length > 0 &&
                                <span className={classes.error}>{errorsEmail}</span>}
                        </Grid>
                    </Grid>
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid xs={3} item container><p className={classes.title}>Téléphone</p></Grid>
                        <Grid xs={9} item container>
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                value={phonenumber}
                                onChange={handleChangePhoneNumber}
                            />
                            {errorsPhonenumber.length > 0 &&
                                <span className={classes.error}>{errorsPhonenumber}</span>}
                        </Grid>
                    </Grid>
                    <Grid xs={12} item container direction="column" >
                        <p className={classes.title}>Photo</p>
                        <Grid item container justify="flex-start">
                            <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront} />
                            <label htmlFor="img_front">
                                {
                                    avatarurl === '' ?
                                        <div className={classes.img}>
                                            <AddCircleOutlineIcon className={classes.plus} />
                                        </div> :
                                        <img className={classes.img} src={avatarurl} alt="" />
                                }
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <p className={classes.title}><b>Permissions</b></p>
                <br />
                <Grid container spacing={2}>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Cabinets</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeCompaniesPermission}
                            value={companiesPermission}
                        />
                    </Grid>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Gestionnaires</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeManagersPermission}
                            value={managersPermission}
                        />
                    </Grid>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Immeuables</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeBuildingsPermission}
                            value={buildingsPermission}
                        />
                    </Grid>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Coproprietaires</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeOwnersPermission}
                            value={ownersPermission}
                        />
                    </Grid>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Commandes</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeOrdersPermission}
                            value={ordersPermission}
                        />
                    </Grid>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Prodults</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeProductsPermission}
                            value={productsPermission}
                        />
                    </Grid>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Codes Promo</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeDiscountCodesPermission}
                            value={discountCodesPermission}
                        />
                    </Grid>
                    <Grid xs={6} item container direction="column">
                        <p className={classes.title}>Utilisateurs</p>
                        <MySelect
                            color="gray"
                            data={permissionList}
                            onChangeSelect={handleChangeUsersPermission}
                            value={usersPermission}
                        />
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
    );
};

export default AddUser;
