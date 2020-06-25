import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import MyTable from '../../components/MyTable';
import MyTableCard from '../../components/MyTableCard';
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
import { setStatic } from 'recompose';

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
  },
  input: {
    display: 'none'
  },
}));
const CompaniesEdit = (props) => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const {history} = props;
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
  const [avatarurl, setAvatarUrl] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [amountcompany, setamountCompany] = useState('')
  const [amountbuilding, setAmountBuilding] = useState('');

  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
  useEffect(() => {
    console.log('a');
  });
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
  const handleClick = ()=>{
    history.goBack();
  };
  const cellList = [ 'name', 'price', 'stock'];
  const pages = {href: 'companies/edit'};

  const handleChangeName = (event) => {
    setName(event.target.value);
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
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

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" style={{fontSize:35}}>
                <b>Cabinet Loiselet & Daigremont</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
          <p onClick={handleClick} style={{cursor:'pointer',fontSize:18}}>&lt; Retour à la liste des Cabinets</p>
      </div> 
      <Grid container direction="column" >
        <div className={classes.body}>
          <Grid container direction="column" spacing={5}>
            <Grid item container spacing={2} direction="row" justify="space-between">
              <Grid item container direction="column" justify="space-between" xs={5}>
                <Grid item container><p  style={{fontSize:35}}><b>Informations</b></p></Grid>
                <Grid item container alignItems="center" spacing={2}>
                    <Grid item><p style={{fontSize:25}}>Nom</p></Grid>
                    <Grid xs item container alignItems="stretch">
                      <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined" 
                        placeholder="Cabinet Loiselet & Daigremant"
                        value={name}
                        onChange={handleChangeName}
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
                  badgeContent={
                    <div>
                      <input className={classes.input} type="file" id="img_front" onChange={handleLoadFront}/>
                      <label htmlFor="img_front">
                        <EditOutlinedIcon 
                          style={{
                            width: 54,
                            height: 54,
                            border: `2px solid ${theme.palette.background.paper}`,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            color: 'gray'
                          }}
                        />
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
                <Grid item><p style={{fontSize:25}}>Coordonnees</p></Grid>
                <Grid item>
                  { 
                    amountcompany === '' ? null:
                     <p style={{fontSize:25}}>Nombre de gestionnaires : {amountcompany}</p>
                  }
                </Grid>
              </Grid>
              <Grid item container direction="row" justify="space-between">
                <Grid xs={5} item container alignItems="stretch">
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
                    rows={3} multiline 
                    variant="outlined" 
                    placeholder="41 route de"
                    value={address}
                    onChange={handleChangeAddress}
                  />
                </Grid>
                <Grid xs={5} item container direction="row-reverse">
                  {
                    amountbuilding === '' ? null :
                      <p style={{fontSize:25}}>Nombre de lots : {amountbuilding}</p>
                  }
                </Grid>
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
              <Grid item><p style={{fontSize:25}}>Telephone</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined" 
                  placeholder="0102030405"
                  value={phone}
                  onChange={handleChangePhone}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>Contact</p></Grid>
              <Grid xs item container alignItems="stretch">
                <MySelect color="gray" width="160px" data={cellList} value={contact} onChangeSelect={handleChangeContact}/>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={1}>
              <Grid item><p style={{fontSize:25}}>SIRET</p></Grid>
              <Grid xs item container alignItems="stretch">
                <TextField 
                  id="outlined-basic" 
                  className={classes.text} 
                  variant="outlined" 
                  placeholder="0123456789123456789"
                  value={siret}
                  onChange={handleChangeSiret}
                />
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
                <Grid item container><p style={{fontSize:25}}>TVA Intracommunautaire</p></Grid>
                <Grid xs item container alignItems="stretch">
                  <TextField 
                    id="outlined-basic" 
                    className={classes.text} 
                    variant="outlined"
                    value={vat}
                    onChange={handleChangeVat} 
                  />
                </Grid>
            </Grid>
            <Grid item container style={{paddingTop:'50px',paddingBottom:'50px'}}>
              <MyButton   name={"Sauvegarder"} color={"1"}/>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid item container justify="flex-start" spacing={2} className={classes.item}>
            <Grid item>
              <p  style={{fontSize:35}}><b>Gestionnaires</b></p>
            </Grid>
          </Grid>
          <MyTable products={dataList} pages={pages} cells={cellList} leftBtn="Ajouter un  gestionnaire" />
        </div>
        <div>
          <Grid item container justify="flex-start" spacing={2} className={classes.item}>
            <Grid item>
              <p style={{fontSize:35}}><b>Immeubles</b></p>
            </Grid>
          </Grid>
          <MyTable products={dataList} pages={pages} cells={cellList} leftBtn="Ajouter un  immeuble" />
        </div>
        <Grid item container>
          <Grid item container justify="flex-start" direction="column" spacing={2} className={classes.item}>
            <Grid item>
              <p style={{fontSize:35}}><b>Moyens de paiement</b></p>
            </Grid>
            <Grid item>
              <p style={{fontSize:28}}><b>carte bancaire</b></p>
            </Grid>
          </Grid>
          <Grid  item sm={7}>
              <MyTableCard products={dataList} pages={pages} cells={cellList} leftBtn="Ajouter uno  carte" />
          </Grid>
        </Grid>
        <div>
          <Grid xs={6} sitem container justify="flex-start" direction="column" spacing={5} className={classes.item}>
            <Grid item>
              <p style={{fontSize:28}}><b>Compte bancaire - Prelevement SEPA</b></p>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p style={{fontSize:18}}>Nom du titulaire du compte</p></Grid>
                  <Grid xs item container direction="row-reverse">
                    <Grid item container alignItems="stretch" direction="column">
                      <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={accountname}
                        onChange={handleChangeAccountName}
                      />
                    </Grid>
                  </Grid>
              </Grid>
              <Grid item container alignItems="flex-start" spacing={2}>
                  <Grid item><p style={{fontSize:18}}>Adresse</p></Grid>
                  <Grid xs item container direction="row-reverse">
                    <Grid item container alignItems="stretch" direction="column">
                      <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        rows={3} 
                        multiline 
                        variant="outlined"
                        value={accountaddress}
                        onChange={handleChangeAccountAddress}
                      />
                    </Grid>
                  </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={2}>
                  <Grid item><p style={{fontSize:18}}>IBAN</p></Grid>
                  <Grid xs item container direction="row-reverse">
                    <Grid item container alignItems="stretch" direction="column">
                      <TextField 
                        id="outlined-basic" 
                        className={classes.text} 
                        variant="outlined"
                        value={IBAN}
                        onChange={handleChangeIBAN}
                      />
                    </Grid>
                  </Grid>
              </Grid>
            </Grid>
            <Grid  item container justify="space-between" spacing={1}>
                <Grid item><MyButton name = {"Editer le mandat"} color={"1"}/></Grid>
                <Grid item><MyButton name = {"Supprimer"} bgColor="grey"/>  </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default CompaniesEdit;
