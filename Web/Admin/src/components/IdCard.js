import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import { Avatar } from '@material-ui/core';
const useStyles = makeStyles((theme,props) => ({
  root: {
    '& .MuiTextField-root': {
        // width: '100%'
    },
    '& .MuiOutlinedInput-multiline':{
        padding: '3px 26px 3px 12px',
        fontSize: props=>props.font,
    },
    '& .MuiOutlinedInput-input':{
        padding: '3px 26px 3px 12px',
        fontSize: props=>props.font,
    },
    '& .MuiBadge-anchorOriginTopRightCircle':{
      top: props=>props.badgePos,
      right: props=>props.badgePos
    }
  },
  badge: {
    cursor: 'pointer',
    width: props=>props.badgeSize,
    height: props=>props.badgeSize,
    background: 'linear-gradient(0deg, #00C9FF 10%, #0CC77C 90%)',
    borderRadius: '50%',
    color: 'white',
  },
  identify: {
     alignItems: 'center',
     justifyContent: 'center',
     display: 'flex',
     border: '1px dashed rgba(112,112,112,0.43)',
     borderRadius: 8,
     width: props=>props.width,
     height: props=>props.height,
     marginTop: props=>props.badgePos,
     marginRight: props=>props.badgePos,
   },
}));

export default function IdCard(props) {
  const classes = useStyles(props);
  var idcard = props.idcardurls;
  const handleClose = (num)=> {
    props.onClose(num);
  }

  return (
    <div className={classes.root}>
      {
        idcard.map((idcardurl,i)=>(
            <Badge  
              overlap="circle"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                border: '2px solid gray',
                padding: '1px 4px',
              }}
              badgeContent={<CloseIcon onClick={() => handleClose(i)} className={classes.badge}/>}
            >
              <Avatar className={classes.identify} alt="" src={idcardurl} />
            </Badge>
        ))
      }  
    </div>     
  );
}