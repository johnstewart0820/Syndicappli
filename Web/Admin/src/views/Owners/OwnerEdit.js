import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../components/MySelect';
import MyButton from 'components/MyButton';
import theme from 'theme';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import authService from '../../services/authService.js';
import MyDialog from '../../components/MyDialog.js';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Checkbox} from '@material-ui/core';
import IdCard from 'components/IdCard';
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
      width: '500',
    },
    '& .MuiOutlinedInput-root':{
        // width: 150
    },
    '& .MuiOutlinedInput-input':{
        padding: '8px 12px',
        fontSize: 17
    },
    '& p':{
        marginBottom: 0
    },
  },
  tool: {
    minHeight: '67px'
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  body:{
    marginTop: theme.spacing(8),
    borderRadius: '30px',
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
    padding: theme.spacing(5)
  },
  item:{
    marginTop: theme.spacing(5),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  size: {
    width: 214,
    height: 214,
    cursor: 'pointer',
  },
  input: {
    display: 'none',
  }, 
  img: {
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      border: '1px dashed rgba(112,112,112,0.43)',
      borderRadius: 8,
      width: 362,
      height: 278,
      marginTop: 30,
      marginRight: 30
  },
  div_indicator: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    paddingLeft: '50%',
    alignItems: 'center',
    marginTop: '-60px',
    zIndex: 999,
  },
  indicator: {
    color: 'gray'
  },
  error:{
    color: 'red'
  },
}));
let idcardUrlsTemp=[];
let idcardsTemp=[];
const OwnerEdit = (props) => {
  const {history} = props;

  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/login");
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
  idcardUrlsTemp.push(URL.createObjectURL(event.target.files[0]));
  idcardsTemp.push(event.target.files[0])
  setIdcards(idcardsTemp);
  setIdcardUrls(idcardUrlsTemp);
  setState(!state);
}
const handleClickCloseIdcard = (num)=>{
  delete idcardUrlsTemp[num];
  delete idcardsTemp[num];
  setIdcards(idcardsTemp);
  setIdcardUrls(idcardUrlsTemp);
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
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Stéphane Dubois</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} style={{cursor:'pointer',fontSize:18}}>&lt; Retour à la liste des Copropriétaires</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid item container justify="space-between" direction="row-reverse" spacing={2}>
            <Grid xs item container  direction="column" spacing={2}>
                <Grid item container direction="row-reverse">
                  <input className={classes.input} type="file" id="img_avatar" onChange={handleLoadFront}/>
                  <label htmlFor="img_front">
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
                    badgeContent={<EditOutlinedIcon style={{
                      width: 54,
                      height: 54,
                      border: `2px solid ${theme.palette.background.paper}`,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      color: 'gray'
                    }}/>}
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
            <Grid xs item container direction="column" spacing={5}>
              <Grid item container><p  style={{fontSize:35}}><b>Informations</b></p></Grid>

              <Grid item></Grid>
              <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:25}}>Civilité</p></Grid>
                    <Grid xs item container direction="column">
                        <MySelect 
                            color="gray" 
                            data={titleList} 
                            onChangeSelect={handleChangeOwnerTitle}
                            value={ownerTitle}
                            width="134px"
                            disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                        />
                        {errorsOwnerTitle.length > 0 && 
                        <span className={classes.error}>{errorsOwnerTitle}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:25}}>Nom</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={lastname}
                            onChange={handleChangeLastName} 
                            disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                        />
                        {errorsLastname.length > 0 && 
                        <span className={classes.error}>{errorsLastname}</span>}
                    </Grid>
                </Grid>
                <Grid item container  alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:25}}>Prénom</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={firstname}
                            onChange={handleChangeFirstName} 
                            disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                        />
                        {errorsFirstname.length > 0 && 
                        <span className={classes.error}>{errorsFirstname}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item ><p style={{fontSize:25}}>Email</p></Grid>
                    <Grid xs item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={email}
                            onChange={handleChangeEmail} 
                            disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                        />
                        {errorsEmail.length > 0 && 
                        <span className={classes.error}>{errorsEmail}</span>}
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item><p style={{fontSize:25}}>Téléphone</p></Grid>
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
          <Grid item container spacing={5}>
            <Grid item container ></Grid>
            <Grid item container spacing={1} direction="column">
                <Grid item><p style={{fontSize:25}}>Adresse</p></Grid>
                <Grid  item container>
                    <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={address}
                        onChange={handleChangeAddress} 
                        multiline
                        rows={5}
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                    />
                    {errorsAddress.length > 0 && 
                    <span className={classes.error}>{errorsAddress}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
                <Grid item><p style={{fontSize:25}}>Carbinet</p></Grid>
                <Grid xs item container>
                    <MySelect 
                        color="gray" 
                        width="316px" 
                        data={companiesList} 
                        onChangeSelect={handleChangeCompanies}
                        value={companies}
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                    />
                    {errorsCompanies.length > 0 && 
                    <span className={classes.error}>{errorsCompanies}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
                <Grid item><p style={{fontSize:25}}>Immeuble</p></Grid>
                <Grid xs item container>
                    <MySelect 
                        color="gray" 
                        width="316px" 
                        data={buildingsList} 
                        onChangeSelect={handleChangeBuildings}
                        value={buildings}
                        disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                    />
                    {errorsBuildings.length > 0 && 
                    <span className={classes.error}>{errorsBuildings}</span>}
                </Grid>
            </Grid>
            <Grid xs={6} item container justify="space-between" direction="row">
                <Grid  item>
                    <Grid container   alignItems="center" spacing={1}>
                        <Grid item ><p style={{fontSize:25}}>Locataire</p></Grid>
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
                        <Grid item><p style={{fontSize:25}}>Membre du Conseil Syndical</p></Grid>
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
                <Grid item><p style={{fontSize:25}}>Lot</p></Grid>
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
            <Grid item><p style={{fontSize:25}}>Clefs de répartition du lot</p></Grid>
            <br/>
            <Grid item container alignItems="center" spacing={2}>
                <Grid item><p style={{fontSize:25}}>Clef 1 :</p></Grid>
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
                <Grid  item><p style={{fontSize:25}}>tantièmes</p></Grid>
            </Grid>
            <Grid item style={{marginTop: 10, marginBottom: 10}}><MyButton name = {"Ajouter un lot"} bgColor="grey"  disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/></Grid>
            <Grid xs={12} item container direction="column" style={{marginTop: 30}}>
                <p style={{fontSize:25}}>Pièce d'identité</p>
                <Grid item container justify="flex-start">
                    <IdCard 
                      onClose = {handleClickCloseIdcard}
                      idcardurls={idcardurls} 
                      disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}
                      state={state}
                      width={362}
                      height={278}
                      badgeSize={54}
                      badgePos={30}
                    />
                    
                    <input className={classes.input} type="file" id="img_idcard" onChange={handleLoadIdcard} disabled={(accessOwners ==='See'? 'disabled' : !'disabled')}/>
                    <label htmlFor="img_idcard">
                        {
                            <div className={classes.img}>
                                <AddCircleOutlineIcon style={{width:54 , height: 54, color: '#707070'}}/>
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
