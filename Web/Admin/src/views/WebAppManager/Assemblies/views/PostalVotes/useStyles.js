import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({

  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  div_indicator: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    paddingLeft: '35%',
    alignItems: 'center',
    marginTop: '-60px',
    zIndex: 999,
  },
  indicator: {
    color: 'gray'
  },
    paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 15,
    width: 500
  },
  padding: {
    padding: theme.spacing(2, 4, 3),
  },
  close: {
    cursor: 'pointer',
    color: 'gray'
  },
  modalTitle: {
    [theme.breakpoints.up('xl')]: {
      fontSize :28
    },
    [theme.breakpoints.down('lg')]: {
      fontSize :20
    },
    [theme.breakpoints.down('md')]: {
      fontSize :14
    },
  },
}));
export const AddPostalVoteStyles = makeStyles(theme => ({
  paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 5,
      padding: theme.spacing(2, 4, 3),
  },
  footer: {
    [theme.breakpoints.up('xl')]: {
      paddingTop: 89,
    },
    [theme.breakpoints.down('lg')]: {
      paddingTop: 62,
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 43,
    },
    paddingBottom: 30
  },
  root: {
      '& .MuiOutlinedInput-input':{
        [theme.breakpoints.up('xl')]: {
          padding: '17px 25px',
          fontSize: 22,
        },
        [theme.breakpoints.down('lg')]: {
          padding: '12px 18px',
          fontSize: 15,
        },
        [theme.breakpoints.down('md')]: {
          padding: '8px 13px',
          fontSize: 11,
        },
      },
      '& .MuiOutlinedInput-multiline':{
        padding: 0
      },
      '& p':{
          marginBottom: 0
      },
  },
  plus:{
    color: '#707070',
    [theme.breakpoints.up('xl')]: {
      width:31 , 
      height: 31,
    },
    [theme.breakpoints.down('lg')]: {
      width:22 , 
      height: 22,
    },
    [theme.breakpoints.down('md')]: {
      width:15 , 
      height: 15,
    },
  },
  input: {
      display: 'none'
  },
  img: {
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      border: '1px dashed rgba(112,112,112,0.43)',
      borderRadius: 8,
      [theme.breakpoints.up('xl')]: {
        width: 116,
        height: 92,
      },
      [theme.breakpoints.down('lg')]: {
        width: 81,
        height: 64,
      },
      [theme.breakpoints.down('md')]: {
        width: 57,
        height: 45,
      },
  },
  title:{
    [theme.breakpoints.up('xl')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 13,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 9,
    },
  },
  error:{
      color: 'red',
      [theme.breakpoints.up('xl')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 13,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 9,
      },
  },
  div_indicator: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    paddingLeft: '50%',
    alignItems: 'center',
    marginTop: '-60px',
    zIndex: 999,
  },
  indicator: {
    color: 'gray'
  },
}));
export const ResolutionsStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      marginTop: 64,
      marginBottom: 64,
      padding: 40,
      borderRadius: 30,
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: 45,
      marginBottom: 45,
      padding: 28,
      borderRadius: 21,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 32,
      marginBottom: 32,
      padding: 20,
      borderRadius: 15,
    },
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  doc_tip:{
    [theme.breakpoints.up('xl')]: {
      fontSize :13
    },
    [theme.breakpoints.down('lg')]: {
      fontSize :9
    },
    [theme.breakpoints.down('md')]: {
      fontSize :6
    },
    textAlign: 'center'
  },
  doc_name:{
    [theme.breakpoints.up('xl')]: {
      fontSize :18
    },
    [theme.breakpoints.down('lg')]: {
      fontSize :13
    },
    [theme.breakpoints.down('md')]: {
      fontSize :9
    },
    textAlign: 'center',
    color: 'gray',
  },
  close: {
    cursor: 'pointer',
    [theme.breakpoints.up('xl')]: {
      width: 35,
      height: 35,
      marginRight: -28
    },
    [theme.breakpoints.down('lg')]: {
      width: 25,
      height: 25,
      marginRight: -20
    },
    [theme.breakpoints.down('md')]: {
      width: 18,
      height: 18,
      marginRight: -14
    },
    backgroundColor: '#eeeeee',
    borderRadius: '50%',
    color: '#212121',
    padding: 3
  },
  div_indicator: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    paddingLeft: '35%',
    alignItems: 'center',
    marginTop: '-60px',
    zIndex: 999,
  },
  indicator: {
    color: 'gray'
  },
  documents: {
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    border: '1px solid rgba(112,112,112,0.43)',
    borderRadius: 8,
    [theme.breakpoints.up('xl')]: {
      width: 152,
      height: 120,
      marginTop: 20,
    },
    [theme.breakpoints.down('lg')]: {
      width: 106,
      height: 84,
      marginTop: 14,
    },
    [theme.breakpoints.down('md')]: {
      width: 74,
      height: 59,
      marginTop: 10,
    },
  },
  sizepng: {
    [theme.breakpoints.up('xl')]: {
      width: 152,
      height: 120,
    },
    [theme.breakpoints.down('lg')]: {
      width: 106,
      height: 84,
    },
    [theme.breakpoints.down('md')]: {
      width: 74,
      height: 59,
    },
  },
  size: {
    [theme.breakpoints.up('xl')]: {
      width: 53,
      height: 65,
    },
    [theme.breakpoints.down('lg')]: {
      width: 37,
      height: 46,
    },
    [theme.breakpoints.down('md')]: {
      width: 26,
      height: 32,
    },
  },
  uploadHelp: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
      width: 330,
      height: 58,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 14,
      width: 231,
      height: 41,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 10,
      width: 162,
      height: 29,
    },
    color: 'gray',
    textAlign: 'center'
  },
  plus:{
    color: 'rgb(54,54,54,0.25)',
    [theme.breakpoints.up('xl')]: {
      width:88 , 
      height: 88,
    },
    [theme.breakpoints.down('lg')]: {
      width:62 , 
      height: 62,
    },
    [theme.breakpoints.down('md')]: {
      width:43 , 
      height: 43,
    },
  },
  img: {
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    border: '1px dashed rgba(112,112,112,0.43)',
    borderRadius: 8,
    [theme.breakpoints.up('xl')]: {
      width: 330,
      height: 265,
    },
    [theme.breakpoints.down('lg')]: {
      width: 231,
      height: 186,
    },
    [theme.breakpoints.down('md')]: {
      width: 162,
      height: 130,
    },
  },
  input: {
    display: 'none',
    '&: hover':{
      color: '#f00',
	borderColor: '#f00',
	borderStyle: 'solid',
	boxShadow: 'inset 0 3px 4px #888',
    }
  }, 
}));
  export default useStyles;