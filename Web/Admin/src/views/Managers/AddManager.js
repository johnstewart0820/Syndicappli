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
        paddingTop: 89,
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

const AddManager = () => {
  const classes = useStyles();
  const cellList=[20, 50, 100, 200];
  return (
    <div className={classes.root}>
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container justify="center" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Carbinets</p></Grid>
                    <Grid xs={3} item container><MySelect color="gray" width="316px" data={cellList}/></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Immeubles</p></Grid>
                    <Grid xs={3} item container><MySelect color="gray" width="316px" data={cellList}/></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Nom</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Prénom</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Email</p></Grid>
                    <Grid xs={3} item container><TextField id="outlined-basic" className={classes.text} variant="outlined" /></Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Téléphone</p></Grid>
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
            <p style={{fontSize:18}}><b>Permissions</b></p>
            <br />
            <Grid container spacing={2}>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Immeubles</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Copropriétaires</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Messagerie</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Incidents</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Assemblées</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Événements</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Équipe</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Prestataires</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Annonces</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Cabinet</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Modules</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Factures</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Moyens de paiement</p>
                    <MySelect color="gray" width="176px" data={cellList}/>
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

export default AddManager;
