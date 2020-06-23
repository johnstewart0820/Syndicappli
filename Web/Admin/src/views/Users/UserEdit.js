import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import MyTable from '../../components/MyTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import MySelect from '../../components/MySelect';
import MyButton from 'components/MyButton';
import theme from 'theme';
import Badge from '@material-ui/core/Badge';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MyTextField from '../../components/MyTextField';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4),
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-multiline':{
        padding: '3px 26px 3px 12px',
        fontSize: 16,
    },
    // '& .MuiOutlinedInput-input':{
    //     padding: '3px 26px 3px 12px',
    //     fontSize: 16,
    // },
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
  }
}));
const UserEdit = (props) => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const {history} = props;
  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  useEffect(() => {
    console.log(props.match.params.id);
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
  const handleClick = ()=>{
    history.goBack();
  };
  const cellList = [ 'name', 'price', 'stock'];
  const pages = {href: 'users/edit'};
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Mon Cabinet Syndic</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} style={{cursor:'pointer',fontSize:18}}>&lt; Retour à la liste des Utilisateurs</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid container direction="column" spacing={5}>
            <Grid item container spacing={2} direction="row" justify="space-between">
              <Grid item container direction="column" justify="space-between" xs={5}>
                <Grid item container><p  style={{fontSize:35}}><b>Informations</b></p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:25}}>Carbinets</p></Grid>
                    <Grid xs item container alignItems="stretch">
                    <MySelect color="gray" width="289px" data={cellList}/>
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
                  badgeContent={<EditOutlinedIcon style={{
                    width: 54,
                    height: 54,
                    border: `2px solid ${theme.palette.background.paper}`,
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
            <Grid item container direction="column" spacing={2} justify="space-between">
              <Grid item container direction="row" justify="space-between">
                <Grid item container direction="column" justify="space-between" xs={5}>
                    <Grid item container alignItems="center" spacing={2}>
                        <Grid item><p style={{fontSize:25}}>Immeubles</p></Grid>
                        <Grid xs item container alignItems="stretch">
                        <MySelect color="gray" width="289px" data={cellList}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item><p style={{fontSize:25}}>Nombre de gestionnaires : 80</p></Grid>
              </Grid>
              <Grid item container direction="row" justify="space-between">
                <Grid xs={5} item container alignItems="stretch">
                </Grid>
                <Grid xs={5} item container direction="row-reverse"><p style={{fontSize:25}}>Nombre de lots : 120000</p></Grid>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Nom</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined" placeholder="johndoe@gmail.com"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Prénom</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined" placeholder="johndoe@gmail.com"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Email</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined" placeholder="johndoe@gmail.com"/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Téléphone</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField id="outlined-basic" className={classes.text} variant="outlined" placeholder="0102030405"/>
              </Grid>
            </Grid>

            <Grid item ><p style={{fontSize:30}}><b>Permissions</b></p></Grid>
            <Grid item container spacing={1}>
                <Grid item container ></Grid>
                <Grid item container spacing={2}>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Cabinets</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Gestionnaires</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Immeuables</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Coproprietaires</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Commandes</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Prodults</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Codes Promo</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                        <p style={{fontSize:24}}>Utilisateurs</p>
                        <MySelect color="#9f9f9f" width="244px" data={cellList}/>
                    </Grid>
                </Grid> 
                </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"}/>
            </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(UserEdit);
