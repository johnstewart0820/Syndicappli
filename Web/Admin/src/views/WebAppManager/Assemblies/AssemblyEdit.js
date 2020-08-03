import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import authService from '../../../services/authService.js';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { ManagerService as Service } from '../../../services/api.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import MyButton from 'components/MyButton';
import { EditAssemblyStyles as useStyles } from './useStyles';
import Informations from './views/Informations';
import Documents from './views/Documents.js';
import PostalVotes from './views/PostalVotes.js';
import Minutes from './views/Minutes.js';
import Resolutions from './views/Resolutions.js';
import MeetingRoom from './views/MeetingRoom.js';
import TimeSheet from './views/TimeSheet.js';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ManagerService = new Service();
const AssemblyEdit = (props) => {
  const { history } = props;
  const classes = useStyles();
  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  const [title, steTitle] = useState('AG du Vendredi 12 Janvier 2020');
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = () => {
    history.goBack();
  };
  const handleClickStart = () => {

  };
  const handleClickExport = () => {

  };
  const handleClickImport = () => {

  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid item container justify="space-around" alignItems="center">
          <Grid item xs={12} sm={6} container justify="flex-start" >
            <Grid item>
              <Typography variant="h2" className={classes.headerTitle}>
                <b>{title}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end" >
          </Grid>
        </Grid>
      </div>
      <div className={classes.tool}>
        <Grid container justify="space-between">
          <Grid item>
            <p onClick={handleClick} className={classes.backTitle}>&lt; Retour à la liste des AG</p>
          </Grid>
          <Grid item>
            <Grid item container direction="row-reverse" spacing={2}>
              <Grid item>
                <MyButton
                  name={"Démarrer"}
                  color={"1"}
                  onClick={handleClickStart}
                />
              </Grid>
              <Grid item>
                <MyButton
                  name={"Exporter"}
                  bgColor={"#00C9FF"}
                  onClick={handleClickExport}
                />
              </Grid>
              <Grid item>
                <MyButton
                  name={"Importer"}
                  bgColor={"#00C9FF"}
                  onClick={handleClickImport}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Tabs value={value} onChange={handleChange}
          TabIndicatorProps={{
            style: {
              width: 0
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab xs={12} sm={4} label="Informations" {...a11yProps(0)} disableRipple />
          <Tab xs={12} sm={4} label="Documents" {...a11yProps(1)} disableRipple />
          <Tab xs={12} sm={4} label="Résolutions" {...a11yProps(2)} disableRipple />
          <Tab xs={12} sm={4} label="Votes par correspondance" {...a11yProps(3)} disableRipple />
          <Tab xs={12} sm={4} label="Feuille de présence" {...a11yProps(4)} disableRipple />
          <Tab xs={12} sm={4} label="Salle de réunion" {...a11yProps(5)} disableRipple />
          <Tab xs={12} sm={4} label="Procès-verbal" {...a11yProps(6)} disableRipple />
        </Tabs>
      </div>
      <div className={classes.body}>
        <TabPanel value={value} index={0}>
          <Informations />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Documents />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Resolutions />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <PostalVotes />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TimeSheet />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <MeetingRoom />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Minutes />
        </TabPanel>
      </div>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    </div>
  );
};

export default withRouter(AssemblyEdit);
