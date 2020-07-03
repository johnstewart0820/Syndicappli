import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../components/MyButton';
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../components/MySelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {COUNTRIES} from '../../components/countries';
import Multiselect from '../../components/Multiselect.js';
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
            width: 160
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
    img: {
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        border: '1px dashed rgba(112,112,112,0.43)',
        borderRadius: 8,
        width: 116,
        height: 92,
    },
    error:{
        color: 'red'
    }
}));

const AddManager = (props) => {
  const classes = useStyles();
  
  const permissionList = ['','Editer', 'Voir', 'Refusé'];
  const selected = [
    { label: "Albania",value: "Albania"},
    { label: "Argentina",value: "Argentina"},
    { label: "Austria",value: "Austria"},
    { label: "Cocos Islands",value: "Cocos Islands"},
    { label: "Kuwait",value: "Kuwait"},
    { label: "Sweden",value: "Sweden"},
    { label: "Venezuela",value: "Venezuela"}
  ];
  const [companies, setCompanies] = React.useState(selected);
  const [buildings, setBuildings] = React.useState(selected);
  const companiesList = COUNTRIES.map((country,id) => {
    return {
      label: country
    }
  })
  const buildingsList = companiesList;
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [lastname, setLastName] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');

  const [buildingsPermission, setBuildingsPermission] = React.useState('');
  const [chatPermission, setChatPermission] = React.useState('');
  const [ownersPermission, setOwnersPermission] = React.useState('');
  const [incidentsPermission, setIncidentsPermission] = React.useState('');
  const [assembliesPermission, setAssembliesPermission] = React.useState('');
  const [eventsPermission, setEventsPermission] = React.useState('');
  const [teamPermission, setTeamPermission] = React.useState('');
  const [providersPermission, setProvidersPermission] = React.useState('');
  const [announcementsPermission, setAnnouncementsPermission] = React.useState('');
  const [companyPermission, setCompanyPermission] = React.useState('');
  const [addonsPermission, setAddonsPermission] = React.useState('');
  const [invoicesPermission, setInvoicesPermission] = React.useState('');
  const [paymentMethodsPermission, setPaymentMethodsPermission] = React.useState('');
  
  const [errorsCompanies, setErrorsCompanies] = React.useState('');
  const [errorsBuildings, setErrorsBuildings] = React.useState('');
  const [errorsLastname, setErrorsLastname] = React.useState('');
  const [errorsFirstname, setErrorsFirstname] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
  const [errorsBuildingsPermission, setErrorsBuildingsPermission] = React.useState('');
  const [errorsIncidentsPermission, setErrorsIncidentsPermission] = React.useState('');
  const [errorsOwnersPermission, setErrorsOwnersPermission] = React.useState('');
  const [errorsChatPermission, setErrorsChatPermission] = React.useState('');
  const [errorsAssembliesPermission, setErrorsAssembliesPermission] = React.useState('');
  const [errorsEventsPermission, setErrorsEventsPermission] = React.useState('');
  const [errorsTeamPermission, setErrorsTeamPermission] = React.useState('');
  const [errorsProvidersPermission, setErrorsProvidersPermission] = React.useState('');
  const [errorsAnnouncementsPermission, setErrorsAnnouncementsPermission] = React.useState('');
  const [errorsCompanyPermission, setErrorsCompanyPermission] = React.useState('');
  const [errorsAddonsPermission, setErrorsAddonsPermission] = React.useState('');
  const [errorsInvoicesPermission, setErrorsInvoicesPermission] = React.useState('');
  const [errorsPaymentMethodsPermission, setErrorsPaymentMethodsPermission] = React.useState('');

  const handleClose = ()=>{
    props.onCancel();
  };
  const handleCreate = ()=>{
    let cnt = 0;
    if(lastname.length === 0) {setErrorsLastname('please enter your last name'); cnt++;}
    else setErrorsLastname('');
    if(firstname.length === 0) {setErrorsFirstname('please enter your first name'); cnt++;}
    else setErrorsFirstname('');
    if(companies.length === 0) {setErrorsCompanies('please select companies'); cnt++;}
    else setErrorsCompanies('');
    if(buildings.length === 0) {setErrorsBuildings('please select buildings'); cnt++;}
    else setErrorsBuildings('');
    if(email.length === 0) {setErrorsEmail('please enter your email'); cnt++;}
    else setErrorsEmail('');
    if(phonenumber.length === 0) {setErrorsPhonenumber('please enter your phone number'); cnt++;}
    else setErrorsPhonenumber('');
    if(buildingsPermission.length === 0) {setErrorsBuildingsPermission('please select permission to buildings'); cnt++;}
    else setErrorsBuildingsPermission('');
    if(ownersPermission.length === 0) {setErrorsOwnersPermission('please select permission to owners'); cnt++;}
    else setErrorsOwnersPermission('');
    if(chatPermission.length === 0) {setErrorsChatPermission('please select permission to chat'); cnt++;}
    else setErrorsChatPermission('');
    if(incidentsPermission.length === 0) {setErrorsIncidentsPermission('please select permission to incidents'); cnt++;}
    else setErrorsIncidentsPermission('');
    if(assembliesPermission.length === 0) {setErrorsAssembliesPermission('please select permission to assemblies'); cnt++;}
    else setErrorsAssembliesPermission('');
    if(eventsPermission.length === 0) {setErrorsEventsPermission('please select permission to events'); cnt++;}
    else setErrorsEventsPermission('');
    if(teamPermission.length === 0) {setErrorsTeamPermission('please select permission to team'); cnt++;}
    else setErrorsTeamPermission('');
    if(providersPermission.length === 0) {setErrorsProvidersPermission('please select permission to providers'); cnt++;}
    else setErrorsProvidersPermission('');
    if(announcementsPermission.length === 0) {setErrorsAnnouncementsPermission('please select permission to announcements'); cnt++;}
    else setErrorsAnnouncementsPermission('');
    if(companyPermission.length === 0) {setErrorsCompanyPermission('please select permission to company'); cnt++;}
    else setErrorsCompanyPermission('');
    if(addonsPermission.length === 0) {setErrorsAddonsPermission('please select permission to addons'); cnt++;}
    else setErrorsAddonsPermission('');
    if(invoicesPermission.length === 0) {setErrorsInvoicesPermission('please select permission to invoices'); cnt++;}
    else setErrorsInvoicesPermission('');
    if(paymentMethodsPermission.length === 0) {setErrorsPaymentMethodsPermission('please select permission to payment methods'); cnt++;}
    else setErrorsPaymentMethodsPermission('');

    if(cnt ===0){

        handleClose();
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
    setEmail(event.target.value);
}
const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
}
const handleChangeCompanies = (val) => {
    setCompanies(val);
}
const handleChangeBuildings = (val) => {
    setBuildings(val);
}
const handleChangeBuildingsPermission = (val) => {
    setBuildingsPermission(val);
}
const handleChangeOwnersPermission = (val) => {
    setOwnersPermission(val);
}
const handleChangeChatPermission = (val) => {
    setChatPermission(val);
}
const handleChangeIncidentsPermission = (val) => {
    setIncidentsPermission(val);
}
const handleChangeAssembliesPermission = (val) => {
    setAssembliesPermission(val);
}
const handleChangeEventsPermission = (val) => {
    setEventsPermission(val);
}
const handleChangeTeamPermission = (val) => {
    setTeamPermission(val);
}
const handleChangeProvidersPermission = (val) => {
    setProvidersPermission(val);
}
const handleChangeAnnouncementsPermission = (val) => {
    setAnnouncementsPermission(val);
}
const handleChangeCompanyPermission = (val) => {
    setCompanyPermission(val);
}
const handleChangeAddonsPermission = (val) => {
    setAddonsPermission(val);
}
const handleChangeInvoicesPermission = (val) => {
    setInvoicesPermission(val);
}
const handleChangePaymentMethodsPermission = (val) => {
    setPaymentMethodsPermission(val);
}
  return (
    <div className={classes.root}>
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container justify="center" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Carbinet</p></Grid>
                    <Grid xs={9} item container>
                        <Multiselect
                            selected={companies}
                            no={'No companies found'}
                            hint={'Add new Companies'}
                            all={companiesList} 
                            onSelected={handleChangeCompanies}
                        />
                        {errorsCompanies.length > 0 && 
                        <span className={classes.error}>{errorsCompanies}</span>}
                    </Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Immeubles</p></Grid>
                    <Grid xs={9} item container>
                         <Multiselect
                            selected={buildings}
                            no={'No buildings found'}
                            hint={'Add new Buildings'}
                            all={buildingsList} 
                            onSelected={handleChangeBuildings}
                        />
                        {errorsBuildings.length > 0 && 
                        <span className={classes.error}>{errorsBuildings}</span>}
                    </Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Nom</p></Grid>
                    <Grid xs={6} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={lastname}
                            onChange={handleChangeLastName} 
                        />
                        {errorsLastname.length > 0 && 
                        <span className={classes.error}>{errorsLastname}</span>}
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Prénom</p></Grid>
                    <Grid xs={6} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={firstname}
                            onChange={handleChangeFirstName} 
                        />
                        {errorsFirstname.length > 0 && 
                        <span className={classes.error}>{errorsFirstname}</span>}
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Email</p></Grid>
                    <Grid xs={6} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={email}
                            onChange={handleChangeEmail} 
                        />
                        {errorsEmail.length > 0 && 
                        <span className={classes.error}>{errorsEmail}</span>}
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Téléphone</p></Grid>
                    <Grid xs={6} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={phonenumber}
                            onChange={handleChangePhoneNumber} 
                        />
                        {errorsPhonenumber.length > 0 && 
                        <span className={classes.error}>{errorsPhonenumber}</span>}
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                <Grid xs={12} item container direction="column" >
                    <p style={{fontSize:18}}>Photo</p>
                    <Grid item container justify="flex-start">
                    <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                    <label htmlFor="img_front">
                        {
                            avatarurl === '' ?
                             <div className={classes.img}>
                                <AddCircleOutlineIcon style={{width:31 , height: 31, color: '#707070'}}/>
                             </div> :
                             <img className={classes.img} src={avatarurl} alt=""/>
                        }
                    </label>
                    </Grid>
                </Grid>
            </Grid>
            <br/>
            <p style={{fontSize:18}}><b>Permissions</b></p>
            <br />
            <Grid container spacing={2}>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Immeubles</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeBuildingsPermission}
                        value={buildingsPermission}
                    />
                    {errorsBuildingsPermission.length > 0 && 
                        <span className={classes.error}>{errorsBuildingsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Copropriétaires</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeOwnersPermission}
                        value={ownersPermission}
                    />
                    {errorsOwnersPermission.length > 0 && 
                        <span className={classes.error}>{errorsOwnersPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Messagerie</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeChatPermission}
                        value={chatPermission}
                    />
                    {errorsChatPermission.length > 0 && 
                        <span className={classes.error}>{errorsChatPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Incidents</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeIncidentsPermission}
                        value={incidentsPermission}
                    />
                    {errorsIncidentsPermission.length > 0 && 
                        <span className={classes.error}>{errorsIncidentsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Assemblées</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeAssembliesPermission}
                        value={assembliesPermission}
                    />
                    {errorsAssembliesPermission.length > 0 && 
                        <span className={classes.error}>{errorsAssembliesPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Événements</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeEventsPermission}
                        value={eventsPermission}
                    />
                    {errorsEventsPermission.length > 0 && 
                        <span className={classes.error}>{errorsEventsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Équipe</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeTeamPermission}
                        value={teamPermission}
                    />
                    {errorsTeamPermission.length > 0 && 
                        <span className={classes.error}>{errorsTeamPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Prestataires</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeProvidersPermission}
                        value={providersPermission}
                    />
                    {errorsProvidersPermission.length > 0 && 
                        <span className={classes.error}>{errorsProvidersPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Annonces</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeAnnouncementsPermission}
                        value={announcementsPermission}
                    />
                    {errorsAnnouncementsPermission.length > 0 && 
                        <span className={classes.error}>{errorsAnnouncementsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Cabinet</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeCompanyPermission}
                        value={companyPermission}
                    />
                    {errorsCompanyPermission.length > 0 && 
                        <span className={classes.error}>{errorsCompanyPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Modules</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeAddonsPermission}
                        value={addonsPermission}
                    />
                    {errorsAddonsPermission.length > 0 && 
                        <span className={classes.error}>{errorsAddonsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Factures</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangeInvoicesPermission}
                        value={invoicesPermission}
                    />
                    {errorsInvoicesPermission.length > 0 && 
                        <span className={classes.error}>{errorsInvoicesPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Moyens de paiement</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={permissionList} 
                        onChangeSelect={handleChangePaymentMethodsPermission}
                        value={paymentMethodsPermission}
                    />
                    {errorsPaymentMethodsPermission.length > 0 && 
                        <span className={classes.error}>{errorsPaymentMethodsPermission}</span>}
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

export default AddManager;
