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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Checkbox } from '@material-ui/core';
import IdCard from 'components/IdCard';
import { EditOwnerStyles as useStyles } from './useStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { ManagerService as Service } from '../../../services/api.js';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteConfirmDialog from 'components/DeleteConfirmDialog';
const ManagerService = new Service();
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}
const OwnerEdit = (props) => {
  const { history } = props;

  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  const accessOwners = authService.getAccess('role_owners');
  const [state, setState] = React.useState(false);
  const classes = useStyles();

  const titleList = ['', 'Mr', 'Mrs', 'Mr & Mrs', 'Company', 'Indivision', 'PACS'];

  const [companyID, setCompanyID] = React.useState(-1);
  const [suspendState, setSuspendState] = React.useState('Suspendre le compte');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(-1);
  const [building, setBuilding] = React.useState([]);
  const [buildings, setBuildings] = React.useState('');
  const [buildingList, setBuildingList] = React.useState([]);
  const [buildingID, setBuildingID] = React.useState(-1);

  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [isSubAccount, setIsSubAccount] = React.useState(false);
  const [isMemberCouncil, setIsMemberCouncil] = React.useState(false);
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [idcardurls, setIdcardUrls] = React.useState([]);
  const [idcards, setIdcards] = React.useState([]);
  const [ownerTitle, setOwnerTitle] = React.useState(0);
  const [lastname, setLastName] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname1, setLastName1] = React.useState('');
  const [firstname1, setFirstName1] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [apartNumber, setApartNumber] = React.useState([]);
  const [companyName, setCompanyName] = React.useState('');

  const [errorsBuildings, setErrorsBuildings] = React.useState('');
  const [errorsOwnerTitle, setErrorsOwnerTitle] = React.useState('');
  const [errorsLastname, setErrorsLastname] = React.useState('');
  const [errorsFirstname, setErrorsFirstname] = React.useState('');
  const [errorsLastname1, setErrorsLastname1] = React.useState('');
  const [errorsFirstname1, setErrorsFirstname1] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhonenumber, setErrorsPhonenumber] = React.useState('');
  const [errorsAddress, setErrorsAddress] = React.useState('');
  const [errorsCompanyName, setErrorsCompanyName] = React.useState('');
  const [errorsLotsList, setErrorsLotsList] = React.useState('');

  const [lotsList, setLotsList] = React.useState([]);
  const [stateLots, setStateLots] = React.useState(false);
  const [buildingVote, setBuildingVote] = React.useState([]);
  const [voteAmount, setVoteAmount] = React.useState(Array.from({ length: 100 }, () => Array.from({ length: buildingVote.length }, () => null)));
  let voteLists = [];
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    history.goBack();
  };
  const handleClickSave = () => {
    if (apartNumber.length !== 0 && voteAmount.length !== 0)
      setCount(count + 1);
    let cnt = 0;
    if (ownerTitle === 0) { setErrorsOwnerTitle('please enter owner title'); cnt++; }
    else setErrorsOwnerTitle('');
    if (ownerTitle === 4) {
      if (companyName.length === 0) { setErrorsCompanyName('please enter company name'); cnt++; }
      else setErrorsCompanyName('');
    } else if (ownerTitle === 3 || ownerTitle === 6) {
      if (lastname.length === 0) { setErrorsLastname('please enter owner last name'); cnt++; }
      else setErrorsLastname('');
      if (firstname.length === 0) { setErrorsFirstname('please enter owner first name'); cnt++; }
      else setErrorsFirstname('');
      if (lastname1.length === 0) { setErrorsLastname1('please enter owner last name'); cnt++; }
      else setErrorsLastname1('');
      if (firstname1.length === 0) { setErrorsFirstname1('please enter owner first name'); cnt++; }
      else setErrorsFirstname1('');
    }
    else {
      if (lastname.length === 0) { setErrorsLastname('please enter owner last name'); cnt++; }
      else setErrorsLastname('');
      if (firstname.length === 0) { setErrorsFirstname('please enter owner first name'); cnt++; }
      else setErrorsFirstname('');
    }
    if (buildingID === -1) { setErrorsBuildings('please select buildings'); cnt++; }
    else setErrorsBuildings('');
    if (email.length === 0) { setErrorsEmail('please enter owner email'); cnt++; }
    else setErrorsEmail('');
    if (phonenumber.length === 0) { setErrorsPhonenumber('please enter owner phone number'); cnt++; }
    else setErrorsPhonenumber('');
    if (address.length === 0) { setErrorsAddress('please enter address'); cnt++; }
    else setErrorsAddress('');
    if (count === 0) { setErrorsLotsList('please check a Lot'); cnt++; }
    else setErrorsLotsList('');
    if (cnt === 0) {
      updateOwner();
    }
  }
  const handleLoadFront = (event) => {
    if (event.target.files[0] !== undefined) {
      if (validFileType(event.target.files[0])) {
        if (event.target.files[0].size > 5 * 1048576) {
          ToastsStore.warning('Image size should be low than 5 MB.');
        } else {
          setAvatar(event.target.files[0]);
          setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
      }
      else {
        ToastsStore.warning('Image format is not correct.');
      }
    }
  }
  const handleLoadIdcard = (event) => {
    if (event.target.files[0] !== undefined) {
      if (validFileType(event.target.files[0])) {
        if (event.target.files[0].size > 5 * 1048576) {
          ToastsStore.warning('Image size should be low than 5 MB.');
        } else {
          idcardurls.push(URL.createObjectURL(event.target.files[0]));
          idcards.push(event.target.files[0])
          setIdcards(idcards);
          setIdcardUrls(idcardurls);
          setState(!state);
        }
      }
      else {
        ToastsStore.warning('Image format is not correct.');
      }
    }
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
  const handleChangeApartNumber = (event, i) => {
    let apartment = [...apartNumber];
    apartment[i] = +event.target.value;
    setApartNumber(apartment);
  }
  const handleChangeVoteAmount = (event, i, j) => {
    let voteamount = [...voteAmount];
    voteamount[i][j] = +event.target.value;
    setVoteAmount(voteamount);
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
    setOwnerTitle(Number(val));
  }
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  }
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  }
  const handleChangeLastName1 = (event) => {
    setLastName1(event.target.value);
  }
  const handleChangeFirstName1 = (event) => {
    setFirstName1(event.target.value);
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
  const handleChangeBuildings = (val) => {
    setBuildings(val);
    setBuildingID(buildingList[val].buildingID);
  };
  const handleClickAddLots = (event) => {
    lotsList.push(buildingVote);
    setLotsList(lotsList);
    setStateLots(!stateLots);
  }
  const handleClickRemoveLot = (num) => {
    setCount(count - 1);
    delete lotsList[num];
    lotsList.splice(num, 1);

    let voteamount = [...voteAmount];
    delete voteamount[num];
    voteamount.splice(num, 1);
    setVoteAmount(voteamount);

    let apartment = [...apartNumber];
    delete apartment[num];
    apartment.splice(num, 1);
    setApartNumber(apartment);

    setLotsList(lotsList);
    setStateLots(!stateLots);
    console.log('lotsList:', lotsList)
  }
  useEffect(() => {
    if (accessOwners !== 'denied') {
      getCompanies();
    }
  }, [accessOwners]);



  const getCompanies = () => {
    setVisibleIndicator(true);
    ManagerService.getCompanyListByUser()
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              data.companylist.map((item) => (
                setCompanyID(item.companyID)
              )
              );
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error('Cant connect to the server!');
          setVisibleIndicator(false);
        }
      );
  }
  useEffect(() => {
    getBuildings();
    console.log('companyID:', companyID);
  }, [companyID])
  const getBuildings = () => {
    let params = new URLSearchParams(window.location.search);
    const requestData = {
      'companyID': companyID
    }
    setVisibleIndicator(true);
    ManagerService.getBuildingListByCompany(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              data.buildinglist.map((item) => (
                building.push(item.name)
              )
              );
              setBuilding(building);
              setBuildingID(params.get('buildingID'));
              for (let i = 0; i < data.buildinglist.length; i++)
                if (data.buildinglist[i].buildingID == params.get('buildingID')) {
                  setBuildings(i);
                }
              setBuildingList(...data.buildinglist);

              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  useEffect(() => {
    getBuilding();
    console.log('buildingList:', buildingList);
  }, [buildingList]);
  const getBuilding = () => {
    let params = new URLSearchParams(window.location.search);
    setVisibleIndicator(true);
    ManagerService.getBuilding(params.get('buildingID'))
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              buildingVote.splice(0, buildingVote.length)
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              const vote_list = data.vote_list;
              vote_list.map((vote, i) =>
                buildingVote.push(vote)
              )
              setBuildingVote(buildingVote);
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  };
  useEffect(() => {
    getOwner()
    console.log('buildingVote:', buildingVote);
  }, [buildingVote])
  const getVoteList = () => {
    for (let i = 0; i < apartNumber.length; i++) {
      let votes = [];
      for (let j = 0; j < voteAmount[i].length; j++) {
        const vote = {
          'voteID': buildingVote[j].voteID,
          'vote_amount': voteAmount[i][j]
        }
        votes.push(vote);
      }
      const voteList = {
        'apartment_number': apartNumber[i],
        'vote': votes
      }
      voteLists.push(voteList);
    }
  }
  const updateOwner = () => {
    let params = new URLSearchParams(window.location.search);
    getVoteList();
    let formdata = new FormData();
    formdata.set('type', titleList[ownerTitle]);
    formdata.set('email', email);
    formdata.set('owner_role', isSubAccount ? 'subaccount' : isMemberCouncil ? 'member' : 'owner');
    formdata.set('buildingID', buildingID);
    formdata.set('firstname', firstname);
    formdata.set('lastname', lastname);
    formdata.set('firstname_1', firstname1);
    formdata.set('lastname_1', lastname1);
    formdata.set('owner_company_name', companyName);
    formdata.set('address', address);
    formdata.set('phone', phonenumber);
    formdata.set('photo_url', avatar === null ? '' : avatar)
    formdata.set('id_card_front', idcards[0] === null ? '' : idcards[0])
    formdata.set('id_card_back', idcards[1] === null ? '' : idcards[1])
    formdata.set('vote_value_list', JSON.stringify(voteLists));
    setVisibleIndicator(true);
    ManagerService.updateOwner(params.get('id'), formdata)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Updated Successfully!");
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const getOwner = () => {
    let params = new URLSearchParams(window.location.search);
    var data = {};
    data['ID'] = params.get('id');
    data['buildingID'] = params.get('buildingID');
    setVisibleIndicator(true);
    ManagerService.getOwner(params.get('id'), data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              const ownerInfo = data.owner.ownerInfo;
              const apartmentInfo = data.owner.apartment_info;
              const amountInfo = data.owner.amount_info;
              setOwnerTitle(titleList.indexOf(ownerInfo.usertype));
              if (ownerInfo.usertype === 'Company') {
                setCompanyName(ownerInfo.owner_company_name);
              } else if (ownerInfo.usertype === 'Mr & Mrs' || ownerInfo.usertype === 'PACS') {
                setFirstName(ownerInfo.firstname);
                setLastName(ownerInfo.lastname);
                setFirstName1(ownerInfo.firstname_1);
                setLastName1(ownerInfo.lastname_1);
              }
              else {
                setFirstName(ownerInfo.firstname);
                setLastName(ownerInfo.lastname);
              }
              setEmail(ownerInfo.email);
              setPhoneNumber(ownerInfo.phone);
              setAddress(ownerInfo.address);
              if (ownerInfo.owner_role === 'subaccount') {
                setIsSubAccount(true);
                setIsMemberCouncil(false);
              } else if (ownerInfo.owner_role === 'member') {
                setIsMemberCouncil(true);
                setIsSubAccount(false);
              } else if (ownerInfo.owner_role === 'owner') {
                setIsMemberCouncil(false);
                setIsSubAccount(false);
              }
              setAvatarUrl(ownerInfo.photo_url);
              if (ownerInfo.status === 'active') setSuspendState('Suspendre le compte');
              else if (ownerInfo.status === 'inactive') setSuspendState('Restaurer le compte');
              let urls = [];
              let apartment = [...apartNumber];
              let apartmentId = [];
              if (ownerInfo.identity_card_front.length !== 0)
                urls.push(ownerInfo.identity_card_front);
              if (ownerInfo.identity_card_back.length !== 0)
                urls.push(ownerInfo.identity_card_back);
              setIdcardUrls(urls);
              for (let i = 0; i < apartmentInfo.length; i++) {
                apartment.push(apartmentInfo[i].apartment_number);
                apartmentId.push(apartmentInfo[i].apartmentID);
              }
              lotsList.splice(0, lotsList.length);
              for (let i = 0; i < apartmentId.length; i++) {
                for (let j = 0; j < amountInfo.length; j++)
                  if (amountInfo[j].apartmentID === apartmentId[i]) {
                    voteAmount[i].push(amountInfo[j].amount);
                  }
                setVoteAmount(voteAmount);
                setApartNumber(apartment);
                lotsList.push(buildingVote);
              }
              console.log('lotslist:', lotsList)
              setLotsList(lotsList);
              setCount(lotsList.length)
              setStateLots(!stateLots);
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const handleClickLoginAsOwner = () => {
    window.open('http://localhost:3000');
  }
  const handleClickResetPassword = () => {
    var data = {};
    data['email'] = email;
    setVisibleIndicator(true);
    ManagerService.forgotPassword(data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              ToastsStore.success(response.data.message);
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          setVisibleIndicator(false);
          ToastsStore.error("Can't connect to the Server!");
        }
      );
  }
  const handleClickSuspendRestore = () => {
    let data = {
      'status': suspendState === 'Restaurer le compte' ? 'active' : 'inactive'
    };
    let params = new URLSearchParams(window.location.search);
    setVisibleIndicator(true);
    ManagerService.setSuspendOwner(params.get('id'), data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if (suspendState === 'Restaurer le compte')
                setSuspendState('Suspendre le compte');
              else if (suspendState === 'Suspendre le compte')
                setSuspendState('Restaurer le compte');
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClickDeleteOwner = () => {
    setOpenDelete(true);
  }
  const handleDelete = () => {
    let params = new URLSearchParams(window.location.search);
    handleCloseDelete();
    setDeleteId(-1);
    setVisibleIndicator(true);
    let data = {
      'status': 'trash'
    }
    ManagerService.deleteOwner(params.get('id'), data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              history.goBack();
              break;
            case 401:
              authService.logout();
              history.push('/login');
              window.location.reload();
              break;
            default:
              ToastsStore.error(response.data.message);
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
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
                <b>{firstname + ' ' + lastname}</b>
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
                    badgeContent={
                      <div>
                        <input className={classes.input} accept="image/*" type="file" id="img_front" onChange={handleLoadFront} />
                        <label htmlFor="img_front">
                          <EditOutlinedIcon className={classes.editAvatar} />
                        </label>
                      </div>}
                  >
                    <Avatar className={classes.size} alt={firstname + ' ' + lastname} src={avatarurl} />
                  </Badge>
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={"Se connecter en tant que"}
                    color={"1"}
                    onClick={handleClickLoginAsOwner}
                    disabled={(accessOwners === 'see' ? true : false)}
                  />
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={"Réinitialiser le mot de passe"}
                    bgColor={"#00C9FF"}
                    onClick={handleClickResetPassword}
                    disabled={(accessOwners === 'see' ? true : false)}
                  />
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={suspendState}
                    bgColor={"#00C9FF"}
                    onClick={handleClickSuspendRestore}
                    disabled={(accessOwners === 'see' ? true : false)}
                  />
                </Grid>
                <Grid item container direction="row-reverse">
                  <MyButton
                    name={"Supprimer le compte"}
                    bgColor={"#00C9FF"}
                    onClick={handleClickDeleteOwner}
                    disabled={(accessOwners === 'see' ? true : false)}
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
                      disabled={(accessOwners === 'see' ? true : false)}
                    />
                    {errorsOwnerTitle.length > 0 &&
                      <span className={classes.error}>{errorsOwnerTitle}</span>}
                  </Grid>
                </Grid>
                {
                  ownerTitle === 4 ?
                    <Grid item container alignItems="center" spacing={1}>
                      <Grid item><p className={classes.itemTitle}>Cabinet Nom</p></Grid>
                      <Grid xs item container direction="column">
                        <TextField
                          className={classes.text}
                          variant="outlined"
                          value={companyName}
                          onChange={handleChangeCompanyName}
                          disabled={(accessOwners === 'see' ? true : false)}
                          fullWidth
                        />
                        {errorsCompanyName.length > 0 &&
                          <span className={classes.error}>{errorsCompanyName}</span>}
                      </Grid>
                    </Grid>
                    : ownerTitle === 3 || ownerTitle === 6 ?
                      <Grid item container direction="column" spacing={5}>
                        <Grid item container alignItems="center" spacing={1}>
                          <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                          <Grid xs item container direction="column">
                            <TextField
                              className={classes.text}
                              variant="outlined"
                              value={lastname}
                              onChange={handleChangeLastName}
                              disabled={(accessOwners === 'see' ? true : false)}
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
                              disabled={(accessOwners === 'see' ? true : false)}
                              fullWidth
                            />
                            {errorsFirstname.length > 0 &&
                              <span className={classes.error}>{errorsFirstname}</span>}
                          </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={1}>
                          <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                          <Grid xs item container direction="column">
                            <TextField
                              className={classes.text}
                              variant="outlined"
                              value={lastname1}
                              onChange={handleChangeLastName1}
                              disabled={(accessOwners === 'see' ? true : false)}
                              fullWidth
                            />
                            {errorsLastname1.length > 0 &&
                              <span className={classes.error}>{errorsLastname1}</span>}
                          </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={1}>
                          <Grid item><p className={classes.itemTitle}>Prénom</p></Grid>
                          <Grid xs item container direction="column">
                            <TextField
                              className={classes.text}
                              variant="outlined"
                              value={firstname1}
                              onChange={handleChangeFirstName1}
                              disabled={(accessOwners === 'see' ? true : false)}
                              fullWidth
                            />
                            {errorsFirstname1.length > 0 &&
                              <span className={classes.error}>{errorsFirstname1}</span>}
                          </Grid>
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
                              disabled={(accessOwners === 'see' ? true : false)}
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
                              disabled={(accessOwners === 'see' ? true : false)}
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
                      disabled={(accessOwners === 'see' ? true : false)}
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
                      disabled={(accessOwners === 'see' ? true : false)}
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
                  rows={10}
                  disabled={(accessOwners === 'see' ? true : false)}
                  fullWidth
                />
                {errorsAddress.length > 0 &&
                  <span className={classes.error}>{errorsAddress}</span>}
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
                  disabled={true}
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
                      disabled={(accessOwners === 'see' ? true : false)}
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
                      disabled={(accessOwners === 'see' ? true : false)}
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
                            <Grid key={i} item container alignItems="center" spacing={3}>
                              <Grid item>
                                <Grid item container direction="column" spacing={3}>
                                  <Grid item container alignItems="center" spacing={2}>
                                    <Grid item><p className={classes.itemTitle}>Lot</p></Grid>
                                    <Grid xs item container>
                                      <TextField
                                        className={classes.text}
                                        variant="outlined"
                                        value={apartNumber[i] || ""}
                                        onChange={(event) => handleChangeApartNumber(event, i)}
                                        style={{ width: 100 }}
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid item><p className={classes.itemTitle}>Clefs de répartition du lot</p></Grid>

                                  <Grid item container direction="column" spacing={2} >
                                    {
                                      lot.map((vote1, j) => {
                                        return (
                                          <Grid key={j} item container alignItems="center" spacing={2}>
                                            <Grid item><p className={classes.itemTitle}>{vote1.vote_branch_name}</p></Grid>
                                            <Grid item >
                                              <TextField
                                                className={classes.text}
                                                variant="outlined"
                                                value={voteAmount[i][j] || ""}
                                                onChange={(event) => handleChangeVoteAmount(event, i, j)}
                                                style={{ width: 100 }}

                                              />
                                            </Grid>
                                            <Grid item><p className={classes.itemTitle}>tantièmes</p></Grid>
                                          </Grid>
                                        )
                                      })
                                    }
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <RemoveCircleOutlineIcon
                                  className={classes.plus}
                                  onClick={() => handleClickRemoveLot(i)}
                                />
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
                <Grid item>
                  <MyButton
                    name={"Ajouter un lot"}
                    bgColor="grey"
                    onClick={handleClickAddLots}
                    disabled={(accessOwners === 'see' ? true : false)}
                  />
                </Grid>
                {errorsLotsList.length > 0 &&
                  <span className={classes.error}>{errorsLotsList}</span>}
              </Grid>
            </Grid>
            <Grid xs={12} item container direction="column" style={{ marginTop: 30 }}>
              <p className={classes.itemTitle}>Pièce d'identité</p>
              <Grid item container justify="flex-start">
                <IdCard
                  onClose={handleClickCloseIdcard}
                  idcardurls={idcardurls}
                  disabled={(accessOwners === 'see' ? true : false)}
                  state={state}
                  type="first"
                  badge="first"
                />

                <input className={classes.input} accept="image/*" type="file" id="img_idcard" onChange={handleLoadIdcard} disabled={(accessOwners === 'see' ? true : false)} />
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
            <MyButton
              name={"Sauvegarder"}
              color={"1"}
              onClick={handleClickSave}
              disabled={(accessOwners === 'see' ? true : false)}
            />
          </Grid>
        </div>
      </Grid>
      <DeleteConfirmDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        account={'owner'}
      />
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(OwnerEdit);
