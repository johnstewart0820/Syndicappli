import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
  },
  title:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  titleText: {
    [theme.breakpoints.up('xl')]: {
      fontSize :35
    },
    [theme.breakpoints.down('lg')]: {
      fontSize :25
    },
    [theme.breakpoints.down('md')]: {
      fontSize :18
    },
    [theme.breakpoints.down('sm')]: {
      fontSize :13
    },
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
    [theme.breakpoints.down('sm')]: {
      fontSize :10
    },
  },

  tool: {
    [theme.breakpoints.up('xl')]: {
      minHeight: 67
    },
    [theme.breakpoints.down('lg')]: {
      minHeight: 47
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 33
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 23
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  padding: {
    [theme.breakpoints.up('xl')]: {
      padding: 32
    },
    [theme.breakpoints.down('lg')]: {
      padding: 22
    },
    [theme.breakpoints.down('md')]: {
      padding: 15
    },
    [theme.breakpoints.down('sm')]: {
      padding: 11
    },
  },
  close: {
    color: 'gray'
  }
}));

export const AddOrderStyles = makeStyles(theme => ({
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: 30,
    },
  },
  root: {
      '& .MuiOutlinedInput-input':{
          [theme.breakpoints.up('xl')]: {
            padding: '8px 12px',
            fontSize: 17
          },
          [theme.breakpoints.down('lg')]: {
            padding: '6px 8px',
            fontSize: 12
          },
          [theme.breakpoints.down('md')]: {
            padding: '4px 6px',
            fontSize: 8
          },
          [theme.breakpoints.down('sm')]: {
            padding: '3px 4px',
            fontSize: 6
          },
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
    [theme.breakpoints.down('sm')]: {
      width:11 , 
      height: 11,
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
      [theme.breakpoints.down('sm')]: {
        width: 40,
        height: 32,
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
    [theme.breakpoints.down('sm')]: {
      fontSize: 6,
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
      [theme.breakpoints.down('sm')]: {
        fontSize: 6,
      },
  }
}));
  export default useStyles;