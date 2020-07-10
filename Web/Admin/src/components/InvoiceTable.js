import React, {useState } from 'react';
import '../assets/custom.css';
import { Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import theme from 'theme';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      [theme.breakpoints.up('xl')]: {
        marginTop: 24,
      },
      [theme.breakpoints.between('lg','lg')]: {
        marginTop: 17,
      },
      [theme.breakpoints.down('md')]: {
        marginTop: 12,
      },
    },
  },
  input: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 17,
      height:33,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
      height:23,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 8,
      height:16,
    },
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #1499ff',
    color: '#1499ff',
    padding: '2px 12px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#1499ff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  margin: {
    width: props => props.width,
    '& .MuiSelect-select.MuiSelect-select': {
      borderColor: '#1499ff'
    },
    '& .MuiNativeSelect-icon': {
      color: '#1499ff'
    },
  },
  root: {
    boxShadow: '0px 3px 5px 2px rgba(182, 172, 251, .42)',
    '& tbody tr:last-child td':{
      borderBottom: 'none'
    },
    '& tfoot tr:last-child td':{
      borderBottom: 'none'
    },
    '& tbody tr:last-child td:first-child':{
        [theme.breakpoints.up('xl')]: {
          borderBottomLeftRadius: '30px',
        },
        [theme.breakpoints.between('lg','lg')]: {
          borderBottomLeftRadius: '21px',
        },
        [theme.breakpoints.down('md')]: {
          borderBottomLeftRadius: '15px',
        },
      },
      '& tbody tr:last-child td:last-child':{
        [theme.breakpoints.up('xl')]: {
          borderBottomRightRadius: '30px',
        },
        [theme.breakpoints.between('lg','lg')]: {
          borderBottomRightRadius: '21px',
        },
        [theme.breakpoints.down('md')]: {
          borderBottomRightRadius: '15px',
        },
      },
    '& thead tr:first-child th':{
      borderRadius:30,
    },
    [theme.breakpoints.up('xl')]: {
      marginBottom: 16,
      marginTop: 8,
      borderRadius: '30px',
    },
    [theme.breakpoints.between('lg','lg')]: {
      marginBottom: 11,
      marginTop: 6,
      borderRadius: '21px',
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: 8,
      marginTop: 4,
      borderRadius: '15px',
    },
    '& thead button': {
      background: 'transparent',
      outline: 'transparent',
      color: '#363636'
    },
    '& .MuiTableCell-root': {
      //  textAlign: 'center',
      [theme.breakpoints.up('xl')]: {
        fontSize :18,
        padding: 16
      },
      [theme.breakpoints.between('lg','lg')]: {
        fontSize :14,
        padding: 11
      },
      [theme.breakpoints.down('md')]: {
        fontSize :10,
        padding: 8
      },
    }
  },
  body:{
    [theme.breakpoints.up('xl')]: {
      marginBottom: 16,
    },
    [theme.breakpoints.between('lg','lg')]: {
      marginBottom: 11,
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: 8,
    },
    '& .MuiPaginationItem-textPrimary.Mui-selected': {
      background: 'linear-gradient(90deg, #00b8d4 10%, #00bf82 90%)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: '50%',
      [theme.breakpoints.up('xl')]: {
        fontSize: 22,
        width: 47 ,
        height: 47
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 15,
        width: 33,
        height: 33,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 11,
        width: '23',
        height: '23'
      },
    }
  },
  editItem: {
      color: 'red',
      '&:hover' :{
        cursor: 'pointer'
      },
      [theme.breakpoints.up('xl')]: {
        width: 32,
        height: 39
      },
      [theme.breakpoints.down('lg')]: {
        width: 22,
        height: 27
      },
      [theme.breakpoints.down('md')]: {
        width: 15,
        height: 19
      },
  },
  hide: {
    visibility: 'hidden'
  },
  show: {
    visibility: 'visible'
  },
});

export default function InvoiceTable  (props)  {
  const {onClickEdit, ...rest} = props;

  const classes = useStyles();
  const [cells,setCells] = useState(props.cells);
  const items = props.products;
  return ( 
      <Grid container direction="column" spacing={2}>
          <Table className={classes.root}>
            <TableHead>
              <TableRow >
                {
                  cells.map((cell,i)=>(
                    <TableCell key={i}>
                      {cell.field}
                    </TableCell>
                  ))
                }
                <TableCell align="center">Télécharger</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item,i) => (
                <TableRow key={item.ID}>
                  {
                  cells.map((cell)=>{
                    const value = item[cell.key];
                    return(
                    <TableCell  key={cell.key}>

                      {value}
                  </TableCell>);
                  })
                  }
                  <TableCell align="center" style={{display:'flex', justifyContent:'center'}}>
                    <img src="/images/pdf.png" className={classes.editItem} onClick={()=>props.onClickEdit(item.ID)}></img>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Grid>
  );
};
