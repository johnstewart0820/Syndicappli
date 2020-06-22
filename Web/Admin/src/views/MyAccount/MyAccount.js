import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../components/MyButton';

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
const MyAccount = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    console.log('a');
  });
  useEffect(() => {
    console.log('b');
    getDataList();
  }, []);
  const getDataList = () => {
    setDataList([
      {id: 1, name: 'Cheese', price: 4.9, stock: 20 },
      { id: 2, name: 'Milk', price: 1.9, stock: 32 },
      { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
      { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
      { id: 5, name: 'Butter', price: 0.9, stock: 99 },
      { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
      { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
      { id: 8, name: 'Cheese', price: 4.9, stock: 20 },
      { id: 9, name: 'Milk', price: 1.9, stock: 32 },
      { id: 10, name: 'Yoghurt', price: 2.4, stock: 12 },
    ])
  }
  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
  const pages = {href: 'users/users-edit'};
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
                      <TextField id="outlined-basic" className={classes.text} variant="outlined"/>
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
                <TextField id="outlined-basic" className={classes.text} variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Email</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Telephone</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Mot de passe actuel</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p className={classes.text}>Confirmer le nouveau mot de passe</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"}/>
            </Grid>
          </Grid>
      </div>
    </div>
  );
};

export default MyAccount;
