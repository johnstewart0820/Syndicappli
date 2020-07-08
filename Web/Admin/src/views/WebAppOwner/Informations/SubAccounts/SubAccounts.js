import React, {  useEffect } from 'react';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../../components/MyButton';
import {withRouter} from 'react-router-dom';
import AdminService from '../../../../services/api.js';
import authService from '../../../../services/authService.js';
import CircularProgress  from '@material-ui/core/CircularProgress';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-input':{
        [theme.breakpoints.up('xl')]: {
          padding: '17px 25px',
          fontSize: 22,
        },
        [theme.breakpoints.down('lg')]: {
          padding: '12px 18px',
          fontSize: 15,
        },
        [theme.breakpoints.down('md')]: {
          padding: '8px 13px',
          fontSize: 11,
        },
        [theme.breakpoints.down('sm')]: {
          padding: '6px 9px',
          fontSize: 8,
        },
    },
    '& p':{
      marginBottom: 0
    }
  },
  tool: {
    [theme.breakpoints.up('xl')]: {
      minHeight: 67
    },
    [theme.breakpoints.down('lg')]: {
      minHeight: 47
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 33
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 23
    },
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  body:{
    [theme.breakpoints.up('xl')]: {
      marginTop: 64,
      padding: 40,
      borderRadius: 30,
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: 45,
      padding: 28,
      borderRadius: 21,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 32,
      padding: 20,
      borderRadius: 15,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 22,
      padding: 14,
      borderRadius: 11,
    },
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
  },
  item:{
    marginTop: theme.spacing(5),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  size: {
    cursor: 'pointer',
    [theme.breakpoints.up('xl')]: {
      width: 214,
      height: 214,
    },
    [theme.breakpoints.down('lg')]: {
      width: 150,
      height: 150,
    },
    [theme.breakpoints.down('md')]: {
      width: 105,
      height: 105,
    },
    [theme.breakpoints.down('sm')]: {
      width: 74,
      height: 74,
    },
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
  backTitle:{
    cursor: 'pointer',
    [theme.breakpoints.up('xl')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 13,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 9,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 6,
    },
  },
  itemTitle:{
    [theme.breakpoints.up('xl')]: {
      fontSize: 25,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 9,
    },
  },
  error:{
      color: 'red',
      [theme.breakpoints.up('xl')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 13,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 9,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 6,
      },
  },
  headerTitle:{
      [theme.breakpoints.up('xl')]: {
        fontSize :35
      },
      [theme.breakpoints.down('lg')]: {
        fontSize :25
      },
      [theme.breakpoints.down('md')]: {
        fontSize :18
      },
      [theme.breakpoints.down('sm')]: {
        fontSize :13
      },
  },
  editAvatar:{
    [theme.breakpoints.up('xl')]: {
      width: 54,
      height: 54,
    },
    [theme.breakpoints.down('lg')]: {
      width: 38,
      height: 38,
    },
    [theme.breakpoints.down('md')]: {
      width: 27,
      height: 27,
    },
    [theme.breakpoints.down('sm')]: {
      width: 19,
      height: 19,
    },
      backgroundColor: 'white',
      borderRadius: '50%',
      color: 'gray'
  },
  img: {
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    border: '1px dashed rgba(112,112,112,0.43)',
    borderRadius: 8,
    [theme.breakpoints.up('xl')]: {
      width: 222,
      height: 176,
    },
    [theme.breakpoints.down('lg')]: {
      width: 155,
      height: 123,
    },
    [theme.breakpoints.down('md')]: {
      width: 109,
      height: 86,
    },
    [theme.breakpoints.down('sm')]: {
      width: 76,
      height: 60,
    },
  },
  plus:{
    color: '#707070',
    [theme.breakpoints.up('xl')]: {
      width:60 , 
      height: 60,
    },
    [theme.breakpoints.down('lg')]: {
      width:42 , 
      height: 42,
    },
    [theme.breakpoints.down('md')]: {
      width:29 , 
      height: 29,
    },
    [theme.breakpoints.down('sm')]: {
      width:20 , 
      height: 20,
    },
  },
}));

