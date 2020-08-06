import React, { useState, useEffect } from 'react';
import authService from 'services/authService.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import { withRouter } from 'react-router-dom';
import { EditPostalVoteStyles as useStyles } from './useStyles';
import { Grid } from '@material-ui/core';
import DecisionCard from './compoment/DecisionCard';
const EditPostalVote = (props) => {
    const classes = useStyles();
    const { history } = props;
    const accessAssemblies = authService.getAccess('role_assemblies');
    const [visibleIndicator, setVisibleIndicator] = useState(false);

    return (
        <div className={classes.root}>
            {
                visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
            }
            <div className={classes.title}>
            </div>
            <div className={classes.body}>
                <Grid item container direction="column" spacing={1} className={classes.editHeader}>
                    <Grid item>
                        <p className={classes.headerTitle}><b>Jean Dupont</b></p>
                    </Grid>
                    <Grid item>
                        <p className={classes.subTitle}>7 rue Berlioz, 75012 Paris</p>
                    </Grid>
                    <Grid item>
                        <p className={classes.subTitle}><b>Lots 126, 47</b></p>
                    </Grid>
                </Grid>

                <DecisionCard
                    decision_number={1}
                    decision_name={'Installation clôture'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan mauris risus, ut tincidunt augue dictum eu. Donec molestie nibh purus, non sollicitudin nisl condimentum vitae. Suspendisse vehicula laoreet ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan mauris risus, ut tincidunt augue dictum eu. Donec molestie nibh purus, non sollicitudin nisl condimentum vitae. Suspendisse vehicula laoreet ullamcorper. '}
                    calc_mode={'Majorité simple - Art. 24'}
                    vote_branch={'Clef 1'}
                    apartment_amount={'300/1500'}
                    vote_result={'Pour'}
                />

                <DecisionCard
                    decision_number={2}
                    decision_name={'Peinture parking'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan mauris risus, ut tincidunt augue dictum eu. Donec molestie nibh purus, non sollicitudin nisl condimentum vitae. Suspendisse vehicula laoreet ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan mauris risus, ut tincidunt augue dictum eu. Donec molestie nibh purus, non sollicitudin nisl condimentum vitae. Suspendisse vehicula laoreet ullamcorper. '}
                    calc_mode={'Majorité simple - Art. 25'}
                    vote_branch={'Clef 2'}
                    apartment_amount={'300/1500'}
                    vote_result={'Pour'}
                />
            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        </div>
    );
};

export default withRouter(EditPostalVote);
