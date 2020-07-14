import React, { useState, useEffect } from 'react';
import MyTable from '../../../components/MyTable';
import MyTableCard from '../../../components/MyTableCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../../components/MySelect';
import MyButton from 'components/MyButton';
import { Checkbox } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import authService from '../../../services/authService.js';
import { EditCompanyStyles as useStyles } from './useStyles';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddManager from './AddManager';
import AddBuilding from './AddBuilding';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const CompaniesEdit = (props) => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const { history } = props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
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
  const [managerCount, setamountCompany] = useState('');
  const [apartmentCount, setApartmentCount] = useState('');

  const [managerDataList, setManagerDataList] = useState([]);
  const [managerTotalpage, setManagerTotalPage] = useState(1);
  const [manager_row_count, setManagerRowCount] = useState(20);
  const [manager_sort_column, setManagerSortColumn] = useState(-1);
  const [manager_sort_method, setManagerSortMethod] = useState('asc');
  const [manager_page_num, setManagerPageNum] = useState(1);
  const managerSelectList = [20, 50, 100, 200, -1];
  const [managerDeleteId, setManagerDeleteId] = useState(-1);
  const managerCellList = [
    { key: 'lastname', field: 'Nom' },
    { key: 'firstname', field: 'Prénom' },
    { key: 'email', field: 'Email' },
    { key: 'phone', field: 'Téléphone' },
  ];

  const managerColumns = [];
  for (let i = 0; i < 4; i++)
    managerColumns[i] = 'asc';

  const [buildingDataList, setBuildingDataList] = useState([]);
  const [buildingTotalpage, setBuildingTotalPage] = useState(1);
  const [building_row_count, setBuildingRowCount] = useState(20);
  const [building_sort_column, setBuildingSortColumn] = useState(-1);
  const [building_sort_method, setBuildingSortMethod] = useState('asc');
  const [building_page_num, setBuildingPageNum] = useState(1);
  const [buildingDeleteId, setBuildingDeleteId] = useState(-1);
  const buildingSelectList = [20, 50, 100, 200, -1];

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
  const contactList = [20, 50, 100, 200, -1];
  useEffect(() => {
    console.log('b');
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
      { id: 2, name: 'Milk', price: 1.9, stock: 32 },
      { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
      { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
      { id: 5, name: 'Butter', price: 0.9, stock: 99 },
    ])
  };
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

  const handleChangeContact = (value) => {
    setContact(value);
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
    console.log(URL.createObjectURL(event.target.files[0]));
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
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

  };
  const handleAddBuilding = () => {

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
      //  createBuilding();
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
    history.push('/admin/buildings/edit/' + id);
  }
  const handleChangeManagerSelect = (value) => {
    setManagerRowCount(managerSelectList[value]);
  }
  const handleClickManagerDelete = (id) => {
    // setOpenDelete(true);
    setManagerDeleteId(id);
  };

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
  const handleClickBuildingDelete = (id) => {
    // setOpenDelete(true);
    setBuildingDeleteId(id);
  };

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
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.headerTitle}>
                <b>Cabinet Loiselet & Daigremont</b>
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
                      <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront} />
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
                  {
                    managerCount === '' ? null :
                      <p className={classes.itemTitle}><b>Nombre de gestionnaires : </b>{managerCount}</p>
                  }
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
                  {
                    apartmentCount === '' ? null :
                      <p className={classes.itemTitle}><b>Nombre de lots : </b>{apartmentCount}</p>
                  }
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
            <Grid item container alignItems="center" spacing={1}>
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
            </Grid>
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
              <Grid item container><p className={classes.itemTitle}>TVA Intracommunautaire</p></Grid>
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
      >
        <Grid item container className={classes.padding} justify="space-between">
          <Grid item container direction="row-reverse"><CloseIcon onClick={handleCloseAddManager} className={classes.close} /></Grid>
          <Grid item><p className={classes.sepaTitle}><b>Nouveau Gestionnaire</b></p></Grid>
        </Grid>
        <AddManager onCancel={handleCloseAddManager} onAdd={handleAddManager} />
      </Dialog>
      <Dialog
        open={openAddBuilding}
        onClose={handleCloseAddBuilding}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid item container className={classes.padding} >
          <Grid xs={12} item container direction="row-reverse"><CloseIcon onClick={handleCloseAddBuilding} className={classes.close} /></Grid>
          <Grid xs={12} item ><p className={classes.sepaTitle}><b>Nouvel immmeuble</b></p></Grid>
        </Grid>
        <AddBuilding onCancel={handleCloseAddBuilding} onAdd={handleAddBuilding} />
      </Dialog>
    </div>
  );
};

export default CompaniesEdit;
