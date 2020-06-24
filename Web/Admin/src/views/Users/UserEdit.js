import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
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
import AdminService from '../../services/api.js';

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
  const [profile, setProfile] = useState({});
  const companiesList=[];
  const itemCompanies ={'Apporto' : 0 };
  const buildingsList=[];
  const itemBuildings ={'edit' : 0 };
  const permissionList = ['Editer', 'Voir', 'Refusé'];
  const itemPermission ={'edit' : 0 , 'see' : 1, 'denied' : 2};
  const {history} = props;
  const [companies, setCompanies] = React.useState('');
  const [buildings, setBuildings] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [companiesPermission, setCompaniesPermission] = React.useState('');
  const [buildingsPermission, setBuildingsPermission] = React.useState('');
  const [managersPermission, setManagersPermission] = React.useState('');
  const [ownersPermission, setOwnersPermission] = React.useState('');
  const [ordersPermission, setOrdersPermission] = React.useState('');
  const [productsPermission, setProductsPermission] = React.useState('');
  const [discountCodesPermission, setDiscountodesPermission] = React.useState('');
  const [usersPermission, setUsersPermission] = React.useState('');
  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  useEffect(() => {
    AdminService.getAllCompanyList()
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
          console.log('success');
          const data = response.data.data;
          localStorage.setItem("token", JSON.stringify(data.token));
          {
            data.companylist.map((companylist,i)=>{
              companiesList.push(companylist.company_name);
            })
          }
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
    AdminService.getUser(props.match.params.id)
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
          console.log('success');
          const data = response.data.data;
          localStorage.setItem("token", JSON.stringify(data.token));
          const profile = data.user.profile;
          {
            data.user.building.map((building,i)=>{
              buildingsList.push(building.building_name);
            })
          }
          setLastName(profile.lastname);
          setFirstName(profile.firstname);
          setEmail(profile.email);
          setPhoneNumber(profile.phone);
          setCompanies(itemCompanies[profile.company_name]);
          setBuildings(itemBuildings[profile.company_name]);
          setCompaniesPermission(itemPermission[profile.company_permission]);
          setManagersPermission(itemPermission[profile.manager_permission]);
          setBuildingsPermission(itemPermission[profile.building_permission]);
          setOwnersPermission(itemPermission[profile.owner_permission]);
          setOrdersPermission(itemPermission[profile.orders_permission]);
          setProductsPermission(itemPermission[profile.products_permission]);
          setDiscountodesPermission(itemPermission[profile.discount_code_permission]);
          setUsersPermission(itemPermission[profile.users_permission]);

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

  const handleClick = ()=>{
    history.goBack();
  };
  const onClickSave = ()=>{

  }
const handleChangeLastName = (event) => {
  setLastName(event.target.value);
}
const handleChangeFirstName = (event) => {
  setFirstName(event.target.value);
}
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
}
const handleChangePhoneNumber = (event) => {
  setPhoneNumber(event.target.value);
}
const handleChangeCompanies = (val) => {
  setCompanies(val);
}
const handleChangeBuildings = (val) => {
  setBuildings(val);
}
const handleChangeCompaniesPermission = (val) => {
  setCompaniesPermission(val);
}
const handleChangeManagersPermission = (val) => {
  setManagersPermission(val);
}
const handleChangeBuildingsPermission = (val) => {
  setBuildingsPermission(val);
}
const handleChangeOwnersPermission = (val) => {
  setOwnersPermission(val);
}
const handleChangeOrdersPermission = (val) => {
  setOrdersPermission(val);
}
const handleChangeDiscountCodesPermission = (val) => {
  setDiscountodesPermission(val);
}
const handleChangeProductsPermission = (val) => {
  setProductsPermission(val);
}
const handleChangeUsersPermission = (val) => {
  setUsersPermission(val);
}
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
                      <MySelect 
                        color="gray" 
                        width="289px" 
                        data={companiesList}
                        value={companies}
                        onChangeSelect={handleChangeCompanies}
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
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2} justify="space-between">
              <Grid item container direction="row" justify="space-between">
                <Grid item container direction="column" justify="space-between" xs={5}>
                    <Grid item container alignItems="center" spacing={2}>
                        <Grid item><p style={{fontSize:25}}>Immeubles</p></Grid>
                        <Grid xs item container alignItems="stretch">
                          <MySelect 
                            color="gray" 
                            width="289px" 
                            data={buildingsList}
                            value={buildings}
                            onChangeSelect={handleChangeBuildings}
                          />
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
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined" 
                  placeholder="johndoe@gmail.com"
                  value={lastname}
                  onChange={handleChangeLastName} 
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Prénom</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined" 
                  placeholder="johndoe@gmail.com"
                  value={firstname}
                  onChange={handleChangeFirstName} 
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Email</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined" 
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={handleChangeEmail} 
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Téléphone</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined" 
                  placeholder="0102030405"
                  value={phonenumber}
                  onChange={handleChangePhoneNumber} 
                />
              </Grid>
            </Grid>

            <Grid item ><p style={{fontSize:30}}><b>Permissions</b></p></Grid>
            <Grid item container spacing={1}>
                <Grid item container ></Grid>
                <Grid item container spacing={2}>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Cabinets</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={companiesPermission}
                        onChangeSelect={handleChangeCompaniesPermission}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Gestionnaires</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={managersPermission}
                        onChangeSelect={handleChangeManagersPermission}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Immeuables</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={buildingsPermission}
                        onChangeSelect={handleChangeBuildingsPermission}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Coproprietaires</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={ownersPermission}
                        onChangeSelect={handleChangeOwnersPermission}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Commandes</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={ordersPermission}
                        onChangeSelect={handleChangeOrdersPermission}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Prodults</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={productsPermission}
                        onChangeSelect={handleChangeProductsPermission}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Codes Promo</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={discountCodesPermission}
                        onChangeSelect={handleChangeDiscountCodesPermission}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item container direction="column">
                      <p style={{fontSize:24}}>Utilisateurs</p>
                      <MySelect 
                        color="#9f9f9f" 
                        width="244px" 
                        data={permissionList}
                        value={usersPermission}
                        onChangeSelect={handleChangeUsersPermission}
                      />
                    </Grid>
                </Grid> 
                </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"} onClickSave={onClickSave}/>
            </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default withRouter(UserEdit);
