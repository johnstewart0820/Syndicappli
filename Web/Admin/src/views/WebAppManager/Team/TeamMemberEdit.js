import React, { useEffect } from 'react';
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
import Multiselect from '../../../components/Multiselect.js';
import MyDialog from '../../../components/MyDialog.js';
import { EditTeamMemberStyles as useStyles } from './useStyles';
import {ManagerService as Service} from '../../../services/api.js';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import CircularProgress from '@material-ui/core/CircularProgress';
import useGlobal from 'Global/global';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
const ManagerService = new Service();
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const TeamMemberEdit = (props) => {
  const { history } = props;

  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessTeam = authService.getAccess('role_team');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useStyles();
  const permissionList = ['Voir', 'Editer', 'Refusé'];
  const role_permission = ['see', 'edit', 'denied'];
  const [globalState, globalActions] = useGlobal();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(-1);
  const [suspendState, setSuspendState] = React.useState('Suspendre le compte');
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [lastname, setLastName] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [buildingsPermission, setBuildingsPermission] = React.useState(0);
  const [chatPermission, setChatPermission] = React.useState(0);
  const [ownersPermission, setOwnersPermission] = React.useState(0);
  const [incidentsPermission, setIncidentsPermission] = React.useState(0);
  const [assembliesPermission, setAssembliesPermission] = React.useState(0);
  const [eventsPermission, setEventsPermission] = React.useState(0);
  const [teamPermission, setTeamPermission] = React.useState(0);
  const [providersPermission, setProvidersPermission] = React.useState(0);
  const [announcementsPermission, setAnnouncementsPermission] = React.useState(0);
  const [companyPermission, setCompanyPermission] = React.useState(0);
  const [addonsPermission, setAddonsPermission] = React.useState(0);
  const [invoicesPermission, setInvoicesPermission] = React.useState(0);
  const [paymentMethodsPermission, setPaymentMethodsPermission] = React.useState(0);
  const [apartNumber, setApartNumber]  =React.useState('');

  const [errorsBuildings, setErrorsBuildings] = React.useState('');
  const [errorsLastname, setErrorsLastname] = React.useState('');
  const [errorsFirstname, setErrorsFirstname] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
  const [companyID, setCompanyID] = React.useState(-1);

  const [buildingList, setBuildingList] = React.useState([]);
  let buildingID = [];
  const [buildings, setBuildings] = React.useState([]);
  useEffect(()=>{
    getCompanies();
    getBuildings()
  },[companyID]);
  const getCompanies = () => {
    setVisibleIndicator(true);
    ManagerService.getCompanyListByUser()
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              data.companylist.map((item) => (
                setCompanyID(item.companyID)
              )
              );
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
  const getBuildings = () => {
    const requestData = {
      'companyID': companyID
    }
    setVisibleIndicator(true);
    ManagerService.getBuildingListByCompany(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              let buildings1 = [];
              data.buildinglist.map((item, i) => (
                buildings1[i] = { label: item.name, value: item.buildingID }
              )
              );
              // setBuilding(buildings1);
              globalActions.setMultiSuggestions(buildings1);
              setBuildingList(data.buildinglist);
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
  useEffect(()=>{
    getManager()
  },[buildingList])

  const getManager = ()=>{
    setVisibleIndicator(true);
    ManagerService.getTeamMember(props.match.params.id)
    .then(
      response => {
        setVisibleIndicator(false);
        switch(response.data.code){
          case 200:
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            const profile = data.manager;

            if(profile.status === 'active')
              setSuspendState('Suspendre le compte');
            else if(profile.status === 'inactive')
              setSuspendState('Restaurer le compte');
            let buildingID = [];
            data.buildinglist.map((item, i) => (
              buildingID[i] = item.relationID
            )
            );
            let buildings1 = [];
            for(let i = 0 ; i < buildingID.length; i++)
              for(let j = 0; j < buildingList.length; j++)
                if(buildingID[i] === buildingList[j].buildingID){
                  buildings1[i] = {label:buildingList[j].name,value:buildingList[j].buildingID};
                  break;
                }
                setBuildings(buildings1);
            globalActions.setMultiID(buildingID);
            setLastName(profile.lastname);
            setFirstName(profile.firstname);
            setEmail(profile.email);
            setPhoneNumber(profile.phone);
            setAvatarUrl(profile.photo_url);
            setAddonsPermission(role_permission.indexOf(profile.role_addons));
            setAnnouncementsPermission(role_permission.indexOf(profile.role_advertisement));
            setAssembliesPermission(role_permission.indexOf(profile.role_assemblies));
            setBuildingsPermission(role_permission.indexOf(profile.role_buildings));
            setChatPermission(role_permission.indexOf(profile.role_chat));
            setCompanyPermission(role_permission.indexOf(profile.role_company));
            setEventsPermission(role_permission.indexOf(profile.role_events));
            setIncidentsPermission(role_permission.indexOf(profile.role_incidents));
            setInvoicesPermission(role_permission.indexOf(profile.role_invoices));
            setOwnersPermission(role_permission.indexOf(profile.role_owners));
            setPaymentMethodsPermission(role_permission.indexOf(profile.role_payments));
            setProvidersPermission(role_permission.indexOf(profile.role_providers));
            setTeamPermission(role_permission.indexOf(profile.role_team));
            setApartNumber(profile.count);
            break;
          case 401:
            authService.logout();
            history.push('/login');
            window.location.reload();
            break;
          default:
            ToastsStore.error(response.data.message);
            globalActions.setMultiTags([]);
            globalActions.setMultiID([]);
        }
      },
      error => {
        globalActions.setMultiTags([]);
        globalActions.setMultiID([]);
        ToastsStore.error("Can't connect to the server!");
        setVisibleIndicator(false);
      }
    );
  }
useEffect(()=>{
  globalActions.setMultiTags(buildings);
},[buildings])
  const handleClick = () => {
    history.goBack();
  };
  const onClickSave = () => {
    let cnt = 0;
    if (lastname.length === 0) { setErrorsLastname('please enter your last name'); cnt++; }
    else setErrorsLastname('');
    if (firstname.length === 0) { setErrorsFirstname('please enter your first name'); cnt++; }
    else setErrorsFirstname('');
    if (globalState.multi_ID.length === 0) { setErrorsBuildings('please select buildings'); cnt++; }
    else setErrorsBuildings('');
    if (email.length === 0) { setErrorsEmail('please enter your email'); cnt++; }
    else setErrorsEmail('');
    if (phonenumber.length === 0) { setErrorsPhonenumber('please enter your phone number'); cnt++; }
    else setErrorsPhonenumber('');
    if (cnt === 0) {
      updateManager();
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

  const handleChangeBuildings = async (val) => {
    if (val !== null) {
      await setBuildings(val);
      buildingID.splice(0, buildingID.length)
      for (let i = 0; i < val.length; i++)
        for (let j = 0; j < buildingList.length; j++)
          if (val[i].label == buildingList[j].name) {
            buildingID.push(buildingList[j].buildingID);
          }
      globalActions.setMultiID(buildingID);
    }
    else {
      console.log(val)
      await globalActions.setMultiTags([]);
      globalActions.setMultiID([]);
    }
  };
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
  const handleClickSuspendRestore = ()=>{
    let data={
      'status': suspendState === 'Restaurer le compte' ? 'active':'inactive'
    };
    setVisibleIndicator(true);
    ManagerService.setSuspendTeamMember(props.match.params.id,data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if(suspendState === 'Restaurer le compte')
                setSuspendState('Suspendre le compte');
              else if(suspendState === 'Suspendre le compte')
                setSuspendState('Restaurer le compte');
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
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClickResetPassword = ()=>{
    var data = {};
    data['email'] = email;
    setVisibleIndicator(true);
    ManagerService.forgotPassword(data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              ToastsStore.success(response.data.message);
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
          ToastsStore.error("Can't connect to the Server!");
        }
      ); 
  }
  const handleClickLoginAsManager = () => {
    window.open('http://localhost:3000');
  }
  const handleClickDeleteManager = ()=>{
    setOpenDelete(true);
    setDeleteId(props.match.params.id);
  }
  const handleDelete = () => {
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data={
      'status': 'trash'
    }
    ManagerService.deleteTeamMember(deleteId,data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              history.goBack();
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
  const updateManager = () => {
    let permissionInfos = [
      {
        'role_name': 'role_buildings',
        'permission': role_permission[buildingsPermission]
      },
      {
        'role_name': 'role_owners',
        'permission': role_permission[ownersPermission]
      },
      {
        'role_name': 'role_chat',
        'permission': role_permission[chatPermission]
      },
      {
        'role_name': 'role_incidents',
        'permission': role_permission[incidentsPermission]
      },
      {
        'role_name': 'role_assemblies',
        'permission': role_permission[assembliesPermission]
      },
      {
        'role_name': 'role_events',
        'permission': role_permission[eventsPermission]
      },
      {
        'role_name': 'role_team',
        'permission': role_permission[teamPermission]
      },
      {
        'role_name': 'role_providers',
        'permission': role_permission[providersPermission]
      },
      {
        'role_name': 'role_advertisement',
        'permission': role_permission[announcementsPermission]
      },
      {
        'role_name': 'role_company',
        'permission': role_permission[companyPermission]
      },
      {
        'role_name': 'role_addons',
        'permission': role_permission[addonsPermission]
      },
      {
        'role_name': 'role_invoices',
        'permission': role_permission[invoicesPermission]
      },
      {
        'role_name': 'role_payments',
        'permission': role_permission[paymentMethodsPermission]
      },
    ]
    let formdata = new FormData();
    formdata.set('companyID', companyID);
    formdata.set('buildingID', JSON.stringify(globalState.multi_ID));
    formdata.set('firstname', firstname);
    formdata.set('lastname', lastname);
    formdata.set('email', email);
    formdata.set('phone', phonenumber);
    formdata.set('logo', avatar === null ? '' : avatar);
    formdata.set('permission_info', JSON.stringify(permissionInfos));
    setVisibleIndicator(true);
    ManagerService.updateTeamMember(props.match.params.id,formdata)
      .then(
        response => {
          setVisibleIndicator(false);
          switch(response.data.code){
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success('Updated manager successfully!');
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
          <Grid item container><p className={classes.headerTitle}><b>Informations</b></p></Grid>

          <Grid item container justify="space-between" direction="row-reverse" spacing={2}>

            <Grid xs item container direction="column" spacing={2}>
              <Grid item container direction="row-reverse">

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
                  badgeContent={
                    <div>
                      <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront} />
                      <label htmlFor="img_front">
                        <EditOutlinedIcon className={classes.editAvatar} />
                      </label>
                    </div>
                  }
                >
                  <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                </Badge>
              </Grid>
              <Grid item container direction="row-reverse">
                <p className={classes.itemTitle}>Connexions/mois : 90</p>
              </Grid>
              <Grid item container direction="row-reverse">
                <p className={classes.itemTitle}>Temps connexion/jour : 1h</p>
              </Grid>
              <Grid item container direction="row-reverse">
                <p className={classes.itemTitle}>Lots : {apartNumber}</p>
              </Grid>
              <Grid item container direction="row-reverse">
                <MyButton name={"Se connecter en tant que"} color={"1"} onClick={handleClickLoginAsManager} disabled={(accessTeam === 'see' ? true : false)} />
              </Grid>
              <Grid item container direction="row-reverse">
                <MyButton name={"Réinitialiser le mot de passe"} bgColor={"#00C9FF"} onClick={handleClickResetPassword} disabled={(accessTeam === 'see' ? true : false)} />
              </Grid>
              <Grid item container direction="row-reverse">
                <MyButton name={suspendState} bgColor={"#00C9FF"} onClick={handleClickSuspendRestore} disabled={(accessTeam === 'see' ? true : false)} />
              </Grid>
              <Grid item container direction="row-reverse">
                <MyButton name={"Supprimer le compte"} bgColor={"#00C9FF"} onClick={handleClickDeleteManager} disabled={(accessTeam === 'see' ? true : false)} />
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
                      disabled={(accessTeam === 'see' ? true : false)}
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
                      disabled={(accessTeam === 'see' ? true : false)}
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
                      disabled={(accessTeam === 'see' ? true : false)}
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
                      disabled={(accessTeam === 'see' ? true : false)}
                      fullWidth
                    />
                  </Grid>
                  {errorsPhonenumber.length > 0 &&
                    <span className={classes.error}>{errorsPhonenumber}</span>}
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Immeubles</p></Grid>
                <Grid xs item container alignItems="stretch">
                  <Multiselect
                    selected={globalState.multi_tags}
                    no={'No buildings found'}
                    all={globalState.multi_suggestions}
                    onSelected={handleChangeBuildings}
                    disabled={(accessTeam === 'see' ? true : false)}
                    width="100%"
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
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Copropriétaires</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeOwnersPermission}
                  value={ownersPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Messagerie</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeChatPermission}
                  value={chatPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Incidents</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeIncidentsPermission}
                  value={incidentsPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Assemblées</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeAssembliesPermission}
                  value={assembliesPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Événements</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeEventsPermission}
                  value={eventsPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Équipe</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeTeamPermission}
                  value={teamPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Prestataires</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeProvidersPermission}
                  value={providersPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Annonces</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeAnnouncementsPermission}
                  value={announcementsPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Cabinet</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeCompanyPermission}
                  value={companyPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Modules</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeAddonsPermission}
                  value={addonsPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Factures</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangeInvoicesPermission}
                  value={invoicesPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
              <Grid xs={6} item container direction="column">
                <p className={classes.permissionItemTitle}>Moyens de paiement</p>
                <MySelect
                  color="gray"
                  data={permissionList}
                  onChangeSelect={handleChangePaymentMethodsPermission}
                  value={paymentMethodsPermission}
                  disabled={accessTeam === 'see'? true:false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <MyDialog open={openDialog} role={accessTeam} onClose={handleCloseDialog} />
            <MyButton name={"Sauvegarder"} color={"1"} onClick={onClickSave} disabled={(accessTeam === 'see' ? true : false)} />
          </Grid>
        </div>
      </Grid>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(TeamMemberEdit);
