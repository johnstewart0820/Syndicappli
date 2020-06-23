import React, { forwardRef, useState } from 'react';
import '../assets/custom.css';
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import theme from 'theme';
import MySelect from './MySelect';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import MyButton from './MyButton';
const useStyles = makeStyles({
  root: {
    borderRadius: '30px',
    boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    '& thead button': {
      background: 'transparent',
      outline: 'transparent',
      color: '#363636'
    },
    '& .MuiTableCell-root': {
      fontSize: 18
    }
  },
  body:{
    marginBottom: 16,
    '& .MuiPaginationItem-textPrimary.Mui-selected': {
      background: 'linear-gradient(90deg, #00b8d4 10%, #00bf82 90%)',
    },
    '& .MuiPaginationItem-root': {
      fontSize: 22,
      width: 47,
      height: 47,
      borderRadius: 24
    }
  },
  editItem: {
      color: '#006db3',
      '&:hover' :{
        cursor: 'pointer'
      },
  },
  hide: {
    visibility: 'hidden'
  },
  show: {
    visibility: 'visible'
  },
});
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
export default function ProductTable  (props)  {
  const {onClickEdit, ...rest} = props;

  const classes = useStyles();
  const{pages} = props;

  const [cells,setCells] = useState(props.cells);
  const {items, requestSort, sortConfig } = useSortableData(props.products);
  const [page , setPage] = useState(1);
  const [select, setSelect] = useState(20);

  const handleChange = (event,value)=>{
    setPage(value);
  }
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const dataList=[20, 50, 100, 200, "all"];

  const handleChangeSelect = (value) => {
    setSelect(dataList[value]);
    alert(select);
    //api call
  }

  return ( 
    <div >
      

      <Grid container direction="column" spacing={2}>
        <Grid item container direction="row-reverse">
          <MySelect color="#00b8d4" width="160px" data={dataList} onChangeSelect={handleChangeSelect}/>
        </Grid>
        <Grid item container >
          <Table className={classes.root}>
            <TableHead>
              <TableRow >
                {
                  cells.map((cell)=>(
                    <TableCell key={cell}>
                    <button
                      type="button"
                      onClick={() => requestSort(cell)}
                      className={getClassNamesFor(cell)}
                    >
                      {cell}
                    </button>
                  </TableCell>
                  ))
                }
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {
                  cells.map((cell,i)=>{
                    const value = item[cell];
                    return(
                    <TableCell key={cell}>

                      {value}
                  </TableCell>);
                  })
                  }
                  <TableCell align="right">
                      <EditIcon className={classes.editItem} onClick={()=>props.onClickEdit(item.id)}/>
                      &nbsp;&nbsp;
                      <DeleteIcon className={classes.editItem}></DeleteIcon>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className={props.tblFooter ? classes.show : classes.hide}>
              <TableRow >

              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
        <Grid item container justify="space-between" className={classes.body} alignItems="center">
          <Grid xs={6} item container className={props.leftBtn ? classes.show : classes.hide} >
            <MyButton name={props.leftBtn} color={"1"} />
          </Grid>
          <Grid xs={6} item container direction="row-reverse">
            <Pagination count={1} color="primary" page={page} onChange={handleChange} style={{fontSize:22}}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
