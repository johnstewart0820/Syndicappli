import React from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddManager from './AddManager';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import useStyles from './useStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Managers from './Managers';
import TrashManagers from './TrashManagers';
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
const Main = (props) => {
    const { history } = props;
    const token = authService.getToken();
    if (!token) {
        window.location.replace("/login");
    }
    const accessManagers = authService.getAccess('role_managers');
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        ToastsStore.success("Added New Manager successfully!");
        setRefresh(!refresh);
    };
    const handleClickAdd = () => {
        if (accessManagers === 'edit') {
            setOpen(true);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Grid item container justify="space-around" alignItems="center">
                    <Grid item xs={12} sm={6} container justify="flex-start" >
                        <Grid item>
                            <Typography variant="h2" className={classes.titleText}>
                                <b>Mes Gestionnaires</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} container justify="flex-end" >
                        <Grid>
                            {
                                value === 0 ?
                                    <MyButton
                                        name={"Nouveau Gestionnaires"}
                                        color={"1"}
                                        onClick={handleClickAdd}
                                        style={{ visibility: accessManagers === 'edit' ? 'visible' : 'hidden' }}
                                    />
                                    : <MyButton name={"Nouveau Gestionnaires"} style={{ visibility: 'hidden' }} />
                            }
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                classes={{ paper: classes.paper }}
                            >
                                <Grid item container className={classes.padding} justify="space-between">
                                    <Grid item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close} /></Grid>
                                    <Grid item><h2 id="transition-modal-title" className={classes.modalTitle}>Nouveau Gestionnaire</h2></Grid>
                                </Grid>
                                <AddManager onCancel={handleClose} onAdd={handleAdd} refresh={refresh} />
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.tool}>
                <Tabs value={value} onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                            width: 0,
                        }
                    }}
                >
                    <Tab xs={12} sm={4} label="Gestionnaires" {...a11yProps(0)} className={classes.tabTitle} disableRipple/>
                    <Tab xs={12} sm={4} label="Poubelle" {...a11yProps(1)} className={classes.tabTitle} disableRipple/>
                </Tabs>
            </div>
            <div className={classes.body}>
                <TabPanel value={value} index={0}>
                    <Managers refresh={refresh} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TrashManagers />
                </TabPanel>
            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        </div>
    );
};

export default withRouter(Main);
