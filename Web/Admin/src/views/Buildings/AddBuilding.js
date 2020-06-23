import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../components/MyButton';
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,
        padding: theme.spacing(2, 4, 3),
    },
      footer: {
          paddingTop: 30,
      },
    root: {
        '& .MuiTextField-root': {
            width: '100%'
        },
        '& .MuiOutlinedInput-multiline':{
            padding: '3px 26px 3px 12px',
            fontSize: 16,
        },
        '& .MuiOutlinedInput-input':{
            padding: '3px 26px 3px 12px',
            fontSize: 16,
        },
    },
}));

const AddBuilding = (props) => {
  const classes = useStyles();
  const handleClose = ()=>{
    props.onCancel();
  };
  return (
    <div className={classes.root}>
        <div className={classes.paper} >
            <Grid container spacing={4} xs={12}>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Cabinet</p></Grid>
                    <Grid xs item container alignItems="stretch"><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Nom</p></Grid>
                    <Grid xs item container alignItems="stretch"><TextField id="outlined-basic" className={classes.text} rows={3} multiline variant="outlined" /></Grid>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Adresse</p></Grid>
                    <Grid xs item container alignItems="stretch"><TextField id="outlined-basic" className={classes.text} rows={3} multiline variant="outlined" /></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Clefs de répartition</p></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Compte Bancaire - Prélèvement SEPA</p></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Nom du titulaire du compte</p></Grid>
                    <Grid xs item container alignItems="stretch"><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                </Grid>
                <Grid item container alignItems="flex-start" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Adresse</p></Grid>
                    <Grid xs item container alignItems="stretch"><TextField id="outlined-basic" className={classes.text} rows={3} multiline variant="outlined" /></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>IBAN</p></Grid>
                    <Grid xs item container alignItems="stretch"><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                </Grid>
                <Grid xs={12} item container direction="column"  spacing={2}>
                    
                </Grid>
            </Grid>
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Créer"} color={"1"}/>
                    <MyButton name = {"Annuler"} bgColor="gray" handleClose={handleClose}/>  
                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddBuilding;
