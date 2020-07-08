import React from 'react';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import MyButton from 'components/MyButton';
import TextField from '@material-ui/core/TextField';

const ResetPassword = () => {
  
  const classes = useStyles();
  const logo = {
    url: '/images/Login.png',
  };
  return (
    <Grid   container direction="column" justify="flex-start" className={classes.root}>
      <Grid  item container justify="center">
        <img src={logo.url} className={classes.logo} alt=""/>
      </Grid>
      <Grid  item container justify="center">
      <p className={classes.title}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan mauris risus, ut
         tincidunt augue dictum eu. Donec molestie nibh purus, non sollicitudin nisl condimentum vitae. 
         Suspendisse vehicula laoreet ullamcorper. </p>
      </Grid>
      <Grid item container justify="center">
        <Grid item container xs={1} sm={2} md={4}></Grid>
        <Grid xs={10} sm={7} md={4} item container direction="column" className={classes.body}>
            <Grid item></Grid>
            <Grid item container justify="center">
              <p className={classes.boxTitle}><b>Réinitialiser le mot de passe</b></p>
            </Grid>
            <Grid item container className={classes.input}>
              <Grid xs={1} item></Grid>
              <Grid  xs={10} item container direction="column" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Nouveau mot de passe</p></Grid>
                <Grid item><TextField variant="outlined" fullWidth/></Grid>
                <Grid item><p className={classes.itemTitle}>Confirmez le mot de passe</p></Grid>
                <Grid item><TextField variant="outlined" fullWidth/></Grid>
              </Grid>
              <Grid xs={1} item></Grid>
            </Grid>
            <Grid item container justify="center">
              <MyButton name={"Réinitialiser"} color="1"/>
            </Grid>
        </Grid>
        <Grid item container xs={1} sm={2} md={4}></Grid>
      </Grid>
    </Grid>

  );
};

export default ResetPassword;
