import React, {  useEffect } from 'react';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../../components/MyButton';
import MySelect from '../../../../components/MySelect';
import {withRouter} from 'react-router-dom';
import AdminService from '../../../../services/api.js';
import authService from '../../../../services/authService.js';
import CircularProgress  from '@material-ui/core/CircularProgress';
import SubAccountsTable from './components/SubAccountsTable';
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
    '& .MuiOutlinedInput-multiline':{
      padding: 0
    },
    '& .MuiOutlinedInput-input':{
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
    '& p':{
      marginBottom: 0
    }
  },
  tool: {
    [theme.breakpoints.up('xl')]: {
      minHeight: 67
    },
    [theme.breakpoints.down('lg')]: {
      minHeight: 47
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 33
    },
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  body:{
    [theme.breakpoints.up('xl')]: {
      borderRadius: 30,
    },
    [theme.breakpoints.down('lg')]: {
      borderRadius: 21,
    },
    [theme.breakpoints.down('md')]: {
      borderRadius: 15,
    },
    marginBottom: 40
  },
  item:{
    marginTop: theme.spacing(5),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: 'none',
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
  backTitle:{
    cursor: 'pointer',
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
  error:{
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
  headerTitle:{
      [theme.breakpoints.up('xl')]: {
        fontSize :35
      },
      [theme.breakpoints.down('lg')]: {
        fontSize :25
      },
      [theme.breakpoints.down('md')]: {
        fontSize :18
      },
  },
}));
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const SubAccounts = (props) => {
  const {history} = props;

  // const token = authService.getToken();    
  // if (!token) {
  //   history.push("/owner/login");
  //   window.location.reload();
  // }
  const classes = useStyles();
  const [ownerTitle , setOwnerTitle] = React.useState('');
  const [lastname , setLastName] = React.useState('');
  const [firstname , setFirstName] = React.useState('');
  const [companyname, setCompanyName] = React.useState('');
  const [email , setEmail] = React.useState('');
  const [mobile , setMobile] = React.useState('');

  const [errorsOwnerTitle , setErrorsOwnerTitle] = React.useState('');
  const [errorsLastName , setErrorsLastName] = React.useState('');
  const [errorsFirstName , setErrorsFirstName] = React.useState('');
  const [errorsCompanyName , setErrorsCompanyName] = React.useState('');
  const [errorsEmail , setErrorsEmail] = React.useState('');
  const [errorsMobile , setErrorsMobile] = React.useState('');

  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const titleList=['','Mr','Mrs','Company'];
  const items = [
    {lastname: 'Doe' , firstname: 'John' , email: 'john@hotmail.hr', accept: false},
    {lastname: 'Doe' , firstname: 'John' , email: 'john@hotmail.hr', accept: true},
    {lastname: 'Doe' , firstname: 'John' , email: 'john@hotmail.hr', accept: true},
  ]
  const handleChangeLastName = (event)=>{
    setLastName(event.target.value);
  }
  const handleChangeFirstName = (event)=>{
    setFirstName(event.target.value);
  }
  const handleChangeEmail = (event)=>{
    event.preventDefault();
    let errorsMail = 
          validEmailRegex.test(event.target.value)
            ? ''
            : 'Email is not valid!';
          setEmail(event.target.value);
          setErrorsEmail(errorsMail);
  }
  const handleChangeMobile = (event)=>{
    setMobile(event.target.value);
  }
  const handleChangeCompanyName = (event)=>{
    setCompanyName(event.target.value);
  }
  const handleChangeOwnerTitle = (value)=>{
    setOwnerTitle(value);
  }
  useEffect(()=>{

    setVisibleIndicator(true);
    AdminService.getProfile()
    .then(      
      response => {        
        setVisibleIndicator(false);  
        if(response.data.code !== 200){
          
        } else {
          localStorage.setItem("token", JSON.stringify(response.data.data.token));
          const profile = response.data.data.profile;
          setLastName(profile.lastname);
          setFirstName(profile.firstname);
          setEmail(profile.email);
          setMobile(profile.mobile);
        }
      },
      error => {
        console.log('fail');        
          setVisibleIndicator(false);
      }
    );   
  }, []);
  const handleClickDelete = (num)=>{
    
  }
  const onClickInvite = (event)=>{
    let cnt = 0;
    if(ownerTitle.length === 0) {setErrorsOwnerTitle('please enter select your owner title'); cnt++;}
    else setErrorsOwnerTitle('');
    if(lastname.length === 0) {setErrorsLastName('please enter your last name'); cnt++;}
    else setErrorsLastName('');
    if(firstname.length === 0) {setErrorsFirstName('please enter your first name'); cnt++;}
    else setErrorsFirstName('');
    if(ownerTitle !== 3 && companyname.length === 0) {setErrorsCompanyName('please enter your company name'); cnt++;}
    else setErrorsCompanyName('');
    if(email.length === 0) {setErrorsEmail('please enter your email'); cnt++;}
    else setErrorsEmail('');
    if(mobile.length === 0) {setErrorsMobile('please enter your mobile number'); cnt++;}
    else setErrorsMobile('');
    if(cnt === 0) setData();
  }
  const setData = ()=>{
    let formdata = new FormData();

    formdata.set('lastname', lastname);
    formdata.set('firstname', firstname);
    formdata.set('email', email);
    formdata.set('mobile', mobile);
    setVisibleIndicator(true);
    AdminService.updateProfile(formdata)
    .then(      
      response => {        
        console.log(response.data);
         setVisibleIndicator(false);  
        if(response.data.code !== 200){
        } else {
            ToastsStore.success("Updated successfully!");
           localStorage.setItem("token", JSON.stringify(response.data.data.token));
        }
      },
      error => {
        ToastsStore.error(error);     
         setVisibleIndicator(false);
      }
    );  
  }

  return (
    <div>
    {
      visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
    }
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around">
          <Grid item xs={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.headerTitle}>
                <b>Sous comptes</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
        <Grid xs={12} sm={8} md={8} lg={8} xl={6}>
          <p className={classes.backTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan mauris risus, ut 
          tincidunt augue dictum eu. Donec molestie nibh purus, non sollicitudin nisl condimentum 
          vitae. Suspendisse vehicula laoreet ullamcorper. </p>
        </Grid>
      </div> 
      <div className={classes.body}>
        <Grid item container xs={12} sm={8} md={8} lg={8} xl={6} justify="flex-start" direction="column" spacing={4}>
            <Grid item></Grid>
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
            <Grid item container alignItems="center" spacing={1}>
                <Grid item><p className={classes.backTitle}>Nom</p></Grid>
                <Grid xs item container alignItems="stretch" direction="column">
                  <Grid item>
                    <TextField 
                      id="outlined-basic" 
                      variant="outlined"
                      value={lastname}
                      onChange={handleChangeLastName}
                    />
                  </Grid>
                  {errorsLastName.length > 0 && 
                  <span className={classes.error}>{errorsLastName}</span>}
                </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.backTitle}>Prénom</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={firstname}
                    onChange={handleChangeFirstName}
                  />
                </Grid>  
                {errorsFirstName.length > 0 && 
                      <span className={classes.error}>{errorsFirstName}</span>}
              </Grid>
            </Grid>
            {
              ownerTitle === '3' ?
                <Grid item container alignItems="center" spacing={1} >
                  <Grid item><p className={classes.backTitle}>Cabinet Nom</p></Grid>
                  <Grid xs item container alignItems="stretch" direction="column">
                    <Grid item>
                      <TextField 
                        id="outlined-basic" 
                        variant="outlined"
                        value={companyname}
                        onChange={handleChangeCompanyName}
                      />
                    </Grid>  
                    {errorsCompanyName.length > 0 && 
                          <span className={classes.error}>{errorsCompanyName}</span>}
                  </Grid>
                </Grid> 
              : <div/>
            }
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.backTitle}>Email</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </Grid>  
                {errorsEmail.length > 0 && 
                      <span className={classes.error}>{errorsEmail}</span>}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.backTitle}>Mobile</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <Grid item>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    value={mobile}
                    onChange={handleChangeMobile}
                  />
                </Grid>  
                {errorsMobile.length > 0 && 
                      <span className={classes.error}>{errorsMobile}</span>}
              </Grid>
            </Grid>
          </Grid>
        <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
          <MyButton   name={"Inviter"} color={"1"} onClick = {onClickInvite}/>
        </Grid>
        <SubAccountsTable items={items} onClikDelete={handleClickDelete}/>
      </div>
    </div>
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </div>
  );
};

export default withRouter(SubAccounts);
