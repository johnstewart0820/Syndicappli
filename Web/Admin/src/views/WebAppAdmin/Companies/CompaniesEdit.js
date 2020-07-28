import React, { useState, useEffect } from 'react';
import MyTable from '../../../components/MyTable';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import MyTableCard from '../../../components/MyTableCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MyButton from 'components/MyButton';
import { Checkbox } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { withRouter } from 'react-router-dom';
import { EditCompanyStyles as useStyles } from './useStyles';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddManager from './AddManager';
import AddBuilding from './AddBuilding';
import AdminService from '../../../services/api.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import authService from '../../../services/authService.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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
const CompaniesEdit = (props) => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const { history } = props;
  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  const accessCompanies = authService.getAccess('role_companies');
  const accessManagers = authService.getAccess('role_managers');
  const accessBuildings = authService.getAccess('role_buildings');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);

  const [openAddManager, setOpenAddManager] = React.useState(false);
  const [openAddBuilding, setOpenAddBuilding] = React.useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [siret, setSiret] = useState('');
  const [vat, setVat] = useState('');
  const [contact, setContact] = useState(0);
  const [accountname, setAccountName] = useState('');
  const [accountaddress, setAccountAddress] = useState('');
  const [IBAN, setIBAN] = useState('');
  const [assemblies360, setAssemblies360] = useState(false);
  const [assembliesWebcam, setAssembliesWebcam] = useState(false);
  const [assembliesAudio, setAssembliesAudio] = useState(false);
  const [statusActive, setStatusActive] = useState(false);
  const [statusInActive, setStatusInActive] = useState(false);

  const [avatarurl, setAvatarUrl] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [managerCount, setManagerCount] = useState(0);
  const [apartmentCount, setApartmentCount] = useState(0);

  const [managerDataList, setManagerDataList] = useState([]);
  const [managerTotalpage, setManagerTotalPage] = useState(1);
  const [manager_row_count, setManagerRowCount] = useState(20);
  const [manager_sort_column, setManagerSortColumn] = useState(-1);
  const [manager_sort_method, setManagerSortMethod] = useState('asc');
  const [manager_page_num, setManagerPageNum] = useState(1);
  const managerSelectList = [20, 50, 100, 200, -1];
  const [managerDeleteId, setManagerDeleteId] = useState(-1);
  const [managerOpenDelete, setManagerOpenDelete] = useState(false);
  const managerCellList = [
    { key: 'lastname', field: 'Nom' },
    { key: 'firstname', field: 'Prénom' },
    { key: 'email', field: 'Email' },
    { key: 'phone', field: 'Téléphone' },
  ];

  const managerColumns = [];
  for (let i = 0; i < 4; i++)
    managerColumns[i] = 'asc';
  const [building_refresh, setBuildingRefresh] = React.useState(false);
  const [manager_refresh, setManagerRefresh] = React.useState(false);
  const [buildingDataList, setBuildingDataList] = useState([]);
  const [buildingTotalpage, setBuildingTotalPage] = useState(1);
  const [building_row_count, setBuildingRowCount] = useState(20);
  const [building_sort_column, setBuildingSortColumn] = useState(-1);
  const [building_sort_method, setBuildingSortMethod] = useState('asc');
  const [building_page_num, setBuildingPageNum] = useState(1);
  const [buildingDeleteId, setBuildingDeleteId] = useState(-1);
  const [buildingOpenDelete, setBuildingOpenDelete] = useState(false);
  const buildingSelectList = [20, 50, 100, 200, -1];
  const [isBuildingDisableDelete, setIsBuildingDisableDelete] = useState(true);
  const [isManagerDisableDelete, setIsManagerDisableDelete] = useState(true);

  const [errorsName, setErrorsName] = React.useState('');
  const [errorsAddress, setErrorsAddress] = React.useState('');
  const [errorsEmail, setErrorsEmail] = React.useState('');
  const [errorsPhone, setErrorsPhone] = React.useState('');
  const [errorsSiret, setErrorsSiret] = React.useState('');
  const [errorsStatus, setErrorsStatus] = React.useState('');

  const buildingCellList = [
    { key: 'name', field: 'Nom' },
    { key: 'address', field: 'Adresse' },
  ];

  const buildingColumns = [];
  for (let i = 0; i < 2; i++)
    buildingColumns[i] = 'asc';

  const [cardDataList, setCardDataList] = useState([]);

  useEffect(() => {
    if (accessCompanies !== 'denied' && accessBuildings !== 'denied')
      getBuildings();
  }, [building_page_num, building_row_count, building_sort_method, building_sort_column, building_refresh]);
  useEffect(() => {
    if (accessCompanies !== 'denied' && accessManagers !== 'denied')
      getManagers();
  }, [manager_page_num, manager_row_count, manager_sort_method, manager_sort_column, manager_refresh]);
  const handleClick = () => {
    history.goBack();
  };

  const handleCloseAddManager = () => {
    setOpenAddManager(false);
  };
  const handleCloseAddBuilding = () => {
    setOpenAddBuilding(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
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
  const handleClickAddManager = () => {
    setOpenAddManager(true);
  }
  const handleClickAddBuilding = () => {
    setOpenAddBuilding(true);
  }
  const handleClickAddCard = () => {

  }
  const handleAddManager = () => {
    ToastsStore.success("Added New Manager successfully!");
    setManagerRefresh(!manager_refresh);
  };
  const handleAddBuilding = () => {
    ToastsStore.success("Added New Building successfully!");
    setBuildingRefresh(!building_refresh);
  };
  const handleClickSave = () => {
    let cnt = 0;
    if (name.length === 0) { setErrorsName('please enter your new company name'); cnt++; }
    else setErrorsName('');
    if (address.length === 0) { setErrorsAddress('please enter your address'); cnt++; }
    else setErrorsAddress('');
    if (email.length === 0) { setErrorsEmail('please enter your email'); cnt++; }
    else setErrorsEmail('');
    if (phone.length === 0) { setErrorsPhone('please enter your phone number'); cnt++; }
    else setErrorsPhone('');
    if (siret.length === 0) { setErrorsSiret('please enter your company SIRET'); cnt++; }
    else setErrorsSiret('');
    if (statusActive === false && statusInActive === false) { setErrorsStatus('please select company status'); cnt++; }
    else setErrorsStatus('');
    if (cnt === 0) {
      updateCompany();
    }
  };
  const handleChangeAssemblies360 = (event) => {
    setAssemblies360(event.target.checked);
  }
  const handleChangeAssembliesWebcam = (event) => {
    setAssembliesWebcam(event.target.checked);
  }
  const handleChangeAssembliesAudio = (event) => {
    setAssembliesAudio(event.target.checked);
  }
  const handleChangeStatusActive = (event) => {
    setStatusActive(event.target.checked);
    if (statusActive)
      setStatusInActive(!statusActive);
    else
      setStatusInActive(statusActive);
  }
  const handleChangeStatusInActive = (event) => {
    setStatusInActive(event.target.checked);
    if (statusInActive)
      setStatusActive(!statusInActive);
    else
      setStatusActive(statusInActive);
  }
  const handleChangeManagerPagination = (value) => {
    setManagerPageNum(value);
  }
  const handleManagerSort = (index, direct) => {
    setManagerSortColumn(index);
    setManagerSortMethod(direct);
  }
  const handleClickManagerEdit = (id) => {
    console.log(id);
    history.push('/admin/companies/edit/' + id);
  }
  const handleChangeManagerSelect = (value) => {
    setManagerRowCount(managerSelectList[value]);
  }
  const handleChangeBuildingPagination = (value) => {
    setBuildingPageNum(value);
  }
  const handleBuildingSort = (index, direct) => {
    setBuildingSortColumn(index);
    setBuildingSortMethod(direct);
  }
  const handleClickBuildingEdit = (id) => {
    console.log(id);
    history.push('/admin/companies/edit/' + id);
  }
  const handleChangeBuildingSelect = (value) => {
    setBuildingRowCount(buildingSelectList[value]);
  }

  useEffect(() => {
    console.log('b');
    getCardDataList();
  }, []);
  const getCardDataList = () => {
    setCardDataList([
      { ID: 1, card_digits: 'MasterCard-6914', card_name: 'MonSyndic', expiry_date: 'Exp. 12/2021' },
      { ID: 2, card_digits: 'MasterCard-6914', card_name: 'MonSyndic', expiry_date: 'Exp. 12/2021' },
      { ID: 3, card_digits: 'MasterCard-6914', card_name: 'MonSyndic', expiry_date: 'Exp. 12/2021' },
    ])
  };
  const cardCellList = [{ key: 'card_digits', field: '' }, { key: 'card_name', field: '' }, { key: 'expiry_date', field: '' }]
  useEffect(() => {
    if (accessCompanies === 'denied') {
      // setOpenDialog(true);
    }
    if (accessCompanies !== 'denied') {
      setVisibleIndicator(true);
      AdminService.getCompany(props.match.params.id)
        .then(
          response => {
            setVisibleIndicator(false);
            switch (response.data.code) {
              case 200:
                const data = response.data.data.company;
                localStorage.setItem("token", JSON.stringify(response.data.data.token));
                setName(data.name);
                setAddress(data.address);
                setEmail(data.email);
                setPhone(data.phone);
                setSiret(data.SIRET);
                setVat(data.VAT);
                setAccountName(data.account_holdername);
                setAccountAddress(data.account_address);
                setIBAN(data.account_IBAN);
                setAvatarUrl(data.logo_url);
                setAssemblies360(data.access_360cam === 'true' ? true : false);
                setAssembliesWebcam(data.access_webcam === 'true' ? true : false);
                setAssembliesAudio(data.access_audio === 'true' ? true : false);
                setManagerCount(data.manager_count ? data.manager_count : 0);
                setApartmentCount(data.apartment_count ? data.apartment_count : 0);
                if (data.status === 'active') {
                  setStatusActive(true);
                  setStatusInActive(false);
                }
                else if (data.status === 'inactive') {
                  setStatusActive(false);
                  setStatusInActive(true);
                }
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
  }, [accessCompanies]);
  const updateCompany = () => {
    let formdata = new FormData();
    formdata.set('name', name);
    formdata.set('address', address);
    formdata.set('email', email);
    formdata.set('phone', phone);
    formdata.set('SIRET', siret);
    formdata.set('address', address);
    formdata.set('VAT', vat);
    formdata.set('account_holdername', accountname);
    formdata.set('account_address', accountaddress);
    formdata.set('account_IBAN', IBAN);
    formdata.set('access_360cam', assemblies360);
    formdata.set('access_webcam', assembliesWebcam);
    formdata.set('access_audio', assembliesAudio);
    formdata.set('status', statusActive === true ? 'active' : 'inactive');
    formdata.set('logo', avatar === null ? '' : avatar);
    setVisibleIndicator(true);
    AdminService.updateCompany(props.match.params.id, formdata)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
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
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const getManagers = () => {
    const requestData = {
      'search_key': '',
      'page_num': manager_page_num - 1,
      'row_count': manager_row_count,
      'sort_column': manager_sort_column,
      'sort_method': manager_sort_method,
      'buildingID': -1,
      'companyID': props.match.params.id,
      'status': 'active'
    }
    setVisibleIndicator(true);
    AdminService.getManagerList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if (data.totalpage)
                setManagerTotalPage(data.totalpage);
              else
                setManagerTotalPage(1);
              setManagerDataList(data.managerlist);
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
  const getBuildings = () => {
    const requestData = {
      'search_key': '',
      'page_num': building_page_num - 1,
      'row_count': building_row_count,
      'sort_column': building_sort_column,
      'sort_method': building_sort_method,
      'companyID': props.match.params.id,
      'status': 'active'
    }
    setVisibleIndicator(true);
    AdminService.getBuildingList(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              if (!data.totalpage)
                setBuildingTotalPage(1);
              else
                setBuildingTotalPage(data.totalpage);
              setBuildingDataList(data.buildinglist);
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
  const handleClickBuildingDelete = (id) => {
    setBuildingOpenDelete(true);
    setBuildingDeleteId(id);
  };
  const handleBuildingCloseDelete = () => {
    setBuildingOpenDelete(false);
  };
  const handleBuildingDelete = () => {
    handleBuildingCloseDelete();
    setBuildingDeleteId(-1);
    setVisibleIndicator(true);
    let data = {
      'status': 'trash'
    }
    AdminService.deleteBuilding(buildingDeleteId, data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              getBuildings();
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
  const handleClickManagerDelete = (id) => {
    setManagerOpenDelete(true);
    setManagerDeleteId(id);
  };
  const handleManagerCloseDelete = () => {
    setManagerOpenDelete(false);
  };
  const handleManagerDelete = () => {
    handleManagerCloseDelete();
    setManagerDeleteId(-1);
    setVisibleIndicator(true);
    let data = {
      'status': 'trash'
    }
    AdminService.deleteManager(managerDeleteId, data)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              ToastsStore.success("Deleted successfully!");
              getManagers();
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
  const inputBuildingTextChange = (event) => {
    console.log(event.target.value);
    if (event.target.value === "delete") {
      setIsBuildingDisableDelete(false);
    } else {
      setIsBuildingDisableDelete(true);
    }
  }
  const inputManagerTextChange = (event) => {
    console.log(event.target.value);
    if (event.target.value === "delete") {
      setIsManagerDisableDelete(false);
    } else {
      setIsManagerDisableDelete(true);
    }
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
                <b>{name}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
        <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la liste des Cabinets</p>
      </div>
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid container direction="column" spacing={5}>
            <Grid item container spacing={2} direction="row" justify="space-between">
              <Grid item container direction="column" justify="space-between" xs={5}>
                <Grid item container><p className={classes.headerTitle}><b>Informations</b></p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
                  <Grid xs item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={name}
                      onChange={handleChangeName}
                      fullWidth
                    />
                    {errorsName.length > 0 &&
                      <span className={classes.error}>{errorsName}</span>}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={5} direction="row-reverse">
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
                    </div>
                  }
                >
                  <Avatar className={classes.size} alt="Travis Howard" src={avatarurl} />
                </Badge>
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2} justify="space-between">
              <Grid item container direction="row" justify="space-between">
                <Grid item><p className={classes.itemTitle}>Coordonnees</p></Grid>
                <Grid item>
                  <p className={classes.itemTitle}><b>Nombre de gestionnaires : </b>{managerCount}</p>
                </Grid>
              </Grid>
              <Grid item container direction="row" justify="space-between">
                <Grid xs={5} item container alignItems="stretch" direction="column">
                  <TextField
                    className={classes.text}
                    rows={3} multiline
                    variant="outlined"
                    value={address}
                    onChange={handleChangeAddress}
                    fullWidth
                  />
                  {errorsAddress.length > 0 &&
                    <span className={classes.error}>{errorsAddress}</span>}
                </Grid>
                <Grid xs={5} item container direction="row-reverse">
                  <p className={classes.itemTitle}><b>Nombre de lots : </b>{apartmentCount}</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Email</p></Grid>
              <Grid xs={5} item container direction="column">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={email}
                  onChange={handleChangeEmail}
                />
                {errorsEmail.length > 0 &&
                  <span className={classes.error}>{errorsEmail}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Telephone</p></Grid>
              <Grid xs={5} item container alignItems="stretch" direction="column">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={phone}
                  onChange={handleChangePhone}
                />
                {errorsPhone.length > 0 &&
                  <span className={classes.error}>{errorsPhone}</span>}
              </Grid>
            </Grid>
            {/* <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>Contact</p></Grid>
              <Grid xs item container alignItems="stretch">
                <MySelect
                  color="gray"
                  width="160px"
                  data={contactList}
                  value={contact}
                  onChangeSelect={handleChangeContact}
                />
              </Grid>
            </Grid> */}
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.itemTitle}>SIRET</p></Grid>
              <Grid xs={5} item container alignItems="stretch" direction="column">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={siret}
                  onChange={handleChangeSiret}
                  fullWidth
                />
                {errorsSiret.length > 0 &&
                  <span className={classes.error}>{errorsSiret}</span>}
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item container><p className={classes.itemTitle}>VAT Intracommunautaire</p></Grid>
              <Grid item xs={5} item container alignItems="stretch">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={vat}
                  onChange={handleChangeVat}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item ><p className={classes.itemTitle}>Assemblées Générales en 360</p></Grid>
                  <Grid xs item container>
                    <Checkbox
                      checked={assemblies360}
                      onChange={handleChangeAssemblies360}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item><p className={classes.itemTitle}>Assemblées générales en Webcam</p></Grid>
                  <Grid xs item container>
                    <Checkbox
                      checked={assembliesWebcam}
                      onChange={handleChangeAssembliesWebcam}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item><p className={classes.itemTitle}>Assemblées Générales en Audio</p></Grid>
                  <Grid xs item container>
                    <Checkbox
                      checked={assembliesAudio}
                      onChange={handleChangeAssembliesAudio}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Grid item><p className={classes.itemTitle}>Statut Du Cabinet</p></Grid>
              <Grid item container>
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item ><p className={classes.itemTitle}>actif</p></Grid>
                    <Grid xs item container>
                      <Checkbox
                        checked={statusActive}
                        onChange={handleChangeStatusActive}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item><p className={classes.itemTitle}>inactif</p></Grid>
                    <Grid xs item container>
                      <Checkbox
                        checked={statusInActive}
                        onChange={handleChangeStatusInActive}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {errorsStatus.length > 0 &&
                <span className={classes.error}>{errorsStatus}</span>}
            </Grid>
            <Grid item container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
              <MyButton name={"Sauvegarder"} color={"1"} onClick={handleClickSave} />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid item container justify="flex-start" spacing={2} className={classes.item}>
            <Grid item>
              <p className={classes.headerTitle}><b>Gestionnaires</b></p>
            </Grid>
          </Grid>
          <MyTable
            onChangeSelect={handleChangeManagerSelect}
            onChangePage={handleChangeManagerPagination}
            onSelectSort={handleManagerSort}
            page={manager_page_num}
            columns={managerColumns}
            products={managerDataList}
            totalpage={managerTotalpage}
            cells={managerCellList}
            onClickEdit={handleClickManagerEdit}
            onClickDelete={handleClickManagerDelete}
            leftBtn="Ajouter un  gestionnaire"
            onClick={handleClickAddManager}
            access={accessManagers}
          />
        </div>
        <div>
          <Grid item container justify="flex-start" spacing={2} className={classes.item}>
            <Grid item>
              <p className={classes.headerTitle}><b>Immeubles</b></p>
            </Grid>
          </Grid>
          <MyTable
            onChangeSelect={handleChangeBuildingSelect}
            onChangePage={handleChangeBuildingPagination}
            onSelectSort={handleBuildingSort}
            page={building_page_num}
            columns={buildingColumns}
            products={buildingDataList}
            totalpage={buildingTotalpage}
            cells={buildingCellList}
            onClickEdit={handleClickBuildingEdit}
            onClickDelete={handleClickBuildingDelete}
            leftBtn="Ajouter un  immeuble"
            onClick={handleClickAddBuilding}
            access={accessBuildings}
          />
        </div>
        <Grid item container>
          <Grid item container justify="flex-start" direction="column" spacing={2} className={classes.item}>
            <Grid item>
              <p className={classes.headerTitle}><b>Moyens de paiement</b></p>
            </Grid>
            <Grid item>
              <p className={classes.sepaTitle}><b>carte bancaire</b></p>
            </Grid>
          </Grid>
          <Grid item sm={7}>
            <MyTableCard
              products={cardDataList}
              cells={cardCellList}
              leftBtn="Ajouter uno  carte"
              onClick={handleClickAddCard}
            />
          </Grid>
        </Grid>
        <div>
          <Grid xs={12} sm={6} item container justify="flex-start" direction="column" spacing={5} className={classes.item}>
            <Grid item>
              <p className={classes.sepaTitle}><b>Compte bancaire - Prelevement SEPA</b></p>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.permissionItemTitle}>Nom du titulaire du compte</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={accountname}
                      onChange={handleChangeAccountName}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="flex-start" spacing={2}>
                <Grid item><p className={classes.permissionItemTitle}>Adresse</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      rows={3}
                      multiline
                      variant="outlined"
                      value={accountaddress}
                      onChange={handleChangeAccountAddress}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.permissionItemTitle}>IBAN</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={IBAN}
                      onChange={handleChangeIBAN}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container justify="space-between" spacing={1}>
              <Grid item><MyButton name={"Editer le mandat"} color={"1"} /></Grid>
              <Grid item><MyButton name={"Supprimer"} bgColor="grey" />  </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Dialog
        open={openAddManager}
        onClose={handleCloseAddManager}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <Grid item container className={classes.padding} justify="space-between">
          <Grid item container direction="row-reverse"><CloseIcon onClick={handleCloseAddManager} className={classes.close} /></Grid>
          <Grid item><p className={classes.sepaTitle}><b>Nouveau Gestionnaire</b></p></Grid>
        </Grid>
        <AddManager onCancel={handleCloseAddManager} onAdd={handleAddManager} companyID={props.match.params.id} />
      </Dialog>
      <Dialog
        open={openAddBuilding}
        onClose={handleCloseAddBuilding}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <Grid item container className={classes.padding} >
          <Grid xs={12} item container direction="row-reverse"><CloseIcon onClick={handleCloseAddBuilding} className={classes.close} /></Grid>
          <Grid xs={12} item ><p className={classes.sepaTitle}><b>Nouvel immmeuble</b></p></Grid>
        </Grid>
        <AddBuilding onCancel={handleCloseAddBuilding} onAdd={handleAddBuilding} companyID={props.match.params.id} />
      </Dialog>
      <Dialog
        open={buildingOpenDelete}
        onClose={handleBuildingCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this building?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Type <b style={{ color: "red" }}>delete</b> into the text field
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            type="text"
            fullWidth
            variant="outlined"
            onChange={inputBuildingTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleBuildingCloseDelete} color="primary">
            Cancel
          </Button>
          <Button disabled={isBuildingDisableDelete} onClick={handleBuildingDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={managerOpenDelete}
        onClose={handleManagerCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this manager?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Type <b style={{ color: "red" }}>delete</b> into the text field
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            type="text"
            fullWidth
            variant="outlined"
            onChange={inputManagerTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleManagerCloseDelete} color="primary">
            Cancel
          </Button>
          <Button disabled={isManagerDisableDelete} onClick={handleManagerDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(CompaniesEdit);
