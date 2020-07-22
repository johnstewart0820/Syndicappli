import React from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from '../../../components/MyButton';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AddUser from './AddUser';
import { withRouter } from 'react-router-dom';
import authService from '../../../services/authService.js';
import useStyles from './useStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Users from './Users';
import TrashUsers from './TrashUsers';

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
    //const token = authService.getToken();    
    // if (!token) {
    //   history.push("/admin/login");
    //   window.location.reload();
    // }

    const accessUsers = authService.getAccess('role_users');
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
        ToastsStore.success("Added New User successfully!");
        setRefresh(!refresh);
    };
    const handleClickAdd = () => {
        if (accessUsers === 'edit') {
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
                                <b>Mes Utilisateurs</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} container justify="flex-end" >
                        <Grid>
                            {
                                value === 0 ?
                                    <MyButton 
                                        name={"Nouvel Utilisateur"} 
                                        color={"1"} 
                                        onClick={handleClickAdd} 
                                        style={{ visibility: accessUsers === 'edit' ? 'visible' : 'hidden' }}
                                    />
                                    : <MyButton name={"Nouvel Utilisateur"} style={{ visibility: 'hidden' }} />
                            }
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <Grid item container className={classes.padding} >
                                    <Grid xs={12} item container direction="row-reverse"><CloseIcon onClick={handleClose} className={classes.close} /></Grid>
                                    <Grid xs={12} item ><p id="transition-modal-title" className={classes.modalTitle}><b>Nouvel Utilisateur</b></p></Grid>
                                </Grid>
                                <AddUser onCancel={handleClose} onAdd={handleAdd} refresh={refresh}/>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.tool}>
                <Tabs value={value} onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#363636"
                        }
                    }}
                >
                    <Tab xs={12} sm={4} label="Utilisateurs" {...a11yProps(0)} className={classes.tabTitle} />
                    <Tab xs={12} sm={4} label="Poubelle" {...a11yProps(1)} className={classes.tabTitle} />
                </Tabs>
            </div>
            <div className={classes.body}>
                <TabPanel value={value} index={0}>
                    <Users refresh={refresh} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TrashUsers />
                </TabPanel>
            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        </div>
    );
};

export default withRouter(Main);
