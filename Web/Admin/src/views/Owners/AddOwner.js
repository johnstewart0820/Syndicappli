import React from 'react';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../components/MyButton';
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../components/MySelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Checkbox} from '@material-ui/core';
import IdCard from 'components/IdCard';
import {AddOwnerStyles as useStyles} from './useStyles';

const AddOwner = (props) => {
  const classes = useStyles();
  const [state,setState] = React.useState(false);
  const titleList = ['', 'Mr', 'Mrs', 'Mr & Mrs', 'Company', 'Indivision or PACS'];

  const [companies, setCompanies] = React.useState('');
  const [buildings, setBuildings] = React.useState('');

  const companiesList = titleList;
  const buildingsList = titleList;
  const [isSubAccount, setIsSubAccount] = React.useState(false);
  const [isMemberCouncil, setIsMemberCouncil] = React.useState(false);
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [idcardurls, setIdcardUrls] = React.useState([]);
  const [idcards, setIdcards] = React.useState([null]);
  const [ownerTitle, setOwnerTitle] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [apartNumber, setApartNumber] = React.useState('');

  const [errorsCompanies, setErrorsCompanies] = React.useState('');
  const [errorsBuildings, setErrorsBuildings] = React.useState('');
  const [errorsOwnerTitle, setErrorsOwnerTitle] = React.useState('');
  const [errorsLastname, setErrorsLastname] = React.useState('');
  const [errorsFirstname, setErrorsFirstname] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
  const [errorsAddress, setErrorsAddress] = React.useState('');

  const handleClose = ()=>{
    props.onCancel();
  };
  const handleCreate = ()=>{
    let cnt = 0;
    if(ownerTitle.length === 0) {setErrorsOwnerTitle('please enter owner title'); cnt++;}
    else setErrorsOwnerTitle('');
    if(lastname.length === 0) {setErrorsLastname('please enter owner last name'); cnt++;}
    else setErrorsLastname('');
    if(firstname.length === 0) {setErrorsFirstname('please enter owner first name'); cnt++;}
    else setErrorsFirstname('');
    if(companies.length === 0) {setErrorsCompanies('please select companies'); cnt++;}
    else setErrorsCompanies('');
    if(buildings.length === 0) {setErrorsBuildings('please select buildings'); cnt++;}
    else setErrorsBuildings('');
    if(email.length === 0) {setErrorsEmail('please enter owner email'); cnt++;}
    else setErrorsEmail('');
    if(phonenumber.length === 0) {setErrorsPhonenumber('please enter owner phone number'); cnt++;}
    else setErrorsPhonenumber('');
    if(address.length === 0) {setErrorsAddress('please enter address'); cnt++;}
    else setErrorsAddress('');

    if(cnt ===0){

        handleClose();
    }
  }
const handleLoadFront = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
}

const handleLoadIdcard = (event) => {
    idcardurls.push(URL.createObjectURL(event.target.files[0]));
    idcards.push(event.target.files[0])
    setIdcards(idcards);
    setIdcardUrls(idcardurls);
    setState(!state);
  }
  const handleClickCloseIdcard = (num)=>{
    delete idcardurls[num];
    delete idcards[num];
    setIdcards(idcards);
    setIdcardUrls(idcardurls);
    setState(!state);
  }
