import React, {useState } from 'react';
import '../assets/custom.css';
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import theme from 'theme';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import MyButton from './MyButton';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 17,
    padding: '2px 26px 2px 12px',
    height:33,
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
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  margin: {
    width: props => props.width,
    '& .MuiSelect-select.MuiSelect-select': {
      borderColor: props => props.color
    },
    '& .MuiSelect-icon': {
      color: props => props.color
    },
  },
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

export default function ProductTable  (props)  {
  const {onClickEdit, ...rest} = props;

  const classes = useStyles();
  const [direction , setDirection] = useState(props.columns);
  const tempDirection = props.columns;
  let tempDirect=[];
  if(tempDirection){
    for(let i =0;i<tempDirection.length; i++)
      tempDirect[i] = '⯆';
  }
  const [cells,setCells] = useState(props.cells);
  const items = props.products;
  const footer = props.footerItems ? props.footerItems: [];
  const [open, setOpen] = React.useState(false);
  const [direct, setDirect] = React.useState(tempDirect);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dataList=[20, 50, 100, 200, "all"];

  console.log(props.tblFooter);
  const [value, setValue] = React.useState(0);
  const handleChange = (event) => {
    props.onChangeSelect(event.target.value);
    setValue(event.target.value);
  };
  const handleChangePage = (event, page) => {
    props.onChangePage(page);
    console.log(page);
  };
  const Sort = (index=0 )=>{
    if(direction[index] === 'asc'){
      tempDirection[index] = 'desc';
      tempDirect[index] = '⯅';
      setDirect(tempDirect);
      setDirection(tempDirection);
    }else{
      tempDirection[index] = 'asc';
      tempDirect[index] = '⯆';
      setDirect(tempDirect);
      setDirection(tempDirection);
    }

    props.onSelectSort(index, direction[index]);
  }
  return ( 
    <div >
      <Grid container direction="column" spacing={2}>
        <Grid item container direction="row-reverse">
          <div>
            <FormControl className={classes.margin}>
              <NativeSelect
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={value}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                {
                  dataList.map((select, i) =>
                    <option  value={i} key={select}>Voir {select}</option>
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
                  cells.map((cell,i)=>(
                    <TableCell key={i}>
                    <button
                      type="button"
                      onClick={() => Sort(i)}
                    >
                      {cell.field}
                    </button>
                      <i style={{fontStyle:'normal'}}>{direct[i]}</i>

                  </TableCell>
                  ))
                }
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.userID}>
                  {
                  cells.map((cell,i)=>{
                    const value = item[cell.key];
                    return(
                    <TableCell key={cell.key} onClick={()=>props.onClickEdit(item.adminID)}>

                      {value}
                  </TableCell>);
                  })
                  }
                  <TableCell align="right">
                      <EditIcon className={classes.editItem} onClick={()=>props.onClickEdit(item.adminID)}/>
                      &nbsp;&nbsp;
                      <DeleteIcon className={classes.editItem} onClick={()=>props.onClickDelete(item.adminID)}></DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className={(props.tblFooter === 'true' || items.length === 0) ? classes.show : classes.hide}>
              {
                items.length === 0 ?
                  <TableRow>
                    <TableCell colSpan="100%" style={{ textAlign: 'center'}}>{'No datas found'}</TableCell>
                  </TableRow>
                :
                <TableRow>
                  {
                    footer.map((footerItem,i)=>{
                      return(
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
        <Grid item container  className={classes.body} alignItems="center">
          <Grid xs={6} item container className={props.leftBtn ? classes.show : classes.hide} >
            <MyButton name={props.leftBtn} color={"1"} />
          </Grid>
          <Grid xs={6} item container direction="row-reverse">
            <Pagination 
              count={props.totalpage} 
              color="primary" 
              page={props.page} 
              onChange={handleChangePage} 
              style={{fontSize:22}}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
