import React, { useEffect } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../../components/MySelect.js';
import { AddBuildingStyles as useStyles } from './useStyles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { ManagerService as Service } from '../../../services/api.js';
import { withRouter } from 'react-router-dom';
import authService from 'services/authService';
import { Scrollbars } from 'react-custom-scrollbars';
const ManagerService = new Service();
const AddBuilding = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [state, setState] = React.useState(false);
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
  const [errorsVote, setErrorsVote] = React.useState('');
  const [count, setCount] = React.useState(0);
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
  const handleChangeAddClefs = (event) => {
    setAddClefs(event.target.value);
  };
  const handleClickAddClef = (event) => {
    if (addClefs !== '') {
      setCount(count + 1);
      clefList.push({ "name": addClefs });
      setAddClefs('');
      setClefList(clefList);
    }
  };
  const handleClickRemoveClef = (num) => {
    setCount(count - 1);
    delete clefList[num];
    clefList.splice(num, 1);
    setClefList(clefList);
    setState(!state);
  };

  const handleClose = () => {
    props.onCancel();
  };
  const handleClickAdd = () => {
    let cnt = 0;
    if (name.length === 0) { setErrorsName('please enter your name'); cnt++; }
    else setErrorsName('');
    if (address.length === 0) { setErrorsAddress('please enter your first name'); cnt++; }
    else setErrorsAddress('');
    if (count === 0) { setErrorsVote('please add a vote branch'); cnt++; }
    else setErrorsVote('');
    if (cnt === 0) {
      createBuilding();
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);
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
          ToastsStore.error("Can't connect to the server!");
          setVisibleIndicator(false);
        }
      );
  }
  const createBuilding = () => {
    const requestData = {
      'companyID': companyID,
      'name': name,
      'address': address,
      'vote_branches': clefList,
      'sepa_name': accountHolder,
      'sepa_address': accountAddress,
      'iban': accountIban
    }
    setVisibleIndicator(true);
    ManagerService.createBuilding(requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              props.onAdd();
              handleClose();
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
    <Scrollbars style={{ height: '100vh' }}>
      <div className={classes.root}>
        {
          visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
        }
        <div className={classes.paper} >
          <Grid container spacing={4}>
            <Grid item container spacing={2}>
              <Grid item><p className={classes.title}>Nom</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField
                  rows={3}
                  multiline
                  variant="outlined"
                  value={name}
                  fullWidth
                  onChange={handleChangeName}
                />
                {errorsName.length > 0 &&
                  <span className={classes.error}>{errorsName}</span>}
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item><p className={classes.title}>Adresse</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField
                  rows={3}
                  multiline
                  variant="outlined"
                  value={address}
                  fullWidth
                  onChange={handleChangeAddress}
                />
                {errorsAddress.length > 0 &&
                  <span className={classes.error}>{errorsAddress}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.title}>Clefs de répartition</p></Grid>
            </Grid>
            {
              state !== null ?
                <Grid item container direction="column">
                  {
                    clefList.map((clef, i) => (
                      <Grid container spacing={4}>

                        <Grid xs={6} item container justify="space-between" direction="row-reverse" alignItems="center">
                          <Grid item>
                            <RemoveCircleOutlineIcon
                              className={classes.plus}
                              onClick={() => handleClickRemoveClef(i)}
                            />
                          </Grid>
                          <Grid item >
                            <p className={classes.title}>{clef.name}</p>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Grid>
                : null
            }
            <Grid xs={6} item container direction="column">
              <Grid item container direction="row-reverse" alignItems="center" spacing={2}>
                <Grid item>
                  <AddCircleOutlineIcon
                    className={classes.plus}
                    onClick={handleClickAddClef}
                  />
                </Grid>
                <Grid xs item >
                  <TextField
                    variant="outlined"
                    value={addClefs}
                    onChange={handleChangeAddClefs}
                  />
                </Grid>
              </Grid>
              {errorsVote.length > 0 &&
                <span className={classes.error}>{errorsVote}</span>}
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.title}>Compte Bancaire - Prélèvement SEPA</p></Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.title}>Nom du titulaire du compte</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField
                  variant="outlined"
                  value={accountHolder}
                  onChange={handleChangeAccountHolder}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="flex-start" spacing={2}>
              <Grid item><p className={classes.title}>Adresse</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField
                  rows={3}
                  multiline
                  variant="outlined"
                  value={accountAddress}
                  onChange={handleChangeAccountAddress}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.title}>IBAN</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField
                  variant="outlined"
                  value={accountIban}
                  onChange={handleChangeAccountIban}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid xs={12} item container direction="column" spacing={2}>

            </Grid>
          </Grid>
          <div className={classes.footer}>
            <Grid container justify="space-between">
              <MyButton name={"Créer"} color={"1"} onClick={handleClickAdd} />
              <MyButton name={"Annuler"} bgColor="gray" onClick={handleClose} />
            </Grid>
          </div>
        </div>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
      </div>
    </Scrollbars>
  );
};

export default withRouter(AddBuilding);
