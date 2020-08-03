import React, { useState, useEffect } from 'react';
import authService from 'services/authService.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { withRouter } from 'react-router-dom';
import { DocumentsStyles as useStyles } from './useStyles';

const Resolutions = (props) => {
    const classes = useStyles();
    const { history } = props;
    const accessAssemblies = authService.getAccess('role_assemblies');
    const [visibleIndicator, setVisibleIndicator] = useState(false);

    return (
        <div>
            {
                visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
            }
            <div className={classes.title}>
            </div>
            <div className={classes.body}>

            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        </div>
    );
};

export default withRouter(Resolutions);