const handleChangeApartNumber = (event) => {
    setApartNumber(event.target.value);
}
const handleChangeIsSubAccount = (event) => {
    setIsSubAccount(event.target.checked);
}
const handleChangeIsMemberCouncil = (event) => {
    setIsMemberCouncil(event.target.checked);
}
const handleChangeOwnerTitle = (val) => {
    setOwnerTitle(val);
}
const handleChangeLastName = (event) => {
    setLastName(event.target.value);
}
const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
}
const handleChangeEmail = (event) => {
    setEmail(event.target.value);
}
const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
}
const handleChangeAddress = (event) => {
    setAddress(event.target.value);
}
const handleChangeCompanies = (val) => {
    setCompanies(val);
}
const handleChangeBuildings = (val) => {
    setBuildings(val);
}

  return (
    <div className={classes.root}>
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.title}>Carbinet</p></Grid>
                    <Grid xs item container>
                        <MySelect 
                            color="gray" 
                            data={companiesList} 
                            onChangeSelect={handleChangeCompanies}
                            value={companies}
                            width="50%"
                        />
                        {errorsCompanies.length > 0 && 
                        <span className={classes.error}>{errorsCompanies}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.title}>Immeuble</p></Grid>
                    <Grid xs item container>
                        <MySelect 
                            color="gray" 
                            data={buildingsList} 
                            onChangeSelect={handleChangeBuildings}
                            value={buildings}
                            width="50%"
                        />
                        {errorsBuildings.length > 0 && 
                        <span className={classes.error}>{errorsBuildings}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.title}>Civilité</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={titleList} 
                            onChangeSelect={handleChangeOwnerTitle}
                            value={ownerTitle}
                            width="50%"
                        />
                        {errorsOwnerTitle.length > 0 && 
                        <span className={classes.error}>{errorsOwnerTitle}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.title}>Nom</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={lastname}
                            onChange={handleChangeLastName} 
                        />
                        {errorsLastname.length > 0 && 
                        <span className={classes.error}>{errorsLastname}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container  alignItems="center" spacing={1}>
                    <Grid item><p className={classes.title}>Prénom</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={firstname}
                            onChange={handleChangeFirstName} 
                        />
                        {errorsFirstname.length > 0 && 
                        <span className={classes.error}>{errorsFirstname}</span>}
                    </Grid>
                </Grid>
                <Grid item container spacing={1} direction="column">
                    <Grid item><p className={classes.title}>Adresse</p></Grid>
                    <Grid  item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={address}
                            onChange={handleChangeAddress} 
                            multiline
                            fullWidth
                            rows={5}
                        />
                        {errorsAddress.length > 0 && 
                        <span className={classes.error}>{errorsAddress}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container alignItems="center" spacing={1}>
                    <Grid item ><p className={classes.title}>Email</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={email}
                            onChange={handleChangeEmail} 
                        />
                        {errorsEmail.length > 0 && 
                        <span className={classes.error}>{errorsEmail}</span>}
                    </Grid>
                </Grid>
                <Grid xs={6} item container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.title}>Téléphone</p></Grid>
                    <Grid xs item container direction="column">
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={phonenumber}
                            onChange={handleChangePhoneNumber} 
                        />
                        {errorsPhonenumber.length > 0 && 
                        <span className={classes.error}>{errorsPhonenumber}</span>}
                    </Grid>
                </Grid>
                <Grid item container justify="space-between" direction="row">
                    <Grid  item>
                        <Grid container   alignItems="center" spacing={1}>
                            <Grid item ><p className={classes.title}>Locataire</p></Grid>
                            <Grid xs item container>
                                <Checkbox 
                                    checked={isSubAccount}
                                    onChange={handleChangeIsSubAccount} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid  item>
                        <Grid  container  alignItems="center" spacing={1}>
                            <Grid item><p className={classes.title}>Membre du Conseil Syndical</p></Grid>
                            <Grid xs item container>
                                <Checkbox 
                                    checked={isMemberCouncil}
                                    onChange={handleChangeIsMemberCouncil} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item container direction="column" >
                    <p className={classes.title}>Photo de profil</p>
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
                <Grid item container alignItems="center" spacing={5}>
                    <Grid item><p className={classes.title}>Lot</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={apartNumber}
                            onChange={handleChangeApartNumber} 
                            style={{width: 100}}
                            type="number"
                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid item><p className={classes.title}>Clefs de répartition du lot</p></Grid>
                <br/>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.title}>Clef 1 :</p></Grid>
                    <Grid  item >
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={apartNumber}
                            onChange={handleChangeApartNumber} 
                            style={{width: 100}}
                            type="number"
                        />
                    </Grid>
                    <Grid  item><p className={classes.title}>tantièmes</p></Grid>
                </Grid>
                <Grid item style={{marginTop: 10, marginBottom: 10}}><MyButton name = {"Ajouter un lot"} bgColor="grey"/></Grid>
                <Grid xs={12} item container direction="column" style={{marginTop: 30}}>
                    <p className={classes.title}>Pièce d'identité</p>
                    <Grid item container justify="flex-start">
                        <IdCard 
                            onClose = {handleClickCloseIdcard}
                            idcardurls={idcardurls} 
                            state={state}
                        />
                        
                        <input className={classes.input} type="file" id="img_idcard" onChange={handleLoadIdcard}/>
                        <label htmlFor="img_idcard">
                            {
                                <div className={classes.img}>
                                    <AddCircleOutlineIcon className={classes.plus}/>
                                </div> 
                            }
                        </label>
                    </Grid>
                </Grid>
            </Grid>
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Créer"} color={"1"} onClick={handleCreate}/>
                    <MyButton name = {"Annuler"} bgColor="grey" onClick={handleClose}/>
                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddOwner;
