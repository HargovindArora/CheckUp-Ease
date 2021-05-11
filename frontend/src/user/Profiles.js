import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography'
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios'
import {useHistory,Link} from 'react-router-dom'
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};






const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export const  Profiles=() => {

    const [name,setName]=useState("")
      const [predictions,setPredictions]=useState([])
      const history=useHistory();

      const handler=(e)=>{
          Axios({
              method: 'post',
              url: '/api/logout',
              headers: { Authorization: `Bearer ${window.localStorage.getItem('key')}` }
            }).then((response) => {
              console.log(response);
              history.push("/")
            }, (error) => {
              console.log(error);
            });
            e.preventDefault()
      }

      useEffect(() => {
        Axios({
            method: 'get',
            url: '/api/profile',
            headers:{Authorization: `Bearer ${window.localStorage.getItem('key')}`},
          }).then((response) => {
            console.log(response);
            setName(response.data.profile.name)
            setPredictions(response.data.profile.predictions)
          }, (error) => {
            console.log(error);
          });
      },[])
      console.log(predictions)
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, predictions.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayDesktop = (name) => {
    return <Toolbar>Hi {name}</Toolbar>;
  }

  return (
      <div>
          <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CheckUpEase</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/dashboard">Home</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a onClick={handler}><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
                    </ul>
                </div>
            </nav>
            <header style={{backgroundColor:"#002F87" , color:"white"}}>
                {displayDesktop(name)}
            </header>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
            <TableRow>
              <TableCell style={{fontSize:20 }}>Prediction Type</TableCell>
              <TableCell align="right" style={{fontSize:20}}>Prediction</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? predictions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : predictions
          ).map((prediction) => (
            <TableRow key={prediction.prediction_type}>
              <TableCell component="th" scope="row" style={{fontSize:10}}>
                {prediction.prediction_type}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right" style={{fontSize:10}}>
                {prediction.prediction}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={predictions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}