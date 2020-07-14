import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import MySelect from '../../../components/MySelect';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import useStyles from './useStyles';
import ModuleCard from './components/ModuleCard';
import ModuleTable from './components/ModuleTable';

const Addons = (props) => {
  const {history}=props;
  //const token = authService.getToken();    
  // if (!token) {
  //   history.push("/manager/login");
  //   window.location.reload();
  // }
  const accessTeam = authService.getAccess('role_managers');

  const classes = useStyles();

  let building = [];
  const [buildings, setBuildings] = useState('');
  const [buildingList, setBuildingList] = useState([]);
  const [buildingID, setBuildingID] = useState(-1);
  const [purchaseAddonState , setPurchaseAddonState] = useState(false);

  const [dataList, setDataList] = useState([]);
  const cellList = [ 
    {key : 'bundle_name' , field : 'Produit'}, 
    {key : 'building' , field : 'Immeuble'}, 
    {key : 'purchase_date' , field : 'Valide du'},
    {key : 'validaty_end_date' , field : "Valide jusqu'au"},
  ];
  const handleChangeBuildings = (val) =>{
    setBuildings(val);
    if(val < buildingList.length)
      setBuildingID(buildingList[val].buildingID);
    else
      setBuildingID(-1);
  };
  const handleAdd = ()=>{

  };
  const handleClickBuyPack = ()=>{
    history.push("/manager/addons/payment");
  };
  const handleClickBuyAgain = ()=>{
    setPurchaseAddonState(!purchaseAddonState);
  };
  useEffect(() => {
    getDataList();
    // getBuildings();

  }, []);
  const getDataList = () => {
    setDataList([
      { ID: 1, bundle_name: 'Pack modules', building: 'Résidence les Pinsons bleus', purchase_date: '12/03/2020', validaty_end_date: '12/03/2021'},
    ])
  }
  useEffect(()=>{
  },[]);
  const getBuildings = ()=>{
 
  }

  
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <p className={classes.titleText}>
                <b>Modules</b>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
        <Grid container xs={6} sm={5} md={4} lg={3} xl={2} item container alignItems="center" spacing={2}>
            <Grid item ><p className={classes.subTitle}>Immeuble</p></Grid>
            <Grid xs item container direction="row-reverse">
              <Grid item container direction="column" alignItems="stretch">
                <MySelect 
                    color="gray" 
                    data={buildingList} 
                    onChangeSelect={handleChangeBuildings}
                    value={buildings}
                />
              </Grid>
            </Grid>
        </Grid>
      </div> 
      <div className={classes.body}>
        {
          purchaseAddonState === false ?
            <Grid container>
            <Grid container direction="column" spacing={5}>
              <Grid item></Grid>
              <Grid item>
                <p className={classes.itemTitle}>Conformément à l’article 17-1 A de la Loi n° 65-557 du 10 juillet 1965 fixant le statut de la copropriété des immeubles 
                  bâtis, les copropriétaires peuvent participer à l'assemblée générale par visioconférence ou par tout autre moyen de 
                  communication électronique permettant leur identification.</p>
              </Grid>
              <Grid item>
                <p className={classes.itemTitle}>Conformément à l’article 13-1 du Décret n°67-223 du 17 mars 1967 pris pour l'application de la loi n° 65-557 du 10 
                  juillet 1965 fixant le statut de la copropriété des immeubles bâtis, les supports doivent, au moins, transmettre leur 
                  voix et permettre la retransmission continue et simultanée des délibérations pour garantir la participation effective 
                  des copropriétaires.</p>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <ModuleCard 
                  title="Voter par correspondance"
                  src="/images/advance.png"
                  details="Module vous permettant de déléguer votre droit de 
                    vote à un mandataire de votre choix, qu’il soit ou non 
                    membre du Syndicat des copropriétaires. Pour cela, 
                    vous devez acheter ce module au tarif de :"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <ModuleCard 
                  title="Déléguer mon pouvoir"
                  src="/images/delegate.png"
                  details="Module vous permettant de voter l’ensemble des 
                    résolutions avant la tenue de l’Assemblée Générale, au 
                    moyen d’un formulaire à remplir.Pour cela, vous devez 
                    acheter ce module au tarif de :"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <ModuleCard 
                  title="Participer à une Assemblée Générale 
                          à Distance en Audio Conférence"
                  src="/images/audio.png"
                  details="Module vous permettant de participer à l'Assemblée 
                    Générale en Audioconférence. Pour cela, vous devez 
                    acheter ce module au tarif de :"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <ModuleCard 
                  title="Participer à une Assemblée Générale à 
                          Distance en Visio Conférence à 360°"
                  src="/images/visio.png"
                  details="Module vous permettant de participer à l'Assemblée 
                    Générale en visioconférence à 360° en totale immersion. 
                    Pour cela, vous devez acheter ce module au tarif de :"
                />
              </Grid>
            </Grid>
            <Grid  container direction="column" alignItems="center" spacing={3}>
              <Grid item ><p className={classes.price}><b>4.90€</b></p></Grid>
              <Grid item ><MyButton name = {"J'achète le pack"} color={"1"} onClick={handleClickBuyPack}/></Grid>
              <Grid item></Grid>
            </Grid>
            </Grid>
          :
            <Grid container direction="column" spacing={5}>
              <Grid item></Grid>
              <Grid item container>
                <ModuleTable 
                  products={dataList} 
                  cells={cellList} 
                />
              </Grid>
              <Grid item >
                <MyButton name = {"Acheter à nouveau"} color={"1"} onClick={handleClickBuyAgain}/>
              </Grid>
            </Grid>
        }
      </div>
    </div>
  );
};

export default withRouter(Addons);
