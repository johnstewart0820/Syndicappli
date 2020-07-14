import React, {useEffect } from 'react';
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
import {COUNTRIES} from '../../../components/countries';
import Multiselect from '../../../components/Multiselect.js';
import MyDialog from '../../../components/MyDialog.js';
import {EditUserStyles as useStyles} from './useStyles';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const UserEdit = (props) => {
  const {history} = props;

  const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessUsers = authService.getAccess('role_users');
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useStyles();
  const companiesList=[];
  const buildingsList=[];
  const permissionList = ['Editer', 'Voir', 'Refusé'];
  const itemPermission ={'edit' : 0 , 'see' : 1, 'denied' : 2};

  const [lastname, setLastName] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [companiesPermission, setCompaniesPermission] = React.useState('');
  const [buildingsPermission, setBuildingsPermission] = React.useState('');
  const [managersPermission, setManagersPermission] = React.useState('');
  const [ownersPermission, setOwnersPermission] = React.useState('');
  const [ordersPermission, setOrdersPermission] = React.useState('');
  const [productsPermission, setProductsPermission] = React.useState('');
  const [discountCodesPermission, setDiscountodesPermission] = React.useState('');
  const [usersPermission, setUsersPermission] = React.useState('');
  const [avatarurl, setAvatarUrl] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);

  const [errorsCompanies, setErrorsCompanies] = React.useState('');
  const [errorsBuildings, setErrorsBuildings] = React.useState('');
  const [errorsLastname, setErrorsLastname] = React.useState('');
  const [errorsFirstname, setErrorsFirstname] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
  const [errorsCompaniesPermission, setErrorsCompaniesPermission] = React.useState('');
  const [errorsBuildingsPermission, setErrorsBuildingsPermission] = React.useState('');
  const [errorsManagersPermission, setErrorsManagersPermission] = React.useState('');
  const [errorsOwnersPermission, setErrorsOwnersPermission] = React.useState('');
  const [errorsOrdersPermission, setErrorsOrdersPermission] = React.useState('');
  const [errorsProductsPermission, setErrorsProductsPermission] = React.useState('');
  const [errorsDiscountcodesPermission, setErrorsDiscountcodesPermission] = React.useState('');
  const [errorsUsersPermission, setErrorsUsersPermission] = React.useState('');
  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
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
    if(accessUsers === 'Denied'){
      setOpenDialog(true);
    }
    if(accessUsers !== 'Denied'){
      // AdminService.getAllCompanyList()
      // .then(      
      //   response => {        
      //     console.log(response.data);
      //     // setVisibleIndicator(false);  
      //     if(response.data.code !== 200){
      //       // if(response.data.status === 'Token is Expired') {
      //       //   authService.logout();
      //       //   history.push('/');
      //       // }
      //       console.log('error');
      //     } else {
      //       console.log('success');
      //       const data = response.data.data;
      //       localStorage.setItem("token", JSON.stringify(data.token));
      //       {
      //         data.companylist.map((companylist,i)=>{
      //           companiesList.push(companylist.company_name);
      //         })
      //       }
      //     }
      //   },
      //   error => {
      //     console.log('fail');        
      //     // setVisibleIndicator(false);
      //     // const resMessage =
      //     //     (error.response &&
      //     //       error.response.data &&
      //     //       error.response.data.message) ||
      //     //     error.message ||
      //     //     error.toString();
      //   }
      // );    
      AdminService.getUser(props.match.params.id)
      .then(      
        response => {        
          console.log(response.data);
          // setVisibleIndicator(false);  
          if(response.data.code !== 200){
            // if(response.data.status === 'Token is Expired') {
            //   authService.logout();
            //   history.push('/');
            // }
            console.log('error');
          } else {
            console.log('success');
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            const profile = data.user.profile;
            {
              data.user.building.map((building,i)=>{
                buildingsList.push(building.building_name);
              })
            }
            setLastName(profile.lastname);
            setFirstName(profile.firstname);
            setEmail(profile.email);
            setPhoneNumber(profile.phone);
            // setCompanies(itemCompanies[profile.company_name]);
            // setBuildings(itemBuildings[profile.company_name]);
            setCompaniesPermission(itemPermission[profile.company_permission]);
            setManagersPermission(itemPermission[profile.manager_permission]);
            setBuildingsPermission(itemPermission[profile.building_permission]);
            setOwnersPermission(itemPermission[profile.owner_permission]);
            setOrdersPermission(itemPermission[profile.orders_permission]);
            setProductsPermission(itemPermission[profile.products_permission]);
            setDiscountodesPermission(itemPermission[profile.discount_code_permission]);
            setUsersPermission(itemPermission[profile.users_permission]);

          }
        },
        error => {
          console.log('fail');        
          // setVisibleIndicator(false);
          // const resMessage =
          //     (error.response &&
          //       error.response.data &&
          //       error.response.data.message) ||
          //     error.message ||
          //     error.toString();
        }
      );    
    }
  }, []);

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
    if(companiesPermission.length === 0) {setErrorsCompaniesPermission('please select permission to companies'); cnt++;}
    else setErrorsCompaniesPermission('');
    if(managersPermission.length === 0) {setErrorsManagersPermission('please select permission to managers'); cnt++;}
    else setErrorsManagersPermission('');
    if(buildingsPermission.length === 0) {setErrorsBuildingsPermission('please select permission to buildings'); cnt++;}
    else setErrorsBuildingsPermission('');
    if(ownersPermission.length === 0) {setErrorsOwnersPermission('please select permission to owners'); cnt++;}
    else setErrorsOwnersPermission('');
    if(ordersPermission.length === 0) {setErrorsOrdersPermission('please select permission to orders'); cnt++;}
    else setErrorsOrdersPermission('');
    if(productsPermission.length === 0) {setErrorsProductsPermission('please select permission to products'); cnt++;}
    else setErrorsProductsPermission('');
    if(discountCodesPermission.length === 0) {setErrorsDiscountcodesPermission('please select permission to discount codes'); cnt++;}
    else setErrorsDiscountcodesPermission('');
    if(usersPermission.length === 0) {setErrorsUsersPermission('please select permission to users'); cnt++;}
    else setErrorsUsersPermission('');

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
  console.log(companies);
}

