import React, {useState } from 'react';
import '../assets/custom.css';
import { Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import theme from 'theme';
import Grid from '@material-ui/core/Grid';
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
    '& tbody tr:last-child td:first-child':{
      [theme.breakpoints.up('xl')]: {
        borderBottomLeftRadius: '30px',
      },
      [theme.breakpoints.between('lg','lg')]: {
        borderBottomLeftRadius: '21px',
      },
      [theme.breakpoints.between('md','md')]: {
        borderBottomLeftRadius: '15px',
      },
      [theme.breakpoints.between('sm','sm')]: {
        borderBottomLeftRadius: '11px',
      },
      [theme.breakpoints.down('sm')]: {
        borderBottomLeftRadius: '8px',
      },
    },
    '& tbody tr:last-child td:last-child':{
      [theme.breakpoints.up('xl')]: {
        borderBottomRightRadius: '30px',
      },
      [theme.breakpoints.between('lg','lg')]: {
        borderBottomRightRadius: '21px',
      },
      [theme.breakpoints.between('md','md')]: {
        borderBottomRightRadius: '15px',
      },
      [theme.breakpoints.between('sm','sm')]: {
        borderBottomRightRadius: '11px',
      },
      [theme.breakpoints.down('sm')]: {
        borderBottomRightRadius: '8px',
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
      // color: '#363636'
    },
    '& .MuiTableCell-root': {
      fontFamily:'Poppins',
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
});

export default function InvoiceTable  (props)  {
  const {onClickEdit, ...rest} = props;

  const classes = useStyles();
  const [cells,setCells] = useState(props.cells);
  const items = props.products;
  return ( 
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
                  <TableCell align="center" style={{justifyContent:'center'}}>
                    <img src="/images/pdf.png" className={classes.editItem} onClick={()=>props.onClickEdit(item.ID)}></img>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
  );
};
