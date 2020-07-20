import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {withRouter } from 'react-router-dom';
const ResponsiveDialog= (props)=> {
  const {history}=props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(props.open);
  var content = '';
  switch(props.role){
    case 'see': content="you can only see"; break;
    case 'denied': content = "you can't access"; break;
  }
  React.useEffect(()=>{
    if(props.role !== 'edit'){
      setOpen(props.open);
    }
  },[props.role]);
  const handleClose = () => {
    setOpen(false);
    if(props.role ==='denied'){
      props.onClose(false);

      history.goBack();
    }
    if(props.role === 'see')
      props.onClose(false);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default withRouter(ResponsiveDialog);