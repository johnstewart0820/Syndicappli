import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../../components/MyButton';
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
        justifyContent: 'center',
        display: 'flex',
    },
    input: {
        display: 'none'
    },
    img: {
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        border: '1px dashed rgba(112,112,112,0.43)',
        borderRadius: 8,
        width: 116,
        height: 92,
    },
    div_indicator: {
        height: '100%',
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
        marginTop: '-60px',
        zIndex: 999,
    },
    indicator: {
        color: 'gray'
    }
}));

const AddCompany = (props) => {
  const classes = useStyles();
    
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [siret, setSiret] = useState('');
  const [vat, setVat] = useState('');
  const [accountname, setAccountName] = useState('');
  const [accountaddress, setAccountAddress] = useState('');
  const [IBAN, setIBAN] = useState('');

  useEffect(() => {

  }, []);
  
  const handleClose = ()=>{
    props.onCancel();
  };
  
  const handleLoadFront = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
  }

  const handleChangeName = (event) => {
      setName(event.target.value);
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  }

  const handleChangeSiret = (event) => {
    setSiret(event.target.value);
  }

  const handleChangeVat = (event) => {
    setVat(event.target.value);
  }

  const handleChangeAccountName = (event) => {
      setAccountName(event.target.value);
  }

  const handleChangeAccountAddress = (event) => {
      setAccountAddress(event.target.value);
  }

  const handleChangeIBAN = (event) => {
      setIBAN(event.target.value);
  }

  const handleClickAdd = () => {
      setVisibleIndicator(true);
  }

  return (
    <div className={classes.root}>
        {
            visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
        }
        <div className={classes.paper} >
            <Grid container spacing={4} xs={12}>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Nom</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={name} 
                            onChange={handleChangeName}
                        />   
                    </Grid>
                </Grid>
                <Grid item container direction="column" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Coordonnees</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            rows={3} 
                            multiline 
                            variant="outlined"
                            value={address}
                            onChange={handleChangeAddress} 
                        />
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Email</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={email}
                            onChange={handleChangeEmail} 
                        />
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Telephone</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={phone}
                            onChange={handleChangePhone}
                        />
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>SIRET</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={siret}
                            onChange={handleChangeSiret}
                        />
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>TVA Intracommunautaire</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={vat}
                            onChange={handleChangeVat}
                        />
                        </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Compte Bancaire - Prelevement SEPA</p></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Nom du titulaire du compte</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={accountname}
                            onChange={handleChangeAccountName}
                        />
                    </Grid>
                </Grid>
                <Grid item container alignItems="flex-start" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Adresse</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            rows={3} 
                            multiline 
                            variant="outlined" 
                            value={accountaddress}
                            onChange={handleChangeAccountAddress}
                        />
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:18}}>IBAN</p></Grid>
                    <Grid xs item container alignItems="stretch">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={IBAN}
                            onChange={handleChangeIBAN}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} item container direction="column"  spacing={2}>
                    <Grid item><p style={{fontSize:18}}>Logo</p></Grid>
                    <Grid item container justify="flex-start">
                    <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                    <label htmlFor="img_front">
                        {
                            avatarurl === '' ?
                             <div className={classes.img}>
                                <AddCircleOutlineIcon style={{width:31 , height: 31, color: '#707070'}}/>
                             </div> :
                             <img className={classes.img} src={avatarurl}/>
                        }
                    </label>
                    </Grid>
                </Grid>
            </Grid>
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Ajouter"} color={"1"} onClickSave={handleClickAdd}/>
                    <MyButton name = {"Annuler"} bgColor="gray" handleClose={handleClose}/>  
                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddCompany;
