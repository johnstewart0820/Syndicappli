import React, { useEffect, useState } from 'react';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Grid from '@material-ui/core/Grid';
import MyButton from 'components/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MySelect from 'components/MySelect.js';
import { AddPostalVoteStyles as useStyles } from './useStyles';
import { withRouter } from 'react-router-dom';
import authService from 'services/authService';
import { Scrollbars } from 'react-custom-scrollbars';

const AddPostalVote = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [visibleIndicator, setVisibleIndicator] = useState(false);

  const [owner, setOwner] = useState(0);
  const [owners, setOwners] = useState(['']);

  const [errorsOwner, setErrorsOwner] = useState('');

  const handleChangeOwner = (val) => {
    setOwner(val);
  }
  const handleClose = () => {
    props.onCancel();
  };
  const handleClickAdd = () => {
    let cnt = 0;
    if (owners.length === 0) { setErrorsOwner('please select owner'); cnt++; }
    else setErrorsOwner('');
    if (cnt === 0) {
      // createBuilding();
    }
  };

  return (
    <Scrollbars style={{ height: '30vh' }}>
      <div className={classes.root}>
        {
          visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
        }
        <div className={classes.paper} >
          <Grid container spacing={4} xs={12} item>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item><p className={classes.title}>Copropriétaire</p></Grid>
              <Grid xs item container alignItems="stretch" direction="column">
                <MySelect
                  color="gray"
                  data={owners}
                  onChangeSelect={handleChangeOwner}
                  value={owner}
                />
                {errorsOwner.length > 0 &&
                  <span className={classes.error}>{errorsOwner}</span>}
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.footer}>
            <Grid container justify="space-between">
              <MyButton name={"Créer"} color={"1"} onClick={handleClickAdd} />
              <MyButton name={"Annuler"} bgColor="gray" onClick={handleClose} />
            </Grid>
          </div>
        </div>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
      </div>
    </Scrollbars>
  );
};

export default withRouter(AddPostalVote);
