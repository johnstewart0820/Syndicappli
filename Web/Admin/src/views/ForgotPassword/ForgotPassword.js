import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from 'components/MyButton';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

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
const ForgotPassword = () => {
  const classes = useStyles();
  const logo = {
    url: '/images/Login.png',
  };
  return (
    <Grid   container direction="column" justify="flex-start" className={classes.root}>
      <Grid  item container justify="center">
        <img src={logo.url} className={classes.img}/>
      </Grid>
      <Grid  item container justify="center">
      <p className={classes.p}>Mot de passe perdu? Veuillez saisir votre identifiant ou adresse mail. Vous recevrez un lien pour créer un nouveau mot de passe par e-mail. </p>
      </Grid>
      <Grid item container justify="center">
        <Grid item container xs={1} sm={2} md={4}></Grid>
        <Grid xs={10} sm={8} md={4} item container direction="column" className={classes.body} spacing={7} >
            <Grid item container justify="center">
              <p style={{fontSize:35,padding:0}}><b>Mot de passe oublié</b></p>
            </Grid>
            <Grid item container spacing={5} >
              <Grid xs={1} item></Grid>
              <Grid  xs={10} item container direction="column" spacing={2}>
                <Grid item><p style={{fontSize:20}}>Nom d'utilisateur ou email</p></Grid>
                <Grid item><TextField variant="outlined" fullWidth/></Grid>
              </Grid>
              <Grid xs={1} item></Grid>
            </Grid>
            <Grid item container justify="center">
              <MyButton name={"Envoyer"} color="1"/>
            </Grid>
        </Grid>
        <Grid item container xs={1} sm={2} md={4}></Grid>
      </Grid>
    </Grid>

  );
};

export default ForgotPassword;
