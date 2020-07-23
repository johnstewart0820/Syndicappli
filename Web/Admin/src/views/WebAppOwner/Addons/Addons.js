import React from 'react';
import Grid from '@material-ui/core/Grid';
import MyButton from '../../../components/MyButton';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import useStyles from './useStyles';
import ModuleCard from './components/ModuleCard';

const Addons = (props) => {
  const {history}=props;
  const token = authService.getToken();    
  if (!token) {
    window.location.replace("/login");
  }

  const classes = useStyles();
  const handleClickAdvance = ()=>{
    alert('advance')
  }
  const handleClickDelegate = ()=>{
    alert('delegate')
  }
  const handleClickAudio = ()=>{
    alert('audio')
  }
  const handleClickVisio = ()=>{
    alert('visio')
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
      <div className={classes.body}>
        <Grid container direction="column" spacing={5}>
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
              price="4.90€"
              onClick={handleClickAdvance}
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
              price="2.90€"
              onClick={handleClickDelegate}
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
              price="9.90€"
              onClick={handleClickAudio}
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
              price="12.90€"
              onClick={handleClickVisio}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}></div>
    </div>
  );
};

export default withRouter(Addons);
