import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MyButton from 'components/MyButton';
import authService from 'services/authService.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { withRouter } from 'react-router-dom';
import useStyles from './useStyles';
import AdminService from 'services/api.js';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import { ManagerService as Service } from '../../../../../services/api.js';
const ManagerService = new Service();
const Documents = (props) => {
    const classes = useStyles();
    const { history } = props;
    const accessAssemblies = authService.getAccess('role_assemblies');
    const [visibleIndicator, setVisibleIndicator] = useState(false);
    const [docurl, setDocUrl] = React.useState("");
    const [doc, setDoc] = React.useState(null);
    const [doc_name, setDocName] = useState('');    
    const [currentAssemblyID, setAssemblyID] = useState(-1);
    const handleLoadDocument = (event) => {
        if (event.target.files[0].size > 5 * 1048576) {
            ToastsStore.warning('Document size should be low than 5 MB.');
        } else {
            setDoc(event.target.files[0]);
            setDocUrl(URL.createObjectURL(event.target.files[0]));
        }
    }
    const handleDragOverDocument = (event)=>{
        event.preventDefault();
        return false;
    }
    const handleDropDocument = (event)=>{
        event.preventDefault();
        if (event.dataTransfer.files[0] !== undefined) {
            if (event.dataTransfer.files[0].size > 5 * 1048576) {
                ToastsStore.warning('Document size should be low than 5 MB.');
            } else {
                setDoc(event.dataTransfer.files[0]);
                setDocUrl(URL.createObjectURL(event.dataTransfer.files[0]));
                setDocName(event.dataTransfer.files[0].name)
            }
        }
    }
    const handleClose = (k)=>{
        console.log("index =", k)
    }
    useEffect(() => {
        if (accessAssemblies !== 'denied') {
            getAssemblyIDInfo();
        }
    }, [docurl]);
    const getAssemblyIDInfo = () => {
        let url = window.location;
        let parts = url.href.split('/');
        const assemblyID = Number(parts[parts.length - 1]);
        setAssemblyID(assemblyID);
    }
    const handleClickAdd = () => {
        let form = {
            'assemblyID': currentAssemblyID,
            'file' : doc,
            'url' : docurl,
        }
        let formdata = new FormData();
        formdata.set('assemblyID', assemblyID);
        formdata.set('file', doc);
        formdata.set('url', docurl);
        console.log(formdata)
        setVisibleIndicator(true);
        ManagerService.createAssemblyFile(formdata)
        .then(
            response => {
                setVisibleIndicator(false);
                switch (response.data.code) {
                    case 200:
                        const data = response.data.data;
                        localStorage.setItem("token", JSON.stringify(data.token));
                        setDocUrl("");
                        break;
                    case 401:
                        authService.logout();
                        history.push('/login');
                        window.location.reload();
                        break;
                    default:
                        ToastsStore.error(response.data.message);
                }
            },
            error => {
                ToastsStore.error("Can't connect to the server!");
                setVisibleIndicator(false);
            }
        );
    }
    return (
        <div className={classes.root}>
            { visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null }
            <div className={classes.title}>
            </div>
            <div className={classes.body}>
                <Grid item container spacing={5} direction="column">
                    <Grid item>
                        <Grid item container direction="row" spacing={3}>
                            <Grid item>
                                <Grid item container direction="column">
                                    <Badge  
                                        key={0}
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                            border: '1px solid gray',
                                            padding: '1px 4px',
                                        }}
                                        badgeContent={<CloseIcon onClick={()=>handleClose(0)}
                                            className={classes.close}/>}
                                    >
                                        <div className={classes.documents}>
                                            <img className={classes.size} alt="" src='/images/pdf.png' />
                                        </div>
                                    </Badge>
                                    <p className={classes.doc_tip}>doc.pdf</p>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid item container direction="column">
                                    <Badge  
                                        key={1}
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                            border: '2px solid gray',
                                            padding: '1px 4px',
                                        }}
                                        badgeContent={<CloseIcon onClick={()=>handleClose(1)}
                                            className={classes.close}/>}
                                    >
                                        <div className={classes.documents}>
                                            <img src='/images/doc.png' className={classes.size} />
                                        </div>
                                    </Badge>
                                    <p className={classes.doc_tip}>doc.docx</p>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid item container direction="column">
                                    <Badge  
                                        key={2}
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                            border: '2px solid gray',
                                            padding: '1px 4px',
                                        }}
                                        badgeContent={<CloseIcon onClick={()=>handleClose(2)}
                                            className={classes.close}/>}
                                    >
                                        <div className={classes.documents}>
                                            <img src='/images/png.png' className={classes.sizepng} />
                                        </div>
                                    </Badge>
                                    <p className={classes.doc_tip}>doc.png</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3} direction="column">
                        <Grid item justify="center" container>
                            <p className={classes.uploadHelp}>Cliquez ou glissez pour déposer de nouveaux documents...</p>
                        </Grid>
                        <Grid item alignItems="center" justify="center" container>
                            <input 
                                className={classes.input} 
                                accept="*"
                                type="file" 
                                id="docpicker" 
                                onChange={accessAssemblies === 'see' ? handleLoadDocument : null } 
                            />
                            <label htmlFor="docpicker">
                                {
                                    docurl === '' ?
                                    <div  
                                        className={classes.img} 
                                        onDragOver={accessAssemblies === 'see' ? handleDragOverDocument : null} 
                                        onDrop={accessAssemblies === 'see' ? handleDropDocument : null}
                                    >
                                        <AddCircleOutlineIcon className={classes.plus} />
                                    </div>
                                    :
                                    <div>
                                        <img className={classes.img} src='/images/attachment.png' alt="" />
                                        <p className={classes.doc_name}>{doc_name}</p>
                                    </div>
                                }
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.footer} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Grid container justify="center">
                    <MyButton name={"Añadir"} color={"1"} onClick={handleClickAdd} />
                </Grid>
            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        </div>
    );
};

export default withRouter(Documents);
