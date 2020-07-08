import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../../../components/MyButton';
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {AddCompanyStyles as useStyles} from './useStyles';

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
                    <Grid item><p className={classes.title}>Nom</p></Grid>
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
                    <Grid item><p className={classes.title}>Coordonnees</p></Grid>
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
                    <Grid item><p className={classes.title}>Email</p></Grid>
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
                    <Grid item><p className={classes.title}>Telephone</p></Grid>
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
                    <Grid item><p className={classes.title}>SIRET</p></Grid>
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
                    <Grid item><p className={classes.title}>TVA Intracommunautaire</p></Grid>
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
                    <Grid item><p className={classes.title}>Compte Bancaire - Prelevement SEPA</p></Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.title}>Nom du titulaire du compte</p></Grid>
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
                    <Grid item><p className={classes.title}>Adresse</p></Grid>
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
                    <Grid item><p className={classes.title}>IBAN</p></Grid>
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
                    <Grid item><p className={classes.title}>Logo</p></Grid>
                    <Grid item container justify="flex-start">
                    <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                    <label htmlFor="img_front">
                        {
                            avatarurl === '' ?
                             <div className={classes.img}>
                                <AddCircleOutlineIcon className={classes.plus}/>
                             </div> :
                             <img className={classes.img} src={avatarurl} alt=""/>
                        }
                    </label>
                    </Grid>
                </Grid>
            </Grid>
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Ajouter"} color={"1"} onClick={handleClickAdd}/>
                    <MyButton name = {"Annuler"} bgColor="gray" onClick={handleClose}/>  

                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddCompany;
