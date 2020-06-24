import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from 'components/MyButton';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import AdminService from './../../services/api.js';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(19),
    justifyContent: 'center',
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
  }
}));
const Login = (props) => {
  const classes = useStyles();
  const {history} = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleClickLogin = () => {
    var data={};
    data['email'] = email;
    data['password'] = password;
    // setVisibleIndicator(true);
    AdminService.login(data)
    .then(      
      response => {        
        console.log(response.data);
        // setVisibleIndicator(false);  
        if(response.data.code != 200){
          // if(response.data.status === 'Token is Expired') {
          //   authService.logout();
          //   history.push('/');
          // }
          console.log('error');
        } else {
          console.log('success');
          localStorage.setItem("token", JSON.stringify(response.data.data.token));
          history.push('/')
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

  const logo = {
    url: '/images/Login.png',
  };
  return (
    <Grid   container direction="column" justify="flex-start" className={classes.root}>
      <Grid  item container justify="center">
        <img src={logo.url} className={classes.img}/>
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
                    variant="outlined" 
                    fullWidth
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </Grid>
                <Grid item><p style={{fontSize:20}}>Mot de passe</p></Grid>
                <Grid item>
                  <TextField 
                    variant="outlined" 
                    fullWidth
                    value={password}
                    onChange={handleChangePassword}
                  />
                </Grid>
              </Grid>
              <Grid xs={1} item></Grid>
            </Grid>
            <Grid item container justify="center">
              <MyButton name={"Se connecter"} color="1" onLoginClick={handleClickLogin}/>
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

  );
};

export default withRouter(Login);
