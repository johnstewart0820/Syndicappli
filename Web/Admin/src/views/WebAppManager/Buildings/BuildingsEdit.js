import React, { useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MyButton from 'components/MyButton';
import authService from '../../../services/authService.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import MyDialog from '../../../components/MyDialog.js';
import { EditBuildingStyles as useStyles } from './useStyles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { ManagerService as Service } from '../../../services/api.js';

const ManagerService = new Service();
const BuildingsEdit = (props) => {
  const { history } = props;
  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/admin/login");
  //   window.location.reload();
  // }
  const accessBuildings = authService.getAccess('role_buildings');
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [accountHolder, setAccountHolder] = React.useState('');
  const [accountAddress, setAccountAddress] = React.useState('');
  const [accountIban, setAccountIban] = React.useState('');
  const [addClefs, setAddClefs] = React.useState('');
  const [clefList, setClefList] = React.useState([]);
  const [companyID, setCompanyID] = React.useState(-1);

  const [errorsName, setErrorsName] = React.useState('');
  const [errorsAddress, setErrorsAddress] = React.useState('');
  const handleClick = () => {
    history.goBack();
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleChangeAccountHolder = (event) => {
    setAccountHolder(event.target.value);
  };
  const handleChangeAccountAddress = (event) => {
    setAccountAddress(event.target.value);
  };
  const handleChangeAccountIban = (event) => {
    setAccountIban(event.target.value);
  };
  const handleCloseDialog = (val) => {
    setOpenDialog(val);
  };
  const handleChangeAddClefs = (event) => {
    setAddClefs(event.target.value);
  };
  const handleClickAddClef = (event) => {
    if (addClefs !== '') {
      clefList.push({ "vote_branch_name": addClefs });
      setAddClefs('');
      setClefList(clefList);
    }
  };
  const handleClickRemoveClef = (num) => {
    delete clefList[num];
    clefList.splice(num, 1);
    setClefList(clefList);
    setState(!state);
  };
  const handleClickAdd = () => {
    let cnt = 0;
    if (name.length === 0) { setErrorsName('please enter your name'); cnt++; }
    else setErrorsName('');
    if (address.length === 0) { setErrorsAddress('please enter your first name'); cnt++; }
    else setErrorsAddress('');
    if (cnt === 0) {
      updateBuilding();
    }
  };
  const updateBuilding = () => {
    const requestData = {
      'name': name,
      'address': address,
      'vote_branches': clefList,
      'sepa_name': accountHolder,
      'sepa_address': accountAddress,
      'iban': accountIban
    }
    setVisibleIndicator(true);
    ManagerService.updateBuilding(props.match.params.id, requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          if (response.data.code !== 200) {
            ToastsStore.error(response.data.message);
          } else {
            const data = response.data.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            ToastsStore.success("Updated successfully!");
          }
        },
        error => {
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  };

  useEffect(() => {
    if (accessBuildings === 'denied') {
      setOpenDialog(true);
    }
    if (accessBuildings !== 'denied') {
      ManagerService.getBuilding(props.match.params.id)
        .then(
          response => {
            console.log(response.data);
            // setVisibleIndicator(false);  
            if (response.data.code !== 200) {
              console.log('error');
            } else {
              console.log('success');
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              const building = data.building[0];
              const vote_list = data.vote_list;
              vote_list.map((vote) =>
                clefList.push(vote)
              )
              setName(building.name);
              setAddress(building.address);
              setAccountHolder(building.account_holdername);
              setAccountAddress(building.account_address);
              setAccountIban(building.account_IBAN);
              setCompanyID(building.companyID);
              setClefList(clefList);

            }
          },
          error => {
            console.log('fail');
            // setVisibleIndicator(false);
          }
        );
    }
  }, [accessBuildings]);

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
                <b>Résidence les Pinsons</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
        <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la liste des Immeubles</p>
      </div>
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid item container direction="column" spacing={5} xs={12} sm={10} md={8}>
            <Grid item container><p className={classes.headerTitle}><b>Informations</b></p></Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.itemTitle}>Nom</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField
                  className={classes.text}
                  variant="outlined"
                  value={name}
                  fullWidth
                  onChange={handleChangeName}
                  disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')}
                />
                {errorsName.length > 0 &&
                  <span className={classes.error}>{errorsName}</span>}
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item><p className={classes.itemTitle}>Adresse</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <TextField
                  className={classes.text}
                  rows={3} multiline
                  variant="outlined"
                  value={address}
                  onChange={handleChangeAddress}
                  disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')}
                />
                {errorsAddress.length > 0 &&
                  <span className={classes.error}>{errorsAddress}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.itemTitle}>Clefs de répartition</p></Grid>
            </Grid>
            <Grid item container direction="column" state={state} >
              {
                clefList.map((clef, i) => (
                  <Grid container spacing={5}>

                    <Grid xs={6} item container justify="space-between" direction="row-reverse" alignItems="center">
                      <Grid item>
                        <RemoveCircleOutlineIcon
                          className={classes.plus}
                          onClick={() => handleClickRemoveClef(i)}
                        />
                      </Grid>
                      <Grid item xs={6} >
                        <p className={classes.itemTitle} style={{ display: 'flex' }}>{clef.vote_branch_name}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              }
            </Grid>
            <Grid xs={6} item container alignItems="center" justify="space-between" direction="row-reverse" alignItems="center">
              <Grid item>
                <AddCircleOutlineIcon
                  className={classes.plus}
                  onClick={handleClickAddClef}
                />
              </Grid>
              <Grid item >
                <TextField
                  variant="outlined"
                  value={addClefs}
                  onChange={handleChangeAddClefs}
                />
              </Grid>
            </Grid>
            <Grid item container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
              <MyButton name={"Sauvegarder"} color={"1"} onClick={handleClickAdd} disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')} />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid xs={12} sm={6} item container justify="flex-start" direction="column" spacing={5} className={classes.item}>
            <Grid item>
              <p className={classes.sepaTitle}><b>Compte bancaire - Prelevement SEPA</b></p>
            </Grid>
            <Grid item container direction="column" spacing={2} >
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>Nom du titulaire du compte</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={accountHolder}
                      onChange={handleChangeAccountHolder}
                      disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="flex-start" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>Adresse</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      rows={3}
                      multiline
                      variant="outlined"
                      value={accountAddress}
                      onChange={handleChangeAccountAddress}
                      disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item><p className={classes.sepaItemTitle}>IBAN</p></Grid>
                <Grid xs item container direction="row-reverse">
                  <Grid item container alignItems="stretch" direction="column">
                    <TextField
                      className={classes.text}
                      variant="outlined"
                      value={accountIban}
                      onChange={handleChangeAccountIban}
                      disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container justify="space-between" spacing={1}>
              <Grid item><MyButton name={"Editer le mandat"} color={"1"} disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')} /></Grid>
              <Grid item><MyButton name={"Supprimer"} bgColor="grey" disabled={(accessBuildings === 'see' ? 'disabled' : !'disabled')} />  </Grid>
            </Grid>
            <MyDialog open={openDialog} role={accessBuildings} onClose={handleCloseDialog} />
          </Grid>
        </div>
      </Grid>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(BuildingsEdit);
