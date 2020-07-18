import React, { useEffect } from 'react';
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
import { Checkbox } from '@material-ui/core';
import IdCard from 'components/IdCard';
import { EditOwnerStyles as useStyles } from './useStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import AdminService from '../../../services/api.js';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const OwnerEdit = (props) => {
  const { history } = props;

  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessOwners = authService.getAccess('role_owners');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [state, setState] = React.useState(false);
  const classes = useStyles();

  const titleList = ['', 'Mr', 'Mrs', 'Mr & Mrs', 'Company', 'Indivision or PACS'];

  let company = [];
  const [companies, setCompanies] = React.useState('');
  const [companyList, setCompanyList] = React.useState([]);
  const [companyID, setCompanyID] = React.useState(-1);

  let building = [];
  const [buildings, setBuildings] = React.useState('');
  const [buildingList, setBuildingList] = React.useState([]);
  const [buildingID, setBuildingID] = React.useState(-1);

  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
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
  const [companyName, setCompanyName] = React.useState('');

  const [errorsCompanies, setErrorsCompanies] = React.useState('');
  const [errorsBuildings, setErrorsBuildings] = React.useState('');
  const [errorsOwnerTitle, setErrorsOwnerTitle] = React.useState('');
  const [errorsLastname, setErrorsLastname] = React.useState('');
  const [errorsFirstname, setErrorsFirstname] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
  const [errorsAddress, setErrorsAddress] = React.useState('');
  const [errorsCompanyName, setErrorsCompanyName] = React.useState('');

  const [lotsList, setLotsList] = React.useState([]);
  const [stateLots, setStateLots] = React.useState(false);
  const voteList = [{ name: 'asd' }, { name: 'ad' }, { name: 'sdf' }];

  useEffect(() => {
    if (accessOwners === 'Denied') {
      setOpenDialog(true);
    }
    if (accessOwners !== 'Denied') {
      //  
      getCompanies();
    }
  }, [accessOwners]);
  useEffect(() => {
    getBuildings();
  }, [companyID]);
  const handleClick = () => {
    history.goBack();
  };
  const handleClose = () => {
    props.onCancel();
  };
  const handleClickSave = () => {
    let cnt = 0;
    if (ownerTitle.length === 0) { setErrorsOwnerTitle('please enter owner title'); cnt++; }
    else setErrorsOwnerTitle('');
    if (ownerTitle === '4') {
      if (companyName.length === 0) { setErrorsCompanyName('please enter company name'); cnt++; }
      else setErrorsCompanyName('');
    }
    else {
      if (lastname.length === 0) { setErrorsLastname('please enter owner last name'); cnt++; }
      else setErrorsLastname('');
      if (firstname.length === 0) { setErrorsFirstname('please enter owner first name'); cnt++; }
      else setErrorsFirstname('');
    }
    if (companies.length === 0) { setErrorsCompanies('please select companies'); cnt++; }
    else setErrorsCompanies('');
    if (buildings.length === 0) { setErrorsBuildings('please select buildings'); cnt++; }
    else setErrorsBuildings('');
    if (email.length === 0) { setErrorsEmail('please enter owner email'); cnt++; }
    else setErrorsEmail('');
    if (phonenumber.length === 0) { setErrorsPhonenumber('please enter owner phone number'); cnt++; }
    else setErrorsPhonenumber('');
    if (address.length === 0) { setErrorsAddress('please enter address'); cnt++; }
    else setErrorsAddress('');

    if (cnt === 0) {

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
  const handleClickCloseIdcard = (num) => {
    delete idcardurls[num];
    delete idcards[num];
    // idcardurls.splice(num, 1);
    // idcards.splice(num, 1);
    setIdcards(idcards);
    setIdcardUrls(idcardurls);
    setState(!state);
  }
  const handleChangeApartNumber = (event) => {
    setApartNumber(event.target.value);
  }
  const handleChangeIsSubAccount = (event) => {
    setIsSubAccount(event.target.checked);
    if (isSubAccount)
      setIsMemberCouncil(!isSubAccount);
    else
      setIsMemberCouncil(isSubAccount);
  }
  const handleChangeIsMemberCouncil = (event) => {
    setIsMemberCouncil(event.target.checked);
    if (isMemberCouncil)
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
  const handleChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
  }
  const handleChangeEmail = (event) => {
    event.preventDefault();
    let errorsMail =
      validEmailRegex.test(event.target.value)
        ? ''
        : 'Email is not valid!';
    setEmail(event.target.value);
    setErrorsEmail(errorsMail);
  }
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  }
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  }
  const handleChangeCompanies = (val) => {
    setCompanies(val);
    if (val < companyList.length)
      setCompanyID(companyList[val].companyID);
    else
      setCompanyID(-1);
  };
  const handleChangeBuildings = (val) => {
    setBuildings(val);
    if (val < buildingList.length)
      setBuildingID(buildingList[val].buildingID);
    else
      setBuildingID(-1);
  };
  const handleClickAddLots = (event) => {
    lotsList.push(voteList);
    setLotsList(lotsList);
    setStateLots(!stateLots);
  }
  const getCompanies = () => {
    setVisibleIndicator(true);
    AdminService.getCompanyListByUser()
      .then(
        response => {
          console.log(response.data);
          setVisibleIndicator(false);
          if (response.data.code !== 200) {
            ToastsStore.error(response.data.message);
          } else {
            console.log('success');
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            data.companylist.map((item) => (
              company.push(item.name)
            )
            );
            setCompanyList(data.companylist);
            setCompanyID(data.companylist[0].companyID);
            company.push('all');
          }
        },
        error => {
          ToastsStore.error('Cant connect to the server!');
          setVisibleIndicator(false);
        }
      );
  }
  const getBuildings = () => {
    const requestData = {
      'search_key': '',
      'page_num': 0,
      'row_count': '-1',
      'sort_column': '',
      'sort_method': '',
      'companyID': companyID
    }
    setVisibleIndicator(true);
    AdminService.getBuildingList(requestData)
      .then(
        response => {
          console.log(response.data);
          setVisibleIndicator(false);
          if (response.data.code !== 200) {
            console.log('error');
          } else {
            console.log('success');
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            data.buildinglist.map((item) => (
              building.push(item.name)
            )
            );
            setBuildingList(data.buildinglist);
            setBuildingID(data.buildinglist[0].buildingID);
            building.push('all');
          }
        },
        error => {
          console.log('fail');
          setVisibleIndicator(false);
        }
      );
  }
  const handleClickLoginAsOwner = () => {
    window.open('http://localhost:3000');
  }
  const handleClickResetPassword = () => {

  }
  const handleClickSuspendAccount = () => {

  }
  const handleClickDeleteAccount = () => {

  }
  return (
    <div className={classes.root}>
      {
        visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
      }
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
          <Grid item container><p className={classes.headerTitle}><b>Informations</b></p></Grid>

          <Grid item container justify="space-between" direction="row-reverse" spacing={2}>

            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item container direction="row-reverse">
                  <input className={classes.input} type="file" id="img_avatar" onChange={handleLoadFront} />
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
                        badgeContent={<EditOutlinedIcon className={classes.editAvatar} />}
                      >
                        <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                      </Badge>
                    }
                  </label>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={"Se connecter en tant que"}
                    color={"1"}
                    onClick={handleClickLoginAsOwner}
                    disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={"Réinitialiser le mot de passe"}
                    bgColor={"#00C9FF"}
                    onClick={handleClickResetPassword}
                    disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={"Suspendre le compte"}
                    bgColor={"#00C9FF"}
                    onClick={handleClickSuspendAccount}
                    disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  />
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={"Supprimer le compte"}
                    bgColor={"#00C9FF"}
                    onClick={handleClickDeleteAccount}
                    disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={5}>
                <Grid item></Grid>
                <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p className={classes.itemTitle}>Civilité</p></Grid>
                  <Grid xs item container direction="column">
                    <MySelect
                      color="gray"
                      data={titleList}
                      onChangeSelect={handleChangeOwnerTitle}
                      value={ownerTitle}
                      disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                    />
                    {errorsOwnerTitle.length > 0 &&
                      <span className={classes.error}>{errorsOwnerTitle}</span>}
                  </Grid>
                </Grid>
                {
                  ownerTitle === '4' ?
                    <Grid item container alignItems="center" spacing={1}>
                      <Grid item><p className={classes.itemTitle}>Carbinet Nom</p></Grid>
                      <Grid xs item container direction="column">
                        <TextField
                          className={classes.text}
                          variant="outlined"
                          value={companyName}
                          onChange={handleChangeCompanyName}
                          disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                          fullWidth
                        />
                        {errorsCompanyName.length > 0 &&
                          <span className={classes.error}>{errorsCompanyName}</span>}
                      </Grid>
                    </Grid>
                    :
                    <Grid item container direction="column" spacing={5}>
                      <Grid item container alignItems="center" spacing={1}>
                        <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                        <Grid xs item container direction="column">
                          <TextField
                            className={classes.text}
                            variant="outlined"
                            value={lastname}
                            onChange={handleChangeLastName}
                            disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                            fullWidth
                          />
                          {errorsLastname.length > 0 &&
                            <span className={classes.error}>{errorsLastname}</span>}
                        </Grid>
                      </Grid>
                      <Grid item container alignItems="center" spacing={1}>
                        <Grid item><p className={classes.itemTitle}>Prénom</p></Grid>
                        <Grid xs item container direction="column">
                          <TextField
                            className={classes.text}
                            variant="outlined"
                            value={firstname}
                            onChange={handleChangeFirstName}
                            disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                            fullWidth
                          />
                          {errorsFirstname.length > 0 &&
                            <span className={classes.error}>{errorsFirstname}</span>}
                        </Grid>
                      </Grid>
                    </Grid>
                }
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item ><p className={classes.itemTitle}>Email</p></Grid>
                  <Grid xs item container direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={email}
                      onChange={handleChangeEmail}
                      disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
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
                      className={classes.text}
                      variant="outlined"
                      value={phonenumber}
                      onChange={handleChangePhoneNumber}
                      disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
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
              <Grid item container direction="column">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={address}
                  onChange={handleChangeAddress}
                  multiline
                  rows={3}
                  disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  fullWidth
                />
                {errorsAddress.length > 0 &&
                  <span className={classes.error}>{errorsAddress}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Carbinet</p></Grid>
              <Grid item container direction="column">
                <MySelect
                  color="gray"
                  data={company}
                  onChangeSelect={handleChangeCompanies}
                  value={companies}
                  disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  width="50%"
                />
                {errorsCompanies.length > 0 &&
                  <span className={classes.error}>{errorsCompanies}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Immeuble</p></Grid>
              <Grid item container direction="column">
                <MySelect
                  color="gray"
                  data={building}
                  onChangeSelect={handleChangeBuildings}
                  value={buildings}
                  disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  width="50%"
                />
                {errorsBuildings.length > 0 &&
                  <span className={classes.error}>{errorsBuildings}</span>}
              </Grid>
            </Grid>
            <Grid xs={6} item container justify="space-between" direction="row">
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item ><p className={classes.itemTitle}>Locataire</p></Grid>
                  <Grid xs item container>
                    <Checkbox
                      checked={isSubAccount}
                      onChange={handleChangeIsSubAccount}
                      disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item><p className={classes.itemTitle}>Membre du Conseil Syndical</p></Grid>
                  <Grid xs item container>
                    <Checkbox
                      checked={isMemberCouncil}
                      onChange={handleChangeIsMemberCouncil}
                      disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                {
                  stateLots !== null ?
                    <Grid item container direction="column" spacing={5}>
                      {
                        lotsList.map((lot, i) => {
                          return (
                            <Grid key={i} item container direction="column" spacing={1}>
                              <Grid item container alignItems="center" spacing={1}>
                                <Grid item><p className={classes.itemTitle}>Lot</p></Grid>
                                <Grid xs item container>
                                  <TextField
                                    className={classes.text}
                                    variant="outlined"
                                    value={apartNumber}
                                    onChange={handleChangeApartNumber}
                                    style={{ width: 100 }}
                                    type="number"
                                  />
                                </Grid>
                              </Grid>
                              <Grid item><p className={classes.itemTitle}>Clefs de répartition du lot</p></Grid>

                              <Grid item container direction="column" spacing={1} >
                                {
                                  lot.map((vote, j) => {
                                    return (
                                      <Grid key={j} item container alignItems="center" spacing={1}>
                                        <Grid item><p className={classes.itemTitle}>{vote.name}</p></Grid>
                                        <Grid item >
                                          <TextField
                                            className={classes.text}
                                            variant="outlined"
                                            value={apartNumber}
                                            onChange={handleChangeApartNumber}
                                            style={{ width: 100 }}
                                            type="number"
                                          />
                                        </Grid>
                                        <Grid item><p className={classes.itemTitle}>tantièmes</p></Grid>
                                      </Grid>
                                    )
                                  })
                                }
                              </Grid>
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                    : null
                }

              </Grid>
              <Grid item style={{ marginTop: 10, marginBottom: 10 }}>
                <MyButton
                  name={"Ajouter un lot"}
                  bgColor="grey"
                  onClick={handleClickAddLots}
                  disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                />
              </Grid>
            </Grid>
            <Grid xs={12} item container direction="column" style={{ marginTop: 30 }}>
              <p className={classes.itemTitle}>Pièce d'identité</p>
              <Grid item container justify="flex-start">
                <IdCard
                  onClose={handleClickCloseIdcard}
                  idcardurls={idcardurls}
                  disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
                  state={state}
                  type="first"
                  badge="first"
                />

                <input className={classes.input} type="file" id="img_idcard" onChange={handleLoadIdcard} disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')} />
                <label htmlFor="img_idcard">
                  {
                    <div className={classes.img}>
                      <AddCircleOutlineIcon className={classes.plus} />
                    </div>
                  }
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <MyDialog open={openDialog} role={accessOwners} onClose={handleCloseDialog} />
            <MyButton
              name={"Sauvegarder"}
              color={"1"}
              onClick={handleClickSave}
              disabled={(accessOwners === 'See' ? 'disabled' : !'disabled')}
            />
          </Grid>
        </div>
      </Grid>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(OwnerEdit);
