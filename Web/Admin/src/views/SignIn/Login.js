import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from 'components/MyButton';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import AdminService from './../../services/api.js';
import Toast from '../../components/Toast.js';
import CircularProgress  from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(19),
    justifyContent: 'center',
    '& .MuiOutlinedInput-input':{
      padding: '17px 25px 17px 25px',
      fontSize: 22,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 8
    }
  },
  p: {
    [theme.breakpoints.up('sm')]: {
     width: 958,
     padding: 61,
    },
    fontSize: 20,
    color: 'white',
    textIndent: -10,
    textAlign: 'center'
  },
  img:{
    [theme.breakpoints.down('sm')]: {
      width: 219,
      height: 45
    }

  },  
  forgot: {
    fontSize:18 , 
    color: 'white',
    textDecoration: 'underline',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingRight:4
  },
  body: {
    paddingTop:theme.spacing(3),
    backgroundColor: 'white',
    borderRadius: 15,
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
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
const Login = (props) => {
  const classes = useStyles();
  const {history} = props;
  const [openToast, setOpenToast] = React.useState(false);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [email , setEmail] = React.useState(null);
  const [password , setPassword] = React.useState(null);
  const [errorsEmail , setErrorsEmail] = React.useState('');
  const [errorsPassword , setErrorsPassword] = React.useState('');

  const handleChangeEmail = (event) => {
    event.preventDefault();
    let errorsMail = 
          validEmailRegex.test(event.target.value)
            ? ''
            : 'Email is not valid!';
          setEmail(event.target.value);
          setErrorsEmail(errorsMail);
  }
  const handleChangePassword = (event) => {
    event.preventDefault();
    let errorsPass = 
          event.target.value.length < 5
            ? 'Password must be 5 characters long!'
            : '';
            setPassword(event.target.value);
            setErrorsPassword(errorsPass);
  }
  const handleToastClose = () => {
    setOpenToast(false);
  }
  const handleClickButton = () => {

    if(validateForm(errorsEmail) && validateForm(errorsPassword)) {

    var data={};
    data['email'] = email;
    data['password'] = password;
    // setVisibleIndicator(true);
    AdminService.login(data)
    .then(      
      response => {        
         setVisibleIndicator(false);  
        if(response.data.code !== 200){
          msg=response.data.message;
          check="error";
          setOpenToast(true);
        } else {
          msg="success";
          check="success";
          setOpenToast(true);
          let profile = response.data.data.profile;
          localStorage.setItem("token", JSON.stringify(response.data.data.token));
          localStorage.setItem("role_companies", JSON.stringify(profile.role_companies));
          localStorage.setItem("role_managers", JSON.stringify(profile.role_managers));
          localStorage.setItem("role_buildings", JSON.stringify(profile.role_buildings));
          localStorage.setItem("role_owners", JSON.stringify(profile.role_owners));
          localStorage.setItem("role_orders", JSON.stringify(profile.role_orders));
          localStorage.setItem("role_products", JSON.stringify(profile.role_products));
          localStorage.setItem("role_discountcodes", JSON.stringify(profile.role_discountcodes));
          localStorage.setItem("role_users", JSON.stringify(profile.role_users));
          history.push('/dashboard');
        }
      },
      error => {
        msg="fail";  
        check="error";      
         setVisibleIndicator(false);
        setOpenToast(true);

      }
    );    
    }
  }

  const logo = {
    url: '/images/Login.png',
  };
  return (
    <div>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }

    <Grid   container direction="column" justify="flex-start" className={classes.root}>
      <Grid  item container justify="center">
        <img src={logo.url} className={classes.img} alt=""/>
      </Grid>
      <Grid  item container justify="center">
      <p className={classes.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan mauris risus, ut
         tincidunt augue dictum eu. Donec molestie nibh purus, non sollicitudin nisl condimentum vitae. 
         Suspendisse vehicula laoreet ullamcorper. </p>
      </Grid>
      <Grid item container justify="center">
        <Grid item container xs={1} sm={2} md={4}></Grid>
        <Grid xs={10} sm={8} md={4} item container direction="column" className={classes.body} spacing={7} >
            <Grid item container justify="center">
              <p style={{fontSize:35,padding:0}}><b>Connexion</b></p>
            </Grid>
            <Grid item container spacing={5} >
              <Grid xs={1} item></Grid>
              <Grid  xs={10} item container direction="column" spacing={2}>
                <Grid item><p style={{fontSize:20}}>Email</p></Grid>
                <Grid item>
                  <TextField 
                    name = "email"
                    type="email"
                    value={email}
                    fullWidth
                    onChange={handleChangeEmail}
                    noValidate
                    variant="outlined" 
                  />
                </Grid>
                {errorsEmail.length > 0 && 
                <span className={classes.error}>{errorsEmail}</span>}
                <Grid item><p style={{fontSize:20}}>Mot de passe</p></Grid>
                <Grid item>
                  <TextField 
                    name="password"
                    variant="outlined" 
                    fullWidth
                    value={password}
                    onChange={handleChangePassword}
                    type="password"
                    noValidate
                  />
                  {errorsPassword.length > 0 && 
                <span className={classes.error}>{errorsPassword}</span>}
                </Grid>
              </Grid>
              <Grid xs={1} item></Grid>
            </Grid>
            <Grid item container justify="center">
              <Toast openToast={openToast} msg={msg} state={check} onClose={handleToastClose}/>
              <MyButton name={"Se connecter"} color="1" onClick={handleClickButton}/>
            </Grid>
        </Grid>
        <Grid item container xs={1} sm={2} md={4}></Grid>
      </Grid>
      <Grid item container justify="center">
          <Grid item container xs={1} sm={2} md={4}></Grid>
          <Grid item container xs={10} sm={8} md={4}>
            <Grid item container direction="row-reverse">
              <Link href="/forgotpassword" variant="body2">
                <p className={classes.forgot}>J'ai oublié mon mot de passe</p>
              </Link>
            </Grid>
          </Grid>
          <Grid item container xs={1} sm={2} md={4}></Grid>
        </Grid>
    </Grid>
    </div>
  );
};

export default withRouter(Login);
