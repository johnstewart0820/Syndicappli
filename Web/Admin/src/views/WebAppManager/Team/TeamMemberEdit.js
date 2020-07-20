import React, {  useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../../components/MySelect';
import MyButton from 'components/MyButton';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import authService from '../../../services/authService.js';
import {COUNTRIES} from '../../../components/countries';
import Multiselect from '../../../components/Multiselect.js';
import MyDialog from '../../../components/MyDialog.js';
import {EditTeamMemberStyles as useStyles} from './useStyles';
import AdminService from '../../../services/api.js';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const TeamMemberEdit = (props) => {
  const {history} = props;

  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/manager/login");
  //   window.location.reload();
  // }
  const accessTeam = authService.getAccess('role_managers');
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
  let company = [];
  const [companies, setCompanies] = React.useState('');
  const [companyList, setCompanyList] = React.useState([]);
  const [companyID, setCompanyID] = React.useState(-1);

  const [buildings, setBuildings] = React.useState(selected);
  const allCompanies =  COUNTRIES.map((country,id) => {
    return {
      label: country, value: country
    }
  })
  const allBuildings = allCompanies;
  useEffect(() => {
    if(accessTeam === 'denied'){
      setOpenDialog(true);
    }
    if(accessTeam !== 'denied'){
      getCompanies();
    }
  },[accessTeam]);

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
const handleChangeCompanies = (val) => {
  setCompanies(val);
  if(val < companyList.length)
    setCompanyID(companyList[val].companyID);
  else
    setCompanyID(-1);
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
const getCompanies = ()=>{
  AdminService.getCompanyListByUser()
  .then(      
    response => {        
      console.log(response.data);
      // setVisibleIndicator(false);  
      if(response.data.code !== 200){
        console.log('error');
      } else {
        console.log('success');
        const data = response.data.data;
        localStorage.setItem("token", JSON.stringify(data.token));
        data.companylist.map((item)=>(
          company.push(item.name)
        )
        );
        setCompanyList(data.companylist);
        setCompanyID(data.companylist[0].companyID);
        company.push('all');
      //   getBuildings();
      }
    },
    error => {
      console.log('fail');        
      // setVisibleIndicator(false);
    }
  );
}
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.headerTitle}>
                <b>Michel Dupont</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la liste des Gestionnaires</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
        <Grid item container><p  className={classes.headerTitle}><b>Informations</b></p></Grid>

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
                    badgeContent={<EditOutlinedIcon className={classes.editAvatar}/>}
                  >
                    <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                  </Badge>
                  }
                  </label>
                </Grid>
                <Grid  item container direction="row-reverse">
                  <p className={classes.itemTitle}>Connexions/mois : 90</p>
                </Grid>
                <Grid item container direction="row-reverse">
                  <p className={classes.itemTitle}>Temps connexion/jour : 1h</p>
                </Grid>
                <Grid item container direction="row-reverse">
                  <p className={classes.itemTitle}>Lots : 120000</p>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Se connecter en tant que"} color={"1"} onClick={onClickSave} disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Réinitialiser le mot de passe"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Suspendre le compte"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Supprimer le compte"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}/>
                </Grid>
              </Grid>
            <Grid xs item container direction="column" spacing={5}>

              <Grid item></Grid>

              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      variant="outlined" 
                      value={lastname}
                      onChange={handleChangeLastName} 
                      disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}
                      fullWidth
                    />
                  </Grid>
                  {errorsLastname.length > 0 && 
                  <span className={classes.error}>{errorsLastname}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p className={classes.itemTitle}>Prénom</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      className={classes.text} 
                      variant="outlined" 
                      value={firstname}
                      onChange={handleChangeFirstName} 
                      disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}
                      fullWidth
                    />
                  </Grid>  
                  {errorsFirstname.length > 0 && 
                  <span className={classes.error}>{errorsFirstname}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p className={classes.itemTitle}>Email</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      className={classes.text} 
                      variant="outlined" 
                      value={email}
                      onChange={handleChangeEmail} 
                      disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}
                      fullWidth
                    />
                  </Grid>  
                  {errorsEmail.length > 0 && 
                  <span className={classes.error}>{errorsEmail}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item><p className={classes.itemTitle}>Téléphone</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      className={classes.text} 
                      variant="outlined" 
                      value={phonenumber}
                      onChange={handleChangePhoneNumber} 
                      disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}
                      fullWidth
                    />
                  </Grid>  
                  {errorsPhonenumber.length > 0 && 
                  <span className={classes.error}>{errorsPhonenumber}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p className={classes.itemTitle}>Carbinet</p></Grid>
                  <Grid xs item container alignItems="stretch">
                      <MySelect 
                          color="gray" 
                          data={company} 
                          onChangeSelect={handleChangeCompanies}
                          value={companies}
                          width="80%"
                        disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}
                      />
                      {errorsCompanies.length > 0 && 
                      <span className={classes.error}>{errorsCompanies}</span>}
                  </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p className={classes.itemTitle}>Immeubles</p></Grid>
                  <Grid xs item container alignItems="stretch">
                    <Multiselect
                      selected={buildings}
                      no={'No buildings found'}
                      all={allBuildings} 
                      onSelected={handleChangeBuildings}
                      disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}
                      />
                    {errorsBuildings.length > 0 && 
                    <span className={classes.error}>{errorsBuildings}</span>}
                  </Grid>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
          <Grid item ><p className={classes.itemTitle}><b>Permissions</b></p></Grid>
          <Grid item container spacing={2}>
            <Grid item container ></Grid>
            <Grid xs={9} sm={8} md={7} lg={6} xl={5} item container spacing={2}>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Immeubles</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeBuildingsPermission}
                        value={buildingsPermission}
                    />
                    {errorsBuildingsPermission.length > 0 && 
                        <span className={classes.error}>{errorsBuildingsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Copropriétaires</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeOwnersPermission}
                        value={ownersPermission}
                    />
                    {errorsOwnersPermission.length > 0 && 
                        <span className={classes.error}>{errorsOwnersPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Messagerie</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeChatPermission}
                        value={chatPermission}
                    />
                    {errorsChatPermission.length > 0 && 
                        <span className={classes.error}>{errorsChatPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Incidents</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeIncidentsPermission}
                        value={incidentsPermission}
                    />
                    {errorsIncidentsPermission.length > 0 && 
                        <span className={classes.error}>{errorsIncidentsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Assemblées</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeAssembliesPermission}
                        value={assembliesPermission}
                    />
                    {errorsAssembliesPermission.length > 0 && 
                        <span className={classes.error}>{errorsAssembliesPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Événements</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeEventsPermission}
                        value={eventsPermission}
                    />
                    {errorsEventsPermission.length > 0 && 
                        <span className={classes.error}>{errorsEventsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Équipe</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeTeamPermission}
                        value={teamPermission}
                    />
                    {errorsTeamPermission.length > 0 && 
                        <span className={classes.error}>{errorsTeamPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Prestataires</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeProvidersPermission}
                        value={providersPermission}
                    />
                    {errorsProvidersPermission.length > 0 && 
                        <span className={classes.error}>{errorsProvidersPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Annonces</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeAnnouncementsPermission}
                        value={announcementsPermission}
                    />
                    {errorsAnnouncementsPermission.length > 0 && 
                        <span className={classes.error}>{errorsAnnouncementsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Cabinet</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeCompanyPermission}
                        value={companyPermission}
                    />
                    {errorsCompanyPermission.length > 0 && 
                        <span className={classes.error}>{errorsCompanyPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Modules</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeAddonsPermission}
                        value={addonsPermission}
                    />
                    {errorsAddonsPermission.length > 0 && 
                        <span className={classes.error}>{errorsAddonsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Factures</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeInvoicesPermission}
                        value={invoicesPermission}
                    />
                    {errorsInvoicesPermission.length > 0 && 
                        <span className={classes.error}>{errorsInvoicesPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.permissionItemTitle}>Moyens de paiement</p>
                    <MySelect 
                        color="gray" 
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
              <MyDialog open={openDialog} role={accessTeam} onClose={handleCloseDialog}/>
              <MyButton   name={"Sauvegarder"} color={"1"} onClick={onClickSave} disabled={(accessTeam ==='see'? 'disabled' : !'disabled')}/>
            </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(TeamMemberEdit);
