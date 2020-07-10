import React, {  useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../../components/MySelect';
import MyButton from 'components/MyButton';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import authService from '../../../services/authService.js';
import MyDialog from '../../../components/MyDialog.js';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Checkbox} from '@material-ui/core';
import IdCard from 'components/IdCard';
import {EditOwnerStyles as useStyles} from './useStyles';

const OwnerEdit = (props) => {
  const {history} = props;

  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessOwners = authService.getAccess('role_owners');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [state,setState] = React.useState(false);
  const classes = useStyles();

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

  useEffect(() => {
    if(accessOwners === 'Denied'){
      setOpenDialog(true);
    }
    if(accessOwners !== 'Denied'){
      //  
    }
  },[accessOwners]);

  const handleClick = ()=>{
    history.goBack();
  };
  const handleClose = ()=>{
    props.onCancel();
  };
  const onClickSave = ()=>{
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
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };

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
  if(isSubAccount)
    setIsMemberCouncil(!isSubAccount);
  else
    setIsMemberCouncil(isSubAccount);
}
const handleChangeIsMemberCouncil = (event) => {
  setIsMemberCouncil(event.target.checked);
  if(isMemberCouncil)
    setIsSubAccount(!isMemberCouncil);
  else
    setIsSubAccount(isMemberCouncil);
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
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.headerTitle}>
                <b>Stéphane Dubois</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la liste des Copropriétaires</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
        <Grid item container><p  className={classes.headerTitle}><b>Informations</b></p></Grid>

          <Grid item container justify="space-between" direction="row-reverse" spacing={2}>
            
            <Grid  alignItems>
              <Grid container direction="column" spacing={2}>
                <Grid item container direction="row-reverse">
                  <input className={classes.input} type="file" id="img_avatar" onChange={handleLoadFront}/>
                  <label htmlFor="img_avatar">
                  {
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                      right: -20,
                      top: 10,
                      border: '2px solid gray',
                      padding: '1px 4px',
                    }}
                    badgeContent={<EditOutlinedIcon className={classes.editAvatar}/>}
                  >
                    <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                  </Badge>
                  }
                  </label>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Se connecter en tant que"} color={"1"} onClick={onClickSave} disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Réinitialiser le mot de passe"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Suspendre le compte"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton   name={"Supprimer le compte"} bgColor={"#00C9FF"} onClick={onClickSave} disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid  item>
              <Grid container  direction="column" spacing={5}>
                <Grid item></Grid>
                <Grid item container alignItems="center" spacing={2}>
                      <Grid item><p className={classes.itemTitle}>Civilité</p></Grid>
                      <Grid xs item container direction="column">
                          <MySelect 
                              color="gray" 
                              data={titleList} 
                              onChangeSelect={handleChangeOwnerTitle}
                              value={ownerTitle}
                              disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                          />
                          {errorsOwnerTitle.length > 0 && 
                          <span className={classes.error}>{errorsOwnerTitle}</span>}
                      </Grid>
                  </Grid>
                  <Grid item container alignItems="center" spacing={1}>
                      <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                      <Grid xs item container direction="column">
                          <TextField 
                              id="outlined-basic" 
                              className={classes.text} 
                              variant="outlined"
                              value={lastname}
                              onChange={handleChangeLastName} 
                              disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                              fullWidth
                          />
                          {errorsLastname.length > 0 && 
                          <span className={classes.error}>{errorsLastname}</span>}
                      </Grid>
                  </Grid>
                  <Grid item container  alignItems="center" spacing={1}>
                      <Grid item><p className={classes.itemTitle}>Prénom</p></Grid>
                      <Grid xs item container direction="column">
                          <TextField 
                              id="outlined-basic" 
                              className={classes.text} 
                              variant="outlined" 
                              value={firstname}
                              onChange={handleChangeFirstName} 
                              disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                              fullWidth
                          />
                          {errorsFirstname.length > 0 && 
                          <span className={classes.error}>{errorsFirstname}</span>}
                      </Grid>
                  </Grid>
                  <Grid item container alignItems="center" spacing={1}>
                      <Grid item ><p className={classes.itemTitle}>Email</p></Grid>
                      <Grid xs item container direction="column">
                          <TextField 
                              id="outlined-basic" 
                              className={classes.text} 
                              variant="outlined"
                              value={email}
                              onChange={handleChangeEmail} 
                              disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                              fullWidth
                          />
                          {errorsEmail.length > 0 && 
                          <span className={classes.error}>{errorsEmail}</span>}
                      </Grid>
                  </Grid>
                  <Grid item container alignItems="center" spacing={1}>
                      <Grid item><p className={classes.itemTitle}>Téléphone</p></Grid>
                      <Grid xs item container>
                          <TextField 
                              id="outlined-basic" 
                              className={classes.text} 
                              variant="outlined" 
                              value={phonenumber}
                              onChange={handleChangePhoneNumber} 
                              disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                          />
                          {errorsPhonenumber.length > 0 && 
                          <span className={classes.error}>{errorsPhonenumber}</span>}
                      </Grid>
                  </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={5}>
            <Grid item container ></Grid>
            <Grid item container spacing={1} direction="column">
                <Grid item><p className={classes.itemTitle}>Adresse</p></Grid>
                <Grid  item container direction="column">
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={address}
                        onChange={handleChangeAddress} 
                        multiline
                        rows={3}
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                        fullWidth
                    />
                    {errorsAddress.length > 0 && 
                    <span className={classes.error}>{errorsAddress}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
                <Grid item><p className={classes.itemTitle}>Carbinet</p></Grid>
                <Grid  item container direction="column">
                    <MySelect 
                        color="gray" 
                        data={companiesList} 
                        onChangeSelect={handleChangeCompanies}
                        value={companies}
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                        width="50%"
                    />
                    {errorsCompanies.length > 0 && 
                    <span className={classes.error}>{errorsCompanies}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
                <Grid item><p className={classes.itemTitle}>Immeuble</p></Grid>
                <Grid  item container direction="column">
                    <MySelect 
                        color="gray" 
                        data={buildingsList} 
                        onChangeSelect={handleChangeBuildings}
                        value={buildings}
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                        width="50%"
                    />
                    {errorsBuildings.length > 0 && 
                    <span className={classes.error}>{errorsBuildings}</span>}
                </Grid>
            </Grid>
            <Grid xs={6} item container justify="space-between" direction="row">
                <Grid  item>
                    <Grid container   alignItems="center" spacing={1}>
                        <Grid item ><p className={classes.itemTitle}>Locataire</p></Grid>
                        <Grid xs item container>
                            <Checkbox 
                                checked={isSubAccount}
                                onChange={handleChangeIsSubAccount} 
                                disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid  item>
                    <Grid  container  alignItems="center" spacing={1}>
                        <Grid item><p className={classes.itemTitle}>Membre du Conseil Syndical</p></Grid>
                        <Grid xs item container>
                            <Checkbox 
                                checked={isMemberCouncil}
                                onChange={handleChangeIsMemberCouncil} 
                                disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={5}>
                <Grid item><p className={classes.itemTitle}>Lot</p></Grid>
                <Grid xs item container>
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={apartNumber}
                        onChange={handleChangeApartNumber} 
                        style={{width: 100}}
                        type="number"
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                    />
                </Grid>
            </Grid>
            <br/>
            <Grid item><p className={classes.itemTitle}>Clefs de répartition du lot</p></Grid>
            <br/>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.itemTitle}>Clef 1 :</p></Grid>
                <Grid  item >
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={apartNumber}
                        onChange={handleChangeApartNumber} 
                        style={{width: 100}}
                        type="number"
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                    />
                </Grid>
                <Grid  item><p className={classes.itemTitle}>tantièmes</p></Grid>
            </Grid>
            <Grid item style={{marginTop: 10, marginBottom: 10}}><MyButton name = {"Ajouter un lot"} bgColor="grey"  disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/></Grid>
            <Grid xs={12} item container direction="column" style={{marginTop: 30}}>
                <p className={classes.itemTitle}>Pièce d'identité</p>
                <Grid item container justify="flex-start">
                    <IdCard 
                      onClose = {handleClickCloseIdcard}
                      idcardurls={idcardurls} 
                      disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                      state={state}
                      type="first"
                      badge="first"
                    />
                    
                    <input className={classes.input} type="file" id="img_idcard" onChange={handleLoadIdcard} disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/>
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
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyDialog open={openDialog} role={accessOwners} onClose={handleCloseDialog}/>
              <MyButton   name={"Sauvegarder"} color={"1"} onClick={onClickSave} disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/>
            </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(OwnerEdit);