const handleChangeBuildings = (val) => {
  setBuildings(val);
}
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
  return (
    <div className={classes.root}>
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
        <Grid item container><p  className={classes.headerTitle}><b>Informations</b></p></Grid>
          <Grid container direction="column" spacing={5}>
            <Grid item container spacing={2} direction="row-reverse">
            <Grid item container xs={12} sm={4} direction="row-reverse">
                <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                <label htmlFor="img_front">
                {
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
                <Grid xs={12} item container direction="row-reverse"><p className={classes.itemTitle}>Nombre de gestionnaires : 80</p></Grid>
                <Grid xs={12} item container direction="row-reverse"><p className={classes.itemTitle}>Nombre de lots : 120000</p></Grid>
              </Grid>
              <Grid item container direction="column" justify="space-between" xs={12} sm={8}>
                <Grid item container><p></p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.itemTitle}>Carbinets</p></Grid>
                    <Grid xs item container alignItems="stretch">
                      <Multiselect
                        selected={companies}
                        no={'No companies found'}
                        hint={'Add new Company'}
                        all={allCompanies} 
                        onSelected={handleChangeCompanies}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                        />
                        {errorsCompanies.length > 0 && 
                        <span className={classes.error}>{errorsCompanies}</span>}
                    </Grid>

                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item container direction="row" >
                <Grid item container direction="column"  xs={12} sm={8}>
                    <Grid item container alignItems="center" spacing={2}>
                        <Grid item><p className={classes.itemTitle}>Immeubles</p></Grid>
                        <Grid xs item container alignItems="stretch">
                          <Multiselect
                            selected={buildings}
                            no={'No buildings found'}
                            hint={'Add new Buildings'}
                            all={allBuildings} 
                            onSelected={handleChangeBuildings}
                            disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                            />
                          {errorsBuildings.length > 0 && 
                          <span className={classes.error}>{errorsBuildings}</span>}
                        </Grid>
                    </Grid>
                </Grid>
                
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
                    variant="outlined" 
                    placeholder="johndoe@gmail.com"
                    value={lastname}
                    onChange={handleChangeLastName} 
                    disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
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
                    id="outlined-basic" 
                    className={classes.text} 
                    variant="outlined" 
                    placeholder="johndoe@gmail.com"
                    value={firstname}
                    onChange={handleChangeFirstName} 
                    disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
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
                    id="outlined-basic" 
                    className={classes.text} 
                    variant="outlined" 
                    placeholder="johndoe@gmail.com"
                    value={email}
                    onChange={handleChangeEmail} 
                    disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
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
                    id="outlined-basic" 
                    className={classes.text} 
                    variant="outlined" 
                    placeholder="0102030405"
                    value={phonenumber}
                    onChange={handleChangePhoneNumber} 
                    disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
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
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsCompaniesPermission.length > 0 && 
                      <span className={classes.error}>{errorsCompaniesPermission}</span>}
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p className={classes.itemTitle}>Gestionnaires</p>
                      <MySelect 
                        color="#9f9f9f" 
                        data={permissionList}
                        value={managersPermission}
                        onChangeSelect={handleChangeManagersPermission}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                        />
                        {errorsManagersPermission.length > 0 && 
                        <span className={classes.error}>{errorsManagersPermission}</span>}
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p className={classes.itemTitle}>Immeuables</p>
                      <MySelect 
                        color="#9f9f9f" 
                        data={permissionList}
                        value={buildingsPermission}
                        onChangeSelect={handleChangeBuildingsPermission}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsBuildingsPermission.length > 0 && 
                      <span className={classes.error}>{errorsBuildingsPermission}</span>}
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p className={classes.itemTitle}>Coproprietaires</p>
                      <MySelect 
                        color="#9f9f9f" 
                        data={permissionList}
                        value={ownersPermission}
                        onChangeSelect={handleChangeOwnersPermission}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsOwnersPermission.length > 0 && 
                      <span className={classes.error}>{errorsOwnersPermission}</span>}
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p className={classes.itemTitle}>Commandes</p>
                      <MySelect 
                        color="#9f9f9f" 
                        data={permissionList}
                        value={ordersPermission}
                        onChangeSelect={handleChangeOrdersPermission}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsOrdersPermission.length > 0 && 
                      <span className={classes.error}>{errorsOrdersPermission}</span>}
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p className={classes.itemTitle}>Prodults</p>
                      <MySelect 
                        color="#9f9f9f" 
                        data={permissionList}
                        value={productsPermission}
                        onChangeSelect={handleChangeProductsPermission}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsProductsPermission.length > 0 && 
                        <span className={classes.error}>{errorsProductsPermission}</span>}
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p className={classes.itemTitle}>Codes Promo</p>
                      <MySelect 
                        color="#9f9f9f" 
                        data={permissionList}
                        value={discountCodesPermission}
                        onChangeSelect={handleChangeDiscountCodesPermission}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsDiscountcodesPermission.length > 0 && 
                      <span className={classes.error}>{errorsDiscountcodesPermission}</span>}
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p className={classes.itemTitle}>Utilisateurs</p>
                      <MySelect 
                        color="#9f9f9f" 
                        data={permissionList}
                        value={usersPermission}
                        onChangeSelect={handleChangeUsersPermission}
                        disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}
                      />
                      {errorsUsersPermission.length > 0 && 
                      <span className={classes.error}>{errorsUsersPermission}</span>}
                    </Grid>
                </Grid> 
                </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyDialog open={openDialog} role={accessUsers} onClose={handleCloseDialog}/>
              <MyButton   name={"Sauvegarder"} color={"1"} onClick={onClickSave} disabled={(accessUsers ==='See'? 'disabled' : !'disabled')}/>
            </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(UserEdit);
