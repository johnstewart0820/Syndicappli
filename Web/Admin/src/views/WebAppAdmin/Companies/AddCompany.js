import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../../../components/MyButton';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AddCompanyStyles as useStyles } from './useStyles';
import { Checkbox } from '@material-ui/core';
import AdminService from '../../../services/api.js';
import authService from 'services/authService';
import { withRouter } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { Scrollbars } from 'react-custom-scrollbars';
import MuiPhoneNumber from 'material-ui-phone-number';
import SEPA from 'sepa';
import { isInteger, isNumber } from 'validate.js';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}
const AddCompany = (props) => {
    const { history } = props;
    const classes = useStyles();

    const [avatarurl, setAvatarUrl] = React.useState("");
    const [avatar, setAvatar] = React.useState(null);
    const [visibleIndicator, setVisibleIndicator] = React.useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [siret, setSiret] = useState('');
    const [vat, setVat] = useState('');
    const [accountname, setAccountName] = useState('');
    const [accountaddress, setAccountAddress] = useState('');
    const [IBAN, setIBAN] = useState('');
    const [assemblies360, setAssemblies360] = useState(false);
    const [assembliesWebcam, setAssembliesWebcam] = useState(false);
    const [assembliesAudio, setAssembliesAudio] = useState(false);
    const [statusActive, setStatusActive] = useState(false);
    const [statusInActive, setStatusInActive] = useState(false);

    const [errorsName, setErrorsName] = React.useState('');
    const [errorsAddress, setErrorsAddress] = React.useState('');
    const [errorsEmail, setErrorsEmail] = React.useState('');
    const [errorsPhone, setErrorsPhone] = React.useState('');
    const [errorsSiret, setErrorsSiret] = React.useState('');
    const [errorsStatus, setErrorsStatus] = React.useState('');
    const [errorsIBAN, setErrorsIBAN] = React.useState('');
    const [errorsAccountAddress, setErrorsAccountAddress] = useState('');
    const [errorsAccountHolder, setErrorsAccountHolder] = useState('');
    const handleClose = () => {
        props.onCancel();
    };

    const handleLoadFront = (event) => {
        if (event.target.files[0] !== undefined) {
            if (validFileType(event.target.files[0])) {
                if (event.target.files[0].size > 5 * 1048576) {
                    ToastsStore.warning('Image size should be low than 5 MB.');
                } else {
                    setAvatar(event.target.files[0]);
                    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
                }
            }
            else {
                ToastsStore.warning('Image format is not coreect.');
            }
        }
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
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

    const handleChangePhone = (val) => {
        setPhone(val);
    }

    const handleChangeSiret = (event) => {
        if(event.target.value[event.target.value.length-1] === '.')
            return;
        if(Number.isInteger(Number(event.target.value))){
            if (event.target.value.length < 15)
                setSiret(event.target.value);
        }
    }

    const handleChangeVat = (event) => {
        setVat(event.target.value);
    }

    const handleChangeAccountName = (event) => {
        setAccountName(event.target.value);
    }

    const handleChangeAccountAddress = (event) => {
        setAccountAddress(event.target.value);
    }

    const handleChangeIBAN = (event) => {
        if (!SEPA.validateIBAN(event.target.value))
            setErrorsIBAN('please enter correct IBAN');
        else
            setErrorsIBAN('');
        if (event.target.value.length === 0)
            setErrorsIBAN('');
        setIBAN(event.target.value);
    }

    const handleClickAdd = () => {
        let cnt = 0;
        if (name.length === 0) { setErrorsName('please enter your new company name'); cnt++; }
        else setErrorsName('');
        if (address.length === 0) { setErrorsAddress('please enter contact information of this company'); cnt++; }
        else setErrorsAddress('');
        if (email.length === 0) { setErrorsEmail('please enter your email'); cnt++; }
        else setErrorsEmail('');
        if (phone.length === 0) { setErrorsPhone('please enter your phone number'); cnt++; }
        else setErrorsPhone('');
        if (siret.length !== 14) { setErrorsSiret('please check your company SIRET'); cnt++; }
        else setErrorsSiret('');
        if (statusActive === false && statusInActive === false) { setErrorsStatus('please select company status'); cnt++; }
        else setErrorsStatus('');
        if (IBAN.length !== 0) {
            if (!SEPA.validateIBAN(IBAN)) {
                setErrorsIBAN('please enter correct IBAN');
                cnt++;
            } else {
                if (accountaddress.length === 0) { setErrorsAccountAddress('please enter your address'); cnt++; }
                else setErrorsAccountAddress('');
                if (accountname.length === 0) { setErrorsAccountHolder('please enter bank account name'); cnt++; }
                else setErrorsAccountHolder('');
            }
        }
        if (cnt === 0) {
            addCompany();
        }
    }
    const handleChangeAssemblies360 = (event) => {
        setAssemblies360(event.target.checked);
    }
    const handleChangeAssembliesWebcam = (event) => {
        setAssembliesWebcam(event.target.checked);
    }
    const handleChangeAssembliesAudio = (event) => {
        setAssembliesAudio(event.target.checked);
    }
    const handleChangeStatusActive = (event) => {
        setStatusActive(event.target.checked);
        if (statusActive)
            setStatusInActive(!statusActive);
        else
            setStatusInActive(statusActive);
    }
    const handleChangeStatusInActive = (event) => {
        setStatusInActive(event.target.checked);
        if (statusInActive)
            setStatusActive(!statusInActive);
        else
            setStatusActive(statusInActive);
    }
    const addCompany = () => {
        let formdata = new FormData();
        formdata.set('name', name);
        formdata.set('address', address);
        formdata.set('email', email);
        formdata.set('phone', phone);
        formdata.set('SIRET', siret);
        formdata.set('address', address);
        formdata.set('VAT', vat);
        formdata.set('account_holdername', accountname);
        formdata.set('account_address', accountaddress);
        formdata.set('account_IBAN', IBAN);
        formdata.set('access_360cam', assemblies360 ? 'true' : 'false');
        formdata.set('access_webcam', assembliesWebcam ? 'true' : 'false');
        formdata.set('access_audio', assembliesAudio ? 'true' : 'false');
        formdata.set('status', statusActive === true ? 'active' : 'inactive');
        formdata.set('logo', avatar === null ? '' : avatar);

        setVisibleIndicator(true);
        AdminService.addCompany(formdata)
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
                    console.log('fail');
                    setVisibleIndicator(false);
                }
            );
    }
    return (
        <Scrollbars style={{ height: '100vh' }}>
            <div className={classes.root}>
                {
                    visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
                }
                <div className={classes.paper} >
                    <Grid container spacing={4}>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>Nom</p></Grid>
                            <Grid xs item container alignItems="stretch">
                                <TextField
                                    className={classes.text}
                                    variant="outlined"
                                    value={name}
                                    onChange={handleChangeName}
                                    fullWidth
                                />
                                {errorsName.length > 0 &&
                                    <span className={classes.error}>{errorsName}</span>}
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item><p className={classes.title}>Coordonnées</p></Grid>
                            <Grid item container alignItems="stretch">
                                <TextField
                                    multiline
                                    variant="outlined"
                                    value={address}
                                    onChange={handleChangeAddress}
                                    fullWidth
                                />
                                {errorsAddress.length > 0 &&
                                    <span className={classes.error}>{errorsAddress}</span>}
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>Email</p></Grid>
                            <Grid xs item container alignItems="stretch">
                                <TextField
                                    className={classes.text}
                                    variant="outlined"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    fullWidth
                                />
                                {errorsEmail.length > 0 &&
                                    <span className={classes.error}>{errorsEmail}</span>}
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>Téléphone</p></Grid>
                            <Grid xs item container alignItems="stretch">
                                <MuiPhoneNumber
                                    defaultCountry='fr'
                                    className={classes.text}
                                    variant="outlined"
                                    value={phone}
                                    onChange={handleChangePhone}
                                    fullWidth
                                />
                                {errorsPhone.length > 0 &&
                                    <span className={classes.error}>{errorsPhone}</span>}
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>SIRET</p></Grid>
                            <Grid xs item container alignItems="stretch">
                                <TextField
                                    className={classes.text}
                                    variant="outlined"
                                    value={siret}
                                    onChange={handleChangeSiret}
                                    type="tel"
                                    fullWidth
                                />
                                {errorsSiret.length > 0 &&
                                    <span className={classes.error}>{errorsSiret}</span>}
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>N° TVA intracommunautaire</p></Grid>
                            <Grid xs item container alignItems="stretch">
                                <TextField
                                    className={classes.text}
                                    variant="outlined"
                                    value={vat}
                                    onChange={handleChangeVat}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>Compte Bancaire - Prelevement SEPA</p></Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>Nom du titulaire du compte</p></Grid>
                            <Grid xs item container alignItems="stretch">
                                <TextField
                                    className={classes.text}
                                    variant="outlined"
                                    value={accountname}
                                    onChange={handleChangeAccountName}
                                    fullWidth
                                />
                                {errorsAccountHolder.length > 0 &&
                                    <span className={classes.error}>{errorsAccountHolder}</span>}
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="flex-start" spacing={2}>
                            <Grid item><p className={classes.title}>Adresse</p></Grid>
                            <Grid xs item container alignItems="stretch">
                                <TextField
                                    className={classes.text}
                                    multiline
                                    variant="outlined"
                                    value={accountaddress}
                                    onChange={handleChangeAccountAddress}
                                    fullWidth
                                />
                                {errorsAccountAddress.length > 0 &&
                                    <span className={classes.error}>{errorsAccountAddress}</span>}
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item><p className={classes.title}>IBAN</p></Grid>
                            <Grid xs item container alignItems="stretch">
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
                        <Grid xs={12} item container direction="column" spacing={2}>
                            <Grid item><p className={classes.title}>Logo</p></Grid>
                            <Grid item container justify="flex-start">
                                <input className={classes.input} type="file" id="img_front" accept="image/*" onChange={handleLoadFront} />
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
                        <Grid item container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item ><p className={classes.title}>Assemblées Générales en 360</p></Grid>
                                    <Grid xs item container>
                                        <Checkbox
                                            checked={assemblies360}
                                            onChange={handleChangeAssemblies360}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item><p className={classes.title}>Assemblées générales en Webcam</p></Grid>
                                    <Grid xs item container>
                                        <Checkbox
                                            checked={assembliesWebcam}
                                            onChange={handleChangeAssembliesWebcam}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item><p className={classes.title}>Assemblées Générales en Audio</p></Grid>
                                    <Grid xs item container>
                                        <Checkbox
                                            checked={assembliesAudio}
                                            onChange={handleChangeAssembliesAudio}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item><p className={classes.title}>Statut Du Cabinet</p></Grid>
                        <Grid item container direction="row">
                            <Grid item>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item ><p className={classes.title}>actif</p></Grid>
                                    <Grid xs item container>
                                        <Checkbox
                                            checked={statusActive}
                                            onChange={handleChangeStatusActive}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item><p className={classes.title}>inactif</p></Grid>
                                    <Grid xs item container>
                                        <Checkbox
                                            checked={statusInActive}
                                            onChange={handleChangeStatusInActive}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {errorsStatus.length > 0 &&
                                <span className={classes.error}>{errorsStatus}</span>}
                        </Grid>
                    </Grid>
                    <div className={classes.footer}>
                        <Grid container justify="space-between">
                            <MyButton name={"Ajouter"} color={"1"} onClick={handleClickAdd} />
                            <MyButton name={"Annuler"} bgColor="gray" onClick={handleClose} />

                        </Grid>
                    </div>
                </div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
            </div>
        </Scrollbars>
    );
};

export default withRouter(AddCompany);
