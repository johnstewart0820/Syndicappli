import React, {  useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import {withRouter} from 'react-router-dom';
import AdminService from '../../../services/api.js';
import authService from '../../../services/authService.js';
import CircularProgress  from '@material-ui/core/CircularProgress';
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
  }
}));
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const Help = (props) => {
  const {history} = props;

  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
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
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);


  const handleChangeLastName = (event)=>{
    setLastName(event.target.value);
  }
  const handleChangeFirstName = (event)=>{
    setFirstName(event.target.value);
  }
  const handleChangeEmail = (event)=>{
    event.preventDefault();
    let errorsMail = 
          validEmailRegex.test(event.target.value)
            ? ''
            : 'Email is not valid!';
          setEmail(event.target.value);
          setErrorsEmail(errorsMail);
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
        switch(response.data.code){
          case 200:
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            const profile = response.data.data.profile;
            setLastName(profile.lastname);
            setFirstName(profile.firstname);
            setEmail(profile.email);
            setPhone(profile.phone);
            setAvatarUrl((AdminService.getProfileAvatar() + profile.photo_url));
            break;
          case 401:
            authService.logout();
            history.push('/login');
            window.location.reload();
            break;
          default:
            // ToastsStore.error(response.data.message);
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
         setVisibleIndicator(false);  
         switch(response.data.code){
          case 200:
            setErrorsOldPassword('');
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            break;
          case 401:
            authService.logout();
            history.push('/login');
            window.location.reload();
            break;
          default:
            // ToastsStore.error(response.data.message);
            setErrorsOldPassword('The current password is not correct');
        }
      },
      error => {     
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
                <b>D'aide</b>
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
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"} onClick = {onClickSave}/>
            </Grid>
          </Grid>
      </div>
    </div>
    </div>
  );
};

export default withRouter(Help);
