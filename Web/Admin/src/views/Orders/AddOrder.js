import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../components/MyButton';
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../components/MySelect';

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
            width: '500',
        },
        '& .MuiOutlinedInput-root':{
            width: 160
        },
        '& .MuiOutlinedInput-input':{
            padding: '3px 26px 3px 12px',
            fontSize: 16
        },
    },
}));

const AddOrder = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container justify="center" alignItems="center">
                    <Grid xs={3} item container><p>Carbinets</p></Grid>
                    <Grid xs={3} item container><MySelect /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p>Immeubles</p></Grid>
                    <Grid xs={3} item container><MySelect /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p>First Name</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p>Last Name</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p>Email</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p>Telephone</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p>Phone Number</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid xs={12} item container direction="column" >
                    <p>Photo</p>
                    <Grid item container justify="flex-start">
                    <IconButton xs={6}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        >
                        <PhotoCamera />
                    </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <br/>
            <h3>Permissions</h3>
            <br />
            <Grid container spacing={2}>
                <Grid xs={6} item container direction="column">
                    <p>Cabinets</p>
                    <MySelect />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p>Gestionnaires</p>
                    <MySelect />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p>Immeuables</p>
                    <MySelect />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p>Coproprietaires</p>
                    <MySelect />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p>Commandes</p>
                    <MySelect />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p>Prodults</p>
                    <MySelect />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p>Codes Promo</p>
                    <MySelect />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p>Utilisateurs</p>
                    <MySelect />
                </Grid>
            </Grid>
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Creer"} color={"1"}/>
                    <MyButton name = {"Annuler"} bgColor="grey"/>
                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddOrder;
