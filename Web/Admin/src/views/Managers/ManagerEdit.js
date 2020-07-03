import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../components/MySelect';
import MyButton from 'components/MyButton';
import theme from 'theme';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import authService from '../../services/authService.js';
import {COUNTRIES} from '../../components/countries';
import Multiselect from '../../components/Multiselect.js';
import MyDialog from '../../components/MyDialog.js';
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-input':{
        padding: '17px 25px',
        fontSize: 22,
    },
    '& p':{
      marginBottom: 0
    }
  },
  tool: {
    minHeight: '67px'
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  body:{
    marginTop: theme.spacing(8),
    borderRadius: '30px',
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
    padding: theme.spacing(5)
  },
  item:{
    marginTop: theme.spacing(5),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  size: {
    width: 214,
    height: 214,
    cursor: 'pointer',
  },
  input: {
    display: 'none',
  }, 
  div_indicator: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    paddingLeft: '50%',
    alignItems: 'center',
    marginTop: '-60px',
    zIndex: 999,
  },
  indicator: {
    color: 'gray'
  },
  error:{
    color: 'red'
  },
}));
const ManagerEdit = (props) => {
  const {history} = props;

  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/login");
  //   window.location.reload();
  // }
  const accessManagers = authService.getAccess('role_managers');
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useStyles();
  const permissionList = ['','Editer', 'Voir', 'Refusé'];
  const itemPermission ={'edit' : 0 , 'see' : 1, 'denied' : 2};

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
  const allCompanies =  COUNTRIES.map((country,id) => {
    return {
      label: country, value: country
    }
  })
  const allBuildings = allCompanies;
  useEffect(() => {
    if(accessManagers === 'Denied'){
      setOpenDialog(true);
    }
    if(accessManagers !== 'Denied'){
      //  
    }
  },[accessManagers]);

  const handleClick = ()=>{
    history.goBack();
  };
  const onClickSave = ()=>{
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

    }
  }
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
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
  console.log(companies);
}

const handleChangeBuildings = (val) => {
  setBuildings(val);
}
const handleLoadFront = (event) => {
  setAvatar(event.target.files[0]);
  setAvatarUrl(URL.createObjectURL(event.target.files[0]));
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
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Michel Dupont</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} style={{cursor:'pointer',fontSize:18}}>&lt; Retour à la liste des Gestionnaires</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid item container justify="space-between" direction="row-reverse" spacing={2}>
            <Grid xs item container  direction="column" spacing={2}>
                <Grid item container direction="row-reverse">
                  <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                  <label htmlFor="img_front">
                  {
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                      right: -20,
                      top: 10,
                      border: '2px solid gray',
                      padding: '1px 4px',
                    }}
                    badgeContent={<EditOutlinedIcon style={{
                      width: 54,
                      height: 54,
                      border: `2px solid ${theme.palette.background.paper}`,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      color: 'gray'
                    }}/>}
                  >
                    <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                  </Badge>
                  }
                  </label>
                </Grid>
                <Grid  item container direction="row-reverse">
                  <p style={{fontSize:25}}>Connexions/mois : 90</p>
                </Grid>
                <Grid item container direction="row-reverse">
                  <p style={{fontSize:25}}>Temps connexion/jour : 1h</p>
                </Grid>
                <Grid item container direction="row-reverse">
                  <p style={{fontSize:25}}>Lots : 120000</p>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Se connecter en tant que"} color={"1"} onClick={onClickSave} disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Réinitialiser le mot de passe"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Suspendre le compte"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Supprimer le compte"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
              </Grid>
            <Grid xs item container direction="column" spacing={5}>
              <Grid item container><p  style={{fontSize:35}}><b>Informations</b></p></Grid>

              <Grid item></Grid>
              <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p style={{fontSize:25}}>Carbinets</p></Grid>
                  <Grid xs item container alignItems="stretch">
                    <Multiselect
                      selected={companies}
                      no={'No companies found'}
                      hint={'Add new Company'}
                      all={allCompanies} 
                      onSelected={handleChangeCompanies}
                      disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsCompanies.length > 0 && 
                      <span className={classes.error}>{errorsCompanies}</span>}
                  </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p style={{fontSize:25}}>Immeubles</p></Grid>
                  <Grid xs item container alignItems="stretch">
                    <Multiselect
                      selected={buildings}
                      no={'No buildings found'}
                      hint={'Add new Buildings'}
                      all={allBuildings} 
                      onSelected={handleChangeBuildings}
                      disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}
                      />
                    {errorsBuildings.length > 0 && 
                    <span className={classes.error}>{errorsBuildings}</span>}
                  </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p style={{fontSize:25}}>Nom</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined" 
                      placeholder="johndoe@gmail.com"
                      value={lastname}
                      onChange={handleChangeLastName} 
                      disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>
                  {errorsLastname.length > 0 && 
                  <span className={classes.error}>{errorsLastname}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p style={{fontSize:25}}>Prénom</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined" 
                      placeholder="johndoe@gmail.com"
                      value={firstname}
                      onChange={handleChangeFirstName} 
                      disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>  
                  {errorsFirstname.length > 0 && 
                  <span className={classes.error}>{errorsFirstname}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p style={{fontSize:25}}>Email</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined" 
                      placeholder="johndoe@gmail.com"
                      value={email}
                      onChange={handleChangeEmail} 
                      disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>  
                  {errorsEmail.length > 0 && 
                  <span className={classes.error}>{errorsEmail}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p style={{fontSize:25}}>Téléphone</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      id="outlined-basic" 
                      className={classes.text} 
                      variant="outlined" 
                      placeholder="0102030405"
                      value={phonenumber}
                      onChange={handleChangePhoneNumber} 
                      disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}
                    />
                  </Grid>  
                  {errorsPhonenumber.length > 0 && 
                  <span className={classes.error}>{errorsPhonenumber}</span>}
                </Grid>
              </Grid>

              <Grid item></Grid>
            </Grid>
          </Grid>
          <Grid item ><p style={{fontSize:30}}><b>Permissions</b></p></Grid>
          <Grid item container spacing={2}>
            <Grid item container ></Grid>
            <Grid item container spacing={2}>
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
          </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyDialog open={openDialog} role={accessManagers} onClose={handleCloseDialog}/>
              <MyButton   name={"Sauvegarder"} color={"1"} onClick={onClickSave} disabled={(accessManagers ==='See'? 'disabled' : !'disabled')}/>
            </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(ManagerEdit);
