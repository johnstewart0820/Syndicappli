import React from 'react';
import {AddUserStyles as useStyles} from './useStyles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {COUNTRIES} from '../../../components/countries';
import Multiselect from '../../../components/Multiselect.js';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const AddUser = (props) => {
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
  const companiesList = COUNTRIES.map((country,id) => {
    return {
      label: country
    }
  })
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
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

  const [errorsCompanies, setErrorsCompanies] = React.useState('');
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
  return (
    <div className={classes.root}>
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container justify="center" alignItems="center">
                    <Grid xs={3} item container><p className={classes.title}>Carbinets</p></Grid>
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
                    <Grid xs={3} item container><p className={classes.title}>Nom</p></Grid>
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
                    <Grid xs={3} item container><p className={classes.title}>Prénom</p></Grid>
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
                    <Grid xs={3} item container><p className={classes.title}>Email</p></Grid>
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
                    <Grid xs={3} item container><p className={classes.title}>Téléphone</p></Grid>
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
                    <p className={classes.title}>Photo</p>
                    <Grid item container justify="flex-start">
                    <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                    <label htmlFor="img_front">
                        {
                            avatarurl === '' ?
                             <div className={classes.img}>
                                <AddCircleOutlineIcon className={classes.plus}/>
                             </div> :
                             <img className={classes.img} src={avatarurl} alt=""/>
                        }
                    </label>
                    </Grid>
                </Grid>
            </Grid>
            <br/>
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
                    {errorsCompaniesPermission.length > 0 && 
                        <span className={classes.error}>{errorsCompaniesPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.title}>Gestionnaires</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeManagersPermission}
                        value={managersPermission}
                    />
                    {errorsManagersPermission.length > 0 && 
                        <span className={classes.error}>{errorsManagersPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.title}>Immeuables</p>
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
                    <p className={classes.title}>Coproprietaires</p>
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
                    <p className={classes.title}>Commandes</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeOrdersPermission}
                        value={ordersPermission}
                    />
                    {errorsOrdersPermission.length > 0 && 
                        <span className={classes.error}>{errorsOrdersPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.title}>Prodults</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeProductsPermission}
                        value={productsPermission}
                    />
                    {errorsProductsPermission.length > 0 && 
                        <span className={classes.error}>{errorsProductsPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.title}>Codes Promo</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeDiscountCodesPermission}
                        value={discountCodesPermission}
                    />
                    {errorsDiscountcodesPermission.length > 0 && 
                        <span className={classes.error}>{errorsDiscountcodesPermission}</span>}
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p className={classes.title}>Utilisateurs</p>
                    <MySelect 
                        color="gray" 
                        data={permissionList} 
                        onChangeSelect={handleChangeUsersPermission}
                        value={usersPermission}
                    />
                    {errorsUsersPermission.length > 0 && 
                        <span className={classes.error}>{errorsUsersPermission}</span>}
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

export default AddUser;
