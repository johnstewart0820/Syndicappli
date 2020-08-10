import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MyButton from 'components/MyButton';
import TextField from '@material-ui/core/TextField';
import MySelect from 'components/MySelect';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/styles';
import { ManagerService as Service } from 'services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { withRouter } from 'react-router-dom';
import authService from 'services/authService';
import { getConfigFileParsingDiagnostics } from 'typescript';
const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    padding: theme.spacing(2, 4, 3),
  },
  footer: {
    [theme.breakpoints.up('xl')]: {
      paddingTop: 89,
    },
    [theme.breakpoints.down('lg')]: {
      paddingTop: 62,
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 43,
    },
    paddingBottom: 30
  },
  root: {
    '& .MuiOutlinedInput-multiline':{
      padding: 0,
      lineHeight: 'normal'
    },
    '& .MuiOutlinedInput-input': {
      [theme.breakpoints.up('xl')]: {
        padding: '17px 25px',
        fontSize: 22,
      },
      [theme.breakpoints.down('lg')]: {
        padding: '12px 18px',
        fontSize: 15,
      },
      [theme.breakpoints.down('md')]: {
        padding: '8px 13px',
        fontSize: 11,
      },
    },
    '& p': {
      marginBottom: 0
    }
  },
  plus: {
    color: '#707070',
    [theme.breakpoints.up('xl')]: {
      width: 31,
      height: 31,
    },
    [theme.breakpoints.down('lg')]: {
      width: 22,
      height: 22,
    },
    [theme.breakpoints.down('md')]: {
      width: 15,
      height: 15,
    },
  },
  input: {
    display: 'none'
  },
  img: {
    objectFit:'cover',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    border: '1px dashed rgba(112,112,112,0.43)',
    borderRadius: 8,
    [theme.breakpoints.up('xl')]: {
      width: 116,
      height: 92,
      marginTop: 20,
      marginRight: 20
    },
    [theme.breakpoints.down('lg')]: {
      width: 81,
      height: 64,
      marginTop: 14,
      marginRight: 14
    },
    [theme.breakpoints.down('md')]: {
      width: 57,
      height: 45,
      marginTop: 10,
      marginRight: 10
    },
  },
  title: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 13,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 9,
    },
  },
  error: {
    color: 'red',
    [theme.breakpoints.up('xl')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 13,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 9,
    },
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
}));
const ManagerService = new Service();
const BankCard = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [visibleIndicator, setVisibleIndicator] = useState(false);
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardHolderName, setCardHolderName] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [cryptogram, setCryptogram] = React.useState('');

  const [errorsCardNumber, setErrorsCardNumber] = React.useState('');
  const [errorsCardHolderName, setErrorsCardHolderName] = React.useState('');
  const [errorsExpirationDate, setErrorsExpirationDate] = React.useState('');
  const [errorsCryptogram, setErrorsCryptogram] = React.useState('');
  const handleClose = () => {
    props.onCancel();
  };
  useEffect(()=>{
    if(props.state.method === 'edit'){
      getCard(props.state.pos);
    }
  },[props.state]);
  const handleProcess = () => {
    let cnt = 0;
    if (cardNumber.length === 0) { setErrorsCardNumber('please enter card number'); cnt++; }
    else setErrorsCardNumber('');
    if (cardHolderName.length === 0) { setErrorsCardHolderName('please enter card holder name'); cnt++; }
    else setErrorsCardHolderName('');
    if (expirationDate.length === 0) { setErrorsExpirationDate('please select expiration date'); cnt++; }
    else setErrorsExpirationDate('');
    if (cryptogram.length === 0) { setErrorsCryptogram('please enter cryptogram'); cnt++; }
    else setErrorsCryptogram('');
    if (cnt === 0) {
      if (props.state.method === 'add')
        createCard();
      else if (props.state.method === 'edit')
        updateCard();
    }
  }
  const createCard = () => {
    const requestData = {
      'card_number' : cardNumber,
      'card_holder_name' : cardHolderName,
      'expiration_date' : expirationDate,
      'cryptogram' : cryptogram
    }
    setVisibleIndicator(true);
    ManagerService.createCard(requestData)
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
  const updateCard = () => {
    const requestData = {
      'card_number' : cardNumber,
      'card_holder_name' : cardHolderName,
      'expiration_date' : expirationDate,
      'cryptogram' : cryptogram
    }
    setVisibleIndicator(true);
    ManagerService.updateCard(props.state.pos, requestData)
      .then(
        response => {
          setVisibleIndicator(false);
          switch (response.data.code) {
            case 200:
              const data = response.data.data;
              localStorage.setItem("token", JSON.stringify(data.token));
              props.onUpdate();
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
  };
  const getCard = (id)=>{
    setVisibleIndicator(true);
      ManagerService.getCard(id)
        .then(
          response => {
            setVisibleIndicator(false);
            switch(response.data.code){
              case 200:
                const data = response.data.data;
                localStorage.setItem("token", JSON.stringify(data.token));
                setCardNumber(data.card.card_number);
                setCardHolderName(data.card.card_holder_name);
                setExpirationDate(data.card.expiration_date);
                setCryptogram(data.card.cryptogram);
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
  const handleChangeCardNumber = (event) => {
    setCardNumber(event.target.value);
  }
  const handleChangeCardHolderName = (event) => {
    setCardHolderName(event.target.value);
  }
  const handleChangeExpirationDate = (event) => {
    setExpirationDate(event.target.value);
  }
  const handleChangeCryptogram = (event) => {
    setCryptogram(event.target.value);
  }
  return (
    <Scrollbars style={{ height: '50vh' }}>
      <div className={classes.root}>
        {
          visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
        }
        <div className={classes.paper} sm={12}>
          <Grid container spacing={3} >
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Numéro de carte</p></Grid>
              <Grid xs item container direction="column">
                <TextField
                  variant="outlined"
                  value={cardNumber}
                  onChange={handleChangeCardNumber}
                  fullWidth
                />
                {errorsCardNumber.length > 0 &&
                  <span className={classes.error}>{errorsCardNumber}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.title}>Nom du titulaire</p></Grid>
              <Grid xs item container direction="column">
                <TextField
                  variant="outlined"
                  value={cardHolderName}
                  onChange={handleChangeCardHolderName}
                  fullWidth
                />
                {errorsCardHolderName.length > 0 &&
                  <span className={classes.error}>{errorsCardHolderName}</span>}
              </Grid>
            </Grid>
            <Grid xs={6} item container spacing={1} direction="column">
              <Grid item><p className={classes.title}>Date expiration</p></Grid>
              <Grid item container>
                <TextField
                  variant="outlined"
                  value={expirationDate}
                  onChange={handleChangeExpirationDate}
                  type="date"
                  fullWidth
                />
                {errorsExpirationDate.length > 0 &&
                  <span className={classes.error}>{errorsExpirationDate}</span>}
              </Grid>
            </Grid>
            <Grid xs={6} item container spacing={1} direction="column">
              <Grid item ><p className={classes.title}>Cryptogramme</p></Grid>
              <Grid item container>
                <TextField
                  variant="outlined"
                  value={cryptogram}
                  onChange={handleChangeCryptogram}
                  fullWidth
                />
                {errorsCryptogram.length > 0 &&
                  <span className={classes.error}>{errorsCryptogram}</span>}
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.footer}>
            <Grid container justify="space-between">
              <MyButton name={props.state.buttonText} color={"1"} onClick={handleProcess} />
              <MyButton name={"Annuler"} bgColor="grey" onClick={handleClose} />
            </Grid>
          </div>
        </div>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
      </div>
    </Scrollbars>
  );
};

export default withRouter(BankCard);
