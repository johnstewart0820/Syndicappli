import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../components/MyButton';
import IconButton from "@material-ui/core/IconButton";
import ScrollBar from 'react-perfect-scrollbar';
import TextField from '@material-ui/core/TextField';
import MySelect from '../../components/MySelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { defaultProps } from 'recompose';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,
        padding: theme.spacing(2, 4, 3),
    },
    footer: {
        paddingTop: 89,
    },
    root: {
        '& .MuiTextField-root': {
            width: '500',
        },
        '& .MuiOutlinedInput-root':{
            width: 160
        },
        '& .MuiOutlinedInput-input':{
            padding: '8px 12px',
            fontSize: 17
        },
    },
    input: {
        display: 'none'
    },
    img: {
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        border: '1px dashed rgba(112,112,112,0.43)',
        borderRadius: 8,
        width: 116,
        height: 92,
    }
}));

const AddUser = (props) => {
  const classes = useStyles();
  const cellList=[20, 50, 100, 200];
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
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
  const handleClose = ()=>{
    props.onCancel();
  };
  const handleCreate = ()=>{
    
  }
  const handleLoadFront = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
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
        <div className={classes.paper} sm={12}>
            <Grid container spacing={2} >
                <Grid item container justify="center" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Carbinets</p></Grid>
                    <Grid xs={3} item container>
                        <MySelect 
                            color="gray" 
                            width="289px" 
                            data={cellList} 
                            onChangeSelect={handleChangeCompanies}
                            value={companies}
                        />
                    </Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Immeubles</p></Grid>
                    <Grid xs={3} item container>
                        <MySelect 
                            color="gray" 
                            width="289px" 
                            data={cellList} 
                            onChangeSelect={handleChangeBuildings}
                            value={buildings}
                        />
                    </Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Nom</p></Grid>
                    <Grid xs={3} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={lastname}
                            onChange={handleChangeLastName} 
                        />
                    </Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Prénom</p></Grid>
                    <Grid xs={3} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={firstname}
                            onChange={handleChangeFirstName} 
                        />
                    </Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Email</p></Grid>
                    <Grid xs={3} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined"
                            value={email}
                            onChange={handleChangeEmail} 
                        />
                    </Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                    <Grid xs={3} item container><p style={{fontSize:18}}>Téléphone</p></Grid>
                    <Grid xs={3} item container>
                        <TextField 
                            id="outlined-basic" 
                            className={classes.text} 
                            variant="outlined" 
                            value={phonenumber}
                            onChange={handleChangePhoneNumber} 
                        />
                    </Grid>
                    <Grid xs={6}></Grid>
                </Grid>
                <Grid xs={12} item container direction="column" >
                    <p style={{fontSize:18}}>Photo</p>
                    <Grid item container justify="flex-start">
                    <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                    <label htmlFor="img_front">
                        {
                            avatarurl === '' ?
                             <div className={classes.img}>
                                <AddCircleOutlineIcon style={{width:31 , height: 31, color: '#707070'}}/>
                             </div> :
                             <img className={classes.img} src={avatarurl}/>
                        }
                    </label>
                    </Grid>
                </Grid>
            </Grid>
            <br/>
            <p style={{fontSize:18}}><b>Permissions</b></p>
            <br />
            <Grid container spacing={2}>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Cabinets</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeCompaniesPermission}
                        value={companiesPermission}
                    />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Gestionnaires</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeManagersPermission}
                        value={managersPermission}
                    />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Immeuables</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeBuildingsPermission}
                        value={buildingsPermission}
                    />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Coproprietaires</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeOwnersPermission}
                        value={ownersPermission}
                    />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Commandes</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeOrdersPermission}
                        value={ordersPermission}
                    />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Prodults</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeProductsPermission}
                        value={productsPermission}
                    />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Codes Promo</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeDiscountCodesPermission}
                        value={discountCodesPermission}
                    />
                </Grid>
                <Grid xs={6} item container direction="column">
                    <p style={{fontSize:18}}>Utilisateurs</p>
                    <MySelect 
                        color="gray" 
                        width="176px" 
                        data={cellList} 
                        onChangeSelect={handleChangeUsersPermission}
                        value={usersPermission}
                    />
                </Grid>
            </Grid>
            <div className={classes.footer}>
                <Grid container justify="space-between">
                    <MyButton name = {"Creer"} color={"1"} handleCreate={handleCreate}/>
                    <MyButton name = {"Annuler"} bgColor="grey" handleClose={handleClose}/>
                </Grid>
            </div>
        </div>
        <ScrollBar/>
    </div>
  );
};

export default AddUser;
