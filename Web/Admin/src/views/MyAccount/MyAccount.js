import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';
import {withRouter} from 'react-router-dom';
import AdminService from './../../services/api.js';
import Toast from './../../components/Toast.js';
import { setSourceMapRange } from 'typescript';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-input':{
        padding: '17px 25px 17px 25px',
        fontSize: 22,
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
    marginBottom: theme.spacing(4),
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
    height: 214
  },
  text: {
    fontSize: 25
  }
}));
const MyAccount = (props) => {
  const {history} = props;
  const classes = useStyles();
  const [lastname , setLastName] = React.useState('');
  const [firstname , setFirstName] = React.useState('');
  const [email , setEmail] = React.useState('');
  const [phone , setPhone] = React.useState('');
  const [old_password , setOldPassword] = React.useState('');
  const [new_password , setNewPassword] = React.useState('');
  const [confirm_password , setConfirmPassword] = React.useState('');
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [state, setState] = React.useState('');
  let msg;
  const handleOpen = (value) => {
    setState(value);
    if(value === "success")
      msg = "Updated successfull";
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeLastName = (event)=>{
    setLastName(event.target.value);
  }
  const handleChangeFirstName = (event)=>{
    setFirstName(event.target.value);
  }
  const handleChangeEmail = (event)=>{
    setEmail(event.target.value);
  }
  const handleChangePhone = (event)=>{
    setPhone(event.target.value);
  }
  const handleChangeOldPassword = (event)=>{
    setOldPassword(event.target.value);
  }
  const handleChangeNewPassword = (event)=>{
    setNewPassword(event.target.value);
  }
  const handleChangeConfirmPassword = (event)=>{
    setConfirmPassword(event.target.value);
  }
  const handleLoadFront = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
  }
  useEffect(()=>{

    // setVisibleIndicator(true);
    AdminService.getProfile()
    .then(      
      response => {        
        console.log(response.data);
        // setVisibleIndicator(false);  
        if(response.data.code != 200){
          
        } else {
          localStorage.setItem("token", JSON.stringify(response.data.data.token));
          const profile = response.data.data.profile;
          setLastName(profile.lastname);
          setFirstName(profile.firstname);
          setEmail(profile.email);
          setPhone(profile.phone);
        }
      },
      error => {
        console.log('fail');        
        // setVisibleIndicator(false);
        // const resMessage =
        //     (error.response &&
        //       error.response.data &&
        //       error.response.data.message) ||
        //     error.message ||
        //     error.toString();
      }
    );   
  }, []);
  const onClickSave = (event)=>{
    handleOpen("Updated successfull!");

    var data={
      'lastname' : lastname,
      'firstname' : firstname,
      'email' : email,
      'phone' : phone,
      'old_password' : old_password,
      'new_password' : new_password
    };
    // setVisibleIndicator(true);
    AdminService.updateProfile(data)
    .then(      
      response => {        
        console.log(response.data);
        // setVisibleIndicator(false);  
        if(response.data.code != 200){
          // if(response.data.status === 'Token is Expired') {
          //   authService.logout();
          //   history.push('/');
          // }
          console.log('error');
        } else {
           localStorage.setItem("token", JSON.stringify(response.data.data.token));
        }
      },
      error => {
        console.log('fail');        
        // setVisibleIndicator(false);
        // const resMessage =
        //     (error.response &&
        //       error.response.data &&
        //       error.response.data.message) ||
        //     error.message ||
        //     error.toString();
      }
    );    
  }
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    console.log('a');
  });

  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around">
          <Grid item xs={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Mon Compte</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
      </div> 
      <div className={classes.body}>
      <Grid container direction="column" spacing={5}>
            <Grid item container spacing={2} direction="row" justify="space-between">
              <Grid item container direction="column" justify="space-between" xs={5}>
                <Grid item container><p style={{fontSize:37}}>John Doe</p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p className={classes.text}>Nom</p></Grid>
                    <Grid xs item container alignItems="stretch">
                      <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={lastname}
                        onChange={handleChangeLastName}
                      />
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
                    top: 13,
                    border: '2px solid gray',
                    padding: '0 4px',
                  }}
                  badgeContent={<EditOutlinedIcon style={{
                    width: 54,
                    height: 54,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    color: 'gray'
                  }}/>}
                >
                  <Avatar className={classes.size} alt="Travis Howard" src={user.avatar} />
                </Badge>
                {/* <Avatar className={classes.size} src={user.avatar}/> */}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Prénom</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined"
                  value={firstname}
                  onChange={handleChangeFirstName}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Email</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Telephone</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined"
                  value={phone}
                  onChange={handleChangePhone}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Mot de passe actuel</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined"
                  value={old_password}
                  onChange={handleChangeOldPassword}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined"
                  value={new_password}
                  onChange={handleChangeNewPassword}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Confirmer le nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined"
                  value={confirm_password}
                  onChange={handleChangeConfirmPassword}
                />
              </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"} onClickSave = {onClickSave}/>
            </Grid>
          </Grid>
      </div>
      <Toast state={state} msg={msg}/>
    </div>
  );
};

export default withRouter(MyAccount);
