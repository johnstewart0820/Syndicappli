import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../../components/MySelect';
import MyButton from 'components/MyButton';
import theme from 'theme';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AdminService from '../../../services/api.js';
import authService from '../../../services/authService.js';
import { COUNTRIES } from '../../../components/countries';
import Multiselect from '../../../components/Multiselect.js';
import MyDialog from '../../../components/MyDialog.js';
import { EditUserStyles as useStyles } from './useStyles';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import CircularProgress from '@material-ui/core/CircularProgress';
import useGlobal from 'Global/global';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const UserEdit = (props) => {
  const { history } = props;

  const token = authService.getToken();
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessUsers = authService.getAccess('role_users');
  const [globalState, globalActions] = useGlobal();
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useStyles();
  const permissionList = ['Voir', 'Editer', 'Refusé'];
  const role_permission = ['see','edit','denied'];

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
  const [avatarurl, setAvatarUrl] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);

  const [errorsCompanies, setErrorsCompanies] = React.useState('');
  const [errorsLastname, setErrorsLastname] = React.useState('');
  const [errorsFirstname, setErrorsFirstname] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');

  const [companyList, setCompanyList] = React.useState([]);
  let companyID = [];
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);

  useEffect( () =>  {
    if (accessUsers === 'denied') {
      setOpenDialog(true);
    }
    if (accessUsers !== 'denied') {
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
              console.log('companylist:',companyList)
            }
          },
          error => {
            ToastsStore.error("Can't connect to the server!");
            setVisibleIndicator(false);
          }
        );

    }
  }, []);
  useEffect(()=>{
    setCompanyList(companyList);
    console.log('companylist:',companyList)
    setVisibleIndicator(true);
    AdminService.getUser(props.match.params.id)
      .then(
        response => {
          setVisibleIndicator(false);
          if (response.data.code !== 200) {
            ToastsStore.error(response.data.message);
          } else {
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            const profile = data.user;
            setLastName(profile.lastname);
            setFirstName(profile.firstname);
            setEmail(profile.email);
            setPhoneNumber(profile.phone);
            setAvatarUrl(profile.photo_url);
            setCompaniesPermission(role_permission.indexOf(profile.role_companies));
            setManagersPermission(role_permission.indexOf(profile.role_managers));
            setBuildingsPermission(role_permission.indexOf(profile.role_buildings));
            setOwnersPermission(role_permission.indexOf(profile.role_owners));
            setOrdersPermission(role_permission.indexOf(profile.role_orders));
            setProductsPermission(role_permission.indexOf(profile.role_products));
            setDiscountodesPermission(role_permission.indexOf(profile.role_discountcodes));
            setUsersPermission(role_permission.indexOf(profile.role_users));
            let companyID = [];
            data.companylist.map((item, i) => (
              companyID[i] = item.relationID
            )
            );
            let companies = [];
            for(let i = 0 ; i < companyID.length; i++)
              for(let j = 0; j < companyList.length; j++)
                if(companyID[i] === companyList[j].companyID){
                  companies[i] = {label:companyList[j].name,value:companyList[j].companyID};
                  break;
                }
            globalActions.setMultiTags(companies);
            globalActions.setMultiID(companyID);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  },[companyList])
  const handleClick = () => {
    history.goBack();
  };
  const onClickSave = () => {
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
      updateUser();
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
  const handleChangeCompanies = async (val) => {
    if(val !== null){
      await globalActions.setMultiTags(val);
      companyID.splice(0, companyID.length)
      for (let i = 0; i < val.length; i++)
        for (let j = 0; j < companyList.length; j++)
          if (val[i].label == companyList[j].name) {
            companyID.push(companyList[j].companyID);
          }
      globalActions.setMultiID(companyID);
    }
    else{
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
  const handleLoadFront = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
  }
  const updateUser = () => {
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
    AdminService.updateUser(props.match.params.id,formdata)
        .then(
            response => {
                setVisibleIndicator(false);
                if (response.data.code !== 200) {
                    ToastsStore.error(response.data.message);
                } else {
                    const data = response.data.data;
                    localStorage.setItem("token", JSON.stringify(data.token));
                    ToastsStore.success('Updated user successfully!');
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
                <b>Mon Cabinet Syndic</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
        <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la liste des Utilisateurs</p>
      </div>
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid item container><p className={classes.headerTitle}><b>Informations</b></p></Grid>
          <Grid container direction="column" spacing={5}>
            <Grid item container spacing={2} direction="row-reverse">
              <Grid item container xs={12} sm={4} direction="row-reverse">

                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    // right: -20,
                    // top: 10,
                    // border: '2px solid gray',
                    // padding: '1px 4px',
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
              <Grid item container direction="column" justify="space-between" xs={12} sm={8}>
                <Grid item container><p></p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p className={classes.itemTitle}>Carbinets</p></Grid>
                  <Grid xs item container alignItems="stretch">
                    <Multiselect
                      selected={globalState.multi_tags}
                      no={'No companies found'}
                      all={globalState.multi_suggestions}
                      onSelected={handleChangeCompanies}
                      disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                    />
                    {errorsCompanies.length > 0 &&
                      <span className={classes.error}>{errorsCompanies}</span>}
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    value={lastname}
                    onChange={handleChangeLastName}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
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
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
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
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
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
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                {errorsPhonenumber.length > 0 &&
                  <span className={classes.error}>{errorsPhonenumber}</span>}
              </Grid>
            </Grid>

            <Grid item ><p className={classes.itemTitle}><b>Permissions</b></p></Grid>
            <Grid item container spacing={1}>
              <Grid item container ></Grid>
              <Grid item container spacing={2}>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Cabinets</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={companiesPermission}
                    onChangeSelect={handleChangeCompaniesPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Gestionnaires</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={managersPermission}
                    onChangeSelect={handleChangeManagersPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Immeuables</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={buildingsPermission}
                    onChangeSelect={handleChangeBuildingsPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Coproprietaires</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={ownersPermission}
                    onChangeSelect={handleChangeOwnersPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Commandes</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={ordersPermission}
                    onChangeSelect={handleChangeOrdersPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Prodults</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={productsPermission}
                    onChangeSelect={handleChangeProductsPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Codes Promo</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={discountCodesPermission}
                    onChangeSelect={handleChangeDiscountCodesPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid xs={12} sm={6} item container direction="column">
                  <p className={classes.itemTitle}>Utilisateurs</p>
                  <MySelect
                    color="#9f9f9f"
                    data={permissionList}
                    value={usersPermission}
                    onChangeSelect={handleChangeUsersPermission}
                    disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <MyDialog open={openDialog} role={accessUsers} onClose={handleCloseDialog} />
            <MyButton name={"Sauvegarder"} color={"1"} onClick={onClickSave} disabled={(accessUsers === 'see' ? 'disabled' : !'disabled')} />
          </Grid>
        </div>
      </Grid>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(UserEdit);
