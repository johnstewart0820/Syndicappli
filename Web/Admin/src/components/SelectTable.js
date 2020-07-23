import React, { useState, useEffect } from 'react';
import '../assets/custom.css';
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import theme from 'theme';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import MyButton from './MyButton';
import { Checkbox } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      [theme.breakpoints.up('xl')]: {
        marginTop: 24,
      },
      [theme.breakpoints.between('lg', 'lg')]: {
        marginTop: 17,
      },
      [theme.breakpoints.between('md', 'md')]: {
        marginTop: 12,
      },
      [theme.breakpoints.between('sm', 'sm')]: {
        marginTop: 8,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 6,
      },
    },
  },
  input: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 17,
      height: 33,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
      height: 23,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 8,
      height: 16,
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
      'Poppins',
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
    '& tbody tr:last-child td': {
      borderBottom: 'none'
    },
    '& tfoot tr:last-child td': {
      borderBottom: 'none'
    },
    '& tbody tr:last-child td:first-child': {
      [theme.breakpoints.up('xl')]: {
        borderBottomLeftRadius: '30px',
      },
      [theme.breakpoints.between('lg', 'lg')]: {
        borderBottomLeftRadius: '21px',
      },
      [theme.breakpoints.between('md', 'md')]: {
        borderBottomLeftRadius: '15px',
      },
      [theme.breakpoints.between('sm', 'sm')]: {
        borderBottomLeftRadius: '11px',
      },
      [theme.breakpoints.down('sm')]: {
        borderBottomLeftRadius: '8px',
      },
    },
    '& tbody tr:last-child td:last-child': {
      [theme.breakpoints.up('xl')]: {
        borderBottomRightRadius: '30px',
      },
      [theme.breakpoints.between('lg', 'lg')]: {
        borderBottomRightRadius: '21px',
      },
      [theme.breakpoints.between('md', 'md')]: {
        borderBottomRightRadius: '15px',
      },
      [theme.breakpoints.between('sm', 'sm')]: {
        borderBottomRightRadius: '11px',
      },
      [theme.breakpoints.down('sm')]: {
        borderBottomRightRadius: '8px',
      },
    },
    '& thead tr:first-child th': {
      borderRadius: 30,
    },
    [theme.breakpoints.up('xl')]: {
      marginBottom: 16,
      marginTop: 8,
      borderRadius: '30px',
    },
    [theme.breakpoints.between('lg', 'lg')]: {
      marginBottom: 11,
      marginTop: 6,
      borderRadius: '21px',
    },
    [theme.breakpoints.between('md', 'md')]: {
      marginBottom: 8,
      marginTop: 4,
      borderRadius: '15px',
    },
    [theme.breakpoints.between('sm', 'sm')]: {
      marginBottom: 6,
      marginTop: 3,
      borderRadius: '11px',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 4,
      marginTop: 2,
      borderRadius: '8px',
    },
    '& thead button': {
      background: 'transparent',
      outline: 'transparent',
      color: '#363636'
    },
    '& .MuiTableCell-root': {
      //  textAlign: 'center',
      [theme.breakpoints.up('xl')]: {
        fontSize: 18,
        padding: 16
      },
      [theme.breakpoints.between('lg', 'lg')]: {
        fontSize: 14,
        padding: 11
      },
      [theme.breakpoints.between('md', 'md')]: {
        fontSize: 10,
        padding: 8
      },
      [theme.breakpoints.between('sm', 'sm')]: {
        fontSize: 7,
        padding: 6
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 5,
        padding: 5
      },
    }
  },
  body: {
    [theme.breakpoints.up('xl')]: {
      marginBottom: 16,
    },
    [theme.breakpoints.between('lg', 'lg')]: {
      marginBottom: 11,
    },
    [theme.breakpoints.between('md', 'md')]: {
      marginBottom: 8,
    },
    [theme.breakpoints.between('sm', 'sm')]: {
      marginBottom: 6,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 4,
    },
    '& .MuiPaginationItem-textPrimary.Mui-selected': {
      background: 'linear-gradient(90deg, #00b8d4 10%, #00bf82 90%)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: '50%',
      [theme.breakpoints.up('xl')]: {
        fontSize: 22,
        width: 47,
        height: 47
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 15,
        width: 33,
        height: 33,
      },
      // [theme.breakpoints.down('md')]: {
      //   fontSize: 11,
      //   width: '23 !important',
      //   height: '23 !important'
      // },
      // [theme.breakpoints.down('sm')]: {
      //   fontSize: 8,
      //   width: 16,
      //   height:16
      // },
    }
  },
  editItem: {
    color: '#1499ff',
    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.up('xl')]: {
      width: 23,
      height: 23
    },
    [theme.breakpoints.down('lg')]: {
      width: 16,
      height: 16
    },
    [theme.breakpoints.down('md')]: {
      width: 11,
      height: 11
    },
    [theme.breakpoints.down('sm')]: {
      width: 8,
      height: 8
    },
  },
  hide: {
    visibility: 'hidden'
  },
  show: {
    visibility: 'visible'
  },
});

