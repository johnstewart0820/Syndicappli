import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import {withRouter} from 'react-router-dom';
import AdminService from './../../services/api.js';
import Toast from './../../components/Toast.js';
import authService from '../../services/authService.js';
import CircularProgress  from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-input':{
        padding: '17px 25px 17px 25px',
        fontSize: 22,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 8
    },
    '& p': {
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
    marginBottom: theme.spacing(4),
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
  text: {
    fontSize: 25
  },
  input: {
    display: 'none'
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
  }
}));
var msg = '';
var check = '';
const MyAccount = (props) => {
  const {history} = props;

  const token = authService.getToken();    
  if (!token) {
    history.push("/login");
    window.location.reload();
  }
  const classes = useStyles();
  const [lastname , setLastName] = React.useState('');
  const [firstname , setFirstName] = React.useState('');
  const [email , setEmail] = React.useState('');
  const [phone , setPhone] = React.useState('');
  const [old_password , setOldPassword] = React.useState('');
  const [new_password , setNewPassword] = React.useState('');
  const [confirm_password , setConfirmPassword] = React.useState('');

  const [errorsLastname , setErrorsLastName] = React.useState('');
  const [errorsFirstname , setErrorsFirstName] = React.useState('');
  const [errorsEmail , setErrorsEmail] = React.useState('');
  const [errorsPhone , setErrorsPhone] = React.useState('');
  const [errorsOldPassword , setErrorsOldPassword] = React.useState('');
  const [errorsNewPassword , setErrorsNewPassword] = React.useState('');
  const [errorsConfirmPassword , setErrorsConfirmPassword] = React.useState('');

  const [avatarurl, setAvatarUrl] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);
  const [openToast, setOpenToast] = React.useState(false);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);

  const handleToastClose = () => {
    setOpenToast(false);
  }
  const handleChangeLastName = (event)=>{
    setLastName(event.target.value);
  }
  const handleChangeFirstName = (event)=>{
    setFirstName(event.target.value);
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
  useEffect(()=>{

    setVisibleIndicator(true);
    AdminService.getProfile()
    .then(      
      response => {        
        setVisibleIndicator(false);  
        if(response.data.code != 200){
          
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
    if(lastname.length == 0) {setErrorsLastName('please enter your last name'); cnt++;}
    else setErrorsLastName('');
    if(firstname.length == 0) {setErrorsFirstName('please enter your first name'); cnt++;}
    else setErrorsFirstName('');
    if(email.length == 0) {setErrorsEmail('please enter your email'); cnt++;}
    else setErrorsEmail('');
    if(phone.length == 0) {setErrorsPhone('please enter your phone number'); cnt++;}
    else setErrorsPhone('');
    // if(old_password.length == 0) {setErrorsOldPassword('please enter your current password'); }
    if(new_password.length != 0 && new_password.length < 5) {setErrorsNewPassword('Password must be 5 characters long!'); }
    else setErrorsNewPassword('');
     // if(confirm_password.length == 0) {setErrorsConfirmPassword('please enter your confirm password');}
    if(new_password != confirm_password) {setErrorsConfirmPassword('mismatch your new password'); cnt++}
    else setErrorsConfirmPassword('');
    if(cnt == 0) setData();
  }
  const setData = ()=>{
    let formdata = new FormData();
    
    formdata.set('lastname', lastname);
    formdata.set('firstname', firstname);
    formdata.set('email', email);
    formdata.set('phone', phone);
    formdata.set('old_password', old_password);
    formdata.set('new_password', new_password);
    formdata.set('avatar', avatar == null? '':avatar);
    setVisibleIndicator(true);
    AdminService.updateProfile(formdata)
    .then(      
      response => {        
        console.log(response.data);
         setVisibleIndicator(false);  
        if(response.data.code != 200){
          console.log('error');
          msg=response.data.message;
          check = "error";
          setOpenToast(true);
          setErrorsOldPassword('The current password is not correct');
        } else {
           msg="success";
           check="success";
           setOpenToast(true);
           setErrorsOldPassword('');
           localStorage.setItem("token", JSON.stringify(response.data.data.token));
        }
      },
      error => {
        console.log('fail');
        msg="server fail";
        check = "error";
        setOpenToast(true);        
         setVisibleIndicator(false);
      }
    );  
  }
  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
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
              <Typography variant="h2" style={{fontSize:35}}>
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
                <Grid item container><p style={{fontSize:37}}>{firstname} {lastname}</p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.text}>Nom</p></Grid>
                    <Grid xs item container alignItems="stretch" direction="column">
                      <Grid item>
                        <TextField 
                          id="outlined-basic" 
                          className={classes.text} 
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
                        <EditOutlinedIcon style={{
                          width: 54,
                          height: 54,
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          color: 'gray'
                        }}/>
                      }
                    >
                      <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                    </Badge>
                    }
                </label>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Prénom</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
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
              <Grid item><p className={classes.text}>Email</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
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
              <Grid item><p className={classes.text}>Telephone</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
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
              <Grid item><p className={classes.text}>Mot de passe actuel</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
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
              <Grid item><p className={classes.text}>Nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
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
              <Grid item><p className={classes.text}>Confirmer le nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
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
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"} onClick = {onClickSave}/>
              <Toast openToast={openToast} msg={msg} state={check} onClose={handleToastClose}/>
            </Grid>
          </Grid>
      </div>
    </div>
    </div>
  );
};

export default withRouter(MyAccount);