const SubAccounts = (props) => {
  const {history} = props;

  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/owner/login");
  //   window.location.reload();
  // }
  const classes = useStyles();
  const [lastname , setLastName] = React.useState('');
  const [firstname , setFirstName] = React.useState('');
  const [address , setAddress] = React.useState('');
  const [email , setEmail] = React.useState('');
  const [phone , setPhone] = React.useState('');
  const [old_password , setOldPassword] = React.useState('');
  const [new_password , setNewPassword] = React.useState('');
  const [confirm_password , setConfirmPassword] = React.useState('');

  const [errorsLastname , setErrorsLastName] = React.useState('');
  const [errorsFirstname , setErrorsFirstName] = React.useState('');
  const [errorsAddress , setErrorsAddress] = React.useState('');
  const [errorsEmail , setErrorsEmail] = React.useState('');
  const [errorsPhone , setErrorsPhone] = React.useState('');
  const [errorsOldPassword , setErrorsOldPassword] = React.useState('');
  const [errorsNewPassword , setErrorsNewPassword] = React.useState('');
  const [errorsConfirmPassword , setErrorsConfirmPassword] = React.useState('');

  const [avatarurl, setAvatarUrl] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);
  const [authurl, setAuthUrl] = React.useState('');
  const [auth, setAuth] = React.useState(null);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);

  const handleChangeLastName = (event)=>{
    setLastName(event.target.value);
  }
  const handleChangeFirstName = (event)=>{
    setFirstName(event.target.value);
  }
  const handleChangeAddress = (event)=>{
    setAddress(event.target.value);
  }
  const handleChangeEmail = (event)=>{
    setEmail(event.target.value);
  }
  const handleChangePhone = (event)=>{
    setPhone(event.target.value);
  }
  const handleChangeOldPassword = (event)=>{
    setOldPassword(event.target.value);
  }
  const handleChangeNewPassword = (event)=>{
    setNewPassword(event.target.value);
  }
  const handleChangeConfirmPassword = (event)=>{
    setConfirmPassword(event.target.value);
  }
  const handleLoadFront = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
  }
  const handleLoadAuth = (event) => {
    setAuth(event.target.files[0]);
    setAuthUrl(URL.createObjectURL(event.target.files[0]));
  }
  useEffect(()=>{

    setVisibleIndicator(true);
    AdminService.getProfile()
    .then(      
      response => {        
        setVisibleIndicator(false);  
        if(response.data.code !== 200){
          
        } else {
          localStorage.setItem("token", JSON.stringify(response.data.data.token));
          const profile = response.data.data.profile;
          setLastName(profile.lastname);
          setFirstName(profile.firstname);
          setEmail(profile.email);
          setPhone(profile.phone);
          setAvatarUrl((AdminService.getProfileAvatar() + profile.photo_url));
        }
      },
      error => {
        console.log('fail');        
          setVisibleIndicator(false);
      }
    );   
  }, []);

  const onClickSave = (event)=>{
    let cnt = 0;
    if(lastname.length === 0) {setErrorsLastName('please enter your last name'); cnt++;}
    else setErrorsLastName('');
    if(firstname.length === 0) {setErrorsFirstName('please enter your first name'); cnt++;}
    else setErrorsFirstName('');
    if(address.length === 0) {setErrorsAddress('please enter your address'); cnt++;}
    else setErrorsAddress('');
    if(email.length === 0) {setErrorsEmail('please enter your email'); cnt++;}
    else setErrorsEmail('');
    if(phone.length === 0) {setErrorsPhone('please enter your phone number'); cnt++;}
    else setErrorsPhone('');
    // if(old_password.length === 0) {setErrorsOldPassword('please enter your current password'); }
    if(new_password.length !== 0 && new_password.length < 5) {setErrorsNewPassword('Password must be 5 characters long!'); }
    else setErrorsNewPassword('');
     // if(confirm_password.length === 0) {setErrorsConfirmPassword('please enter your confirm password');}
    if(new_password !== confirm_password) {setErrorsConfirmPassword('mismatch your new password'); cnt++}
    else setErrorsConfirmPassword('');
    if(cnt === 0) setData();
  }
  const setData = ()=>{
    let formdata = new FormData();

    formdata.set('lastname', lastname);
    formdata.set('firstname', firstname);
    formdata.set('email', email);
    formdata.set('phone', phone);
    formdata.set('old_password', old_password);
    formdata.set('new_password', new_password);
    formdata.set('avatar', avatar === null? '':avatar);
    setVisibleIndicator(true);
    AdminService.updateProfile(formdata)
    .then(      
      response => {        
        console.log(response.data);
         setVisibleIndicator(false);  
        if(response.data.code !== 200){
          setErrorsOldPassword('The current password is not correct');
        } else {
            ToastsStore.success("Updated successfully!");
           setErrorsOldPassword('');
           localStorage.setItem("token", JSON.stringify(response.data.data.token));
        }
      },
      error => {
        ToastsStore.error(error);     
         setVisibleIndicator(false);
      }
    );  
  }

  return (
    <div>
    {
      visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
    }
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around">
          <Grid item xs={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.headerTitle}>
                <b>Mon Compte</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div> 
      <div className={classes.body}>
      <Grid container direction="column" spacing={5}>
            <Grid item container spacing={2} direction="row" justify="space-between">
              <Grid item container direction="column" justify="space-between" xs={5}>
                <Grid item container><p className={classes.headerTitle}>{firstname} {lastname}</p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                    <Grid xs item container alignItems="stretch" direction="column">
                      <Grid item>
                        <TextField 
                          id="outlined-basic" 
                          variant="outlined"
                          value={lastname}
                          onChange={handleChangeLastName}
                        />
                      </Grid>
                      {errorsLastname.length > 0 && 
                      <span className={classes.error}>{errorsLastname}</span>}
                    </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={5} direction="row-reverse">
                <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                <label htmlFor="img_front">
                    {
                      <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        right: -20,
                        top: 13,
                        border: '2px solid gray',
                        padding: '0 4px',
                      }}
                      badgeContent={
                        <EditOutlinedIcon className={classes.editAvatar}/>
                      }
                    >
                      <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                    </Badge>
                    }
                </label>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Prénom</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={firstname}
                    onChange={handleChangeFirstName}
                  />
                </Grid>  
                {errorsFirstname.length > 0 && 
                      <span className={classes.error}>{errorsFirstname}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Adresse</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={address}
                    onChange={handleChangeAddress}
                  />
                </Grid>  
                {errorsAddress.length > 0 && 
                      <span className={classes.error}>{errorsAddress}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Email</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </Grid>  
                {errorsEmail.length > 0 && 
                      <span className={classes.error}>{errorsEmail}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Telephone</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={phone}
                    onChange={handleChangePhone}
                  />
                </Grid>  
                {errorsPhone.length > 0 && 
                      <span className={classes.error}>{errorsPhone}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Mot de passe actuel</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={old_password}
                    type="password"
                    onChange={handleChangeOldPassword}
                  />
                </Grid>
                {errorsOldPassword.length > 0 && 
                      <span className={classes.error}>{errorsOldPassword}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={new_password}
                    type="password"
                    onChange={handleChangeNewPassword}
                  />
                </Grid>
                {errorsNewPassword.length > 0 && 
                      <span className={classes.error}>{errorsNewPassword}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Confirmer le nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={confirm_password}
                    type="password"
                    onChange={handleChangeConfirmPassword}
                  />
                </Grid>
                {errorsConfirmPassword.length > 0 && 
                      <span className={classes.error}>{errorsConfirmPassword}</span>}
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Pièce d'identité avec face photo visible, uniquement pour authentification</p></Grid>
              <Grid  item container justify="flex-start">
                <input className={classes.input} type="file" id="img_auth" onChange={handleLoadAuth}/>
                <label htmlFor="img_auth">
                    {
                            authurl === '' ?
                            <div className={classes.img}>
                               <AddCircleOutlineIcon className={classes.plus}/>
                            </div> :
                            <img className={classes.img} src={authurl} alt=""/>
                    }
                </label>
              </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"} onClick = {onClickSave}/>
            </Grid>
          </Grid>
      </div>
    </div>
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(SubAccounts);