export default function SelectTable(props) {
  const { onClickEdit, ...rest } = props;

  const classes = useStyles();
  const [direction, setDirection] = useState(props.columns);
  const tempDirection = props.columns;
  let tempDirect = [];
  // let selectList = [];
  const [selectList, setSelectList] = useState([]);
  if (tempDirection) {
    for (let i = 0; i < tempDirection.length; i++)
      tempDirect[i] = ' ˅';
  }
  const allData = 3;
  const [cells, setCells] = useState(props.cells);
  const [items, setItems] = useState([]);
  const footer = props.footerItems ? props.footerItems : [];
  const [direct, setDirect] = React.useState(tempDirect);
  const dataList = [20, 50, 100, 200, "all"];

  const [value, setValue] = React.useState(0);
  useEffect(() => {
    setItems(props.products)
  });
  const handleChange = (event) => {
    props.onChangeSelect(event.target.value);
    setValue(event.target.value);
  };
  const handleChangeSelect = (event, id) => {
    let mItems = [...items];
    if(selectList.length === allData){
      selectList.splice(0,allData);
      selectList.push(-1);
    }else{
        if(selectList.length === 1 && selectList[0] === -1)
          selectList.splice(0,1);
        if (event.target.checked === true) {
          selectList.push(mItems[id].userID);
        }
        else {
          selectList.splice(selectList.indexOf(mItems[id].userID), 1);
        }
    }
    setSelectList(selectList);
    mItems[id].isChecked = event.target.checked;
    setItems(mItems);
  };
  const handleChangePage = (event, page) => {
    props.onChangePage(page);
  };
  const Sort = (index = 0) => {
    if (direction[index] === 'asc') {
      tempDirection[index] = 'desc';
      tempDirect[index] = ' ˄';
      setDirect(tempDirect);
      setDirection(tempDirection);
    } else {
      tempDirection[index] = 'asc';
      tempDirect[index] = ' ˅';
      setDirect(tempDirect);
      setDirection(tempDirection);
    }

    props.onSelectSort(index, direction[index]);
  }
  const handleClickAllSelect = () => {
    let mItems = [...items];
    if (selectList.length === 1 && selectList[0] === -1) {
      selectList.splice(0, selectList.length);
      for (let i = 0; i < mItems.length; i++) {
        mItems[i].isChecked = false;
      }
    }
    else if (selectList.length !== allData) {
      selectList.splice(0,selectList.length);
      selectList[0] = -1;
      for (let i = 0; i < mItems.length; i++) {
        mItems[i].isChecked = true;
      }
    }
    setItems(mItems);
    setSelectList(selectList);
  }
  const handleClickImport = () => {
    props.onImport();
  }
  const handleClickExport = () => {
    props.onExport(selectList);
  }
  const Value = (val)=>{
    switch(val){
      case 'active' : return 'actif'; 
      case 'inactive' : return 'inactif'; 
      case 'owner' : return 'Copropriétaire'; 
      case 'subaccount' : return 'Sous-compte'; 
      case 'member' : return 'member of the council'; 
      default: return val; 
    }
  }
  const handleClickEdit = (id) => {
    if(props.type === 'owner'){
      props.onClickEdit(items[id].ID,items[id].buildingID);
    }else{
      props.onClickEdit(items[id].ID);
    }
  }
  const handleClickDelete = (id) => {
    if(props.type === 'owner'){
      props.onClickDelete(items[id].ID,items[id].buildingID);
    }else{
      props.onClickDelete(items[id].ID);
    }
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2} direction="row">
        <Grid item>
          <MyButton name={"Tout sélectionner/déselectionner"} bgColor={"#00C9FF"} onClick={handleClickAllSelect} />
        </Grid>
        <Grid item>
          <MyButton name={"Importer"} bgColor={"#00C9FF"} onClick={handleClickImport} />
        </Grid>
        <Grid item>
          <MyButton name={"Exporter"} bgColor={"#00C9FF"} onClick={handleClickExport} />
        </Grid>
      </Grid>
      <Grid item container direction="row-reverse">
        <div>
          <FormControl className={classes.margin}>
            <NativeSelect
              value={value}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              {
                dataList.map((select, i) =>
                  <option value={i} key={select}>Voir {select}</option>
                )}
            </NativeSelect>
          </FormControl>
        </div>
      </Grid>
      <Grid item container >
        <Table className={classes.root}>
          <TableHead>
            <TableRow >
              {
                <TableCell align="center"></TableCell>
              }
              {
                cells.map((cell, i) => (
                  <TableCell key={i}>
                    <button
                      type="button"
                      onClick={() => Sort(i)}
                    >
                      {cell.field}
                    </button>
                    <i style={{ fontStyle: 'normal' }}>{direct[i]}</i>

                  </TableCell>
                ))
              }
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i}>
                {
                  <TableCell key={i}>
                    <Checkbox
                      checked={item.isChecked}
                      onChange={(event) => handleChangeSelect(event, i)}
                    />
                  </TableCell>
                }
                {
                  cells.map((cell) => {
                    const value = item[cell.key];
                    return (
                      <TableCell 
                        key={cell.key} 
                        onClick={() => handleClickEdit(i)} 
                        disabled={(props.access === 'see' ? true : false)}
                      >

                        {
                          Value(value)
                        }
                      </TableCell>);
                  })
                }
                <TableCell align="right">
                  <EditIcon 
                    className={classes.editItem} 
                    onClick={() => handleClickEdit(i)} 
                    disabled={(props.access === 'see' ? true : false)}
                  />
                      &nbsp;&nbsp;
                  <DeleteIcon 
                    className={classes.editItem} 
                    onClick={() => handleClickDelete(i)}
                    disabled={(props.access === 'see' ? true : false)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className={(props.tblFooter === 'true' || items.length === 0) ? classes.show : classes.hide}>
            {
              items.length === 0 ?
                <TableRow>
                  <TableCell colSpan="100%" style={{ textAlign: 'center' }}>{'Aucune donnée trouvée'}</TableCell>
                </TableRow>
                :
                <TableRow>
                  {
                    footer.map((footerItem, i) => {
                      return (
                        <TableCell key={i}>
                          {footerItem}
                        </TableCell>
                      );
                    })
                  }
                </TableRow>
            }
          </TableFooter>
        </Table>
      </Grid>
      <Grid item container className={classes.body} alignItems="center">
        <Grid xs={12} item container direction="row-reverse">
          <Pagination
            count={props.totalpage}
            color="primary"
            page={props.page}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
