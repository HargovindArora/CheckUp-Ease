import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

  
  export const Profile=()=> {
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

    const classes = useStyles();
  
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
            <Typography variant="h1" component="h2">
               {name}
           </Typography>
      <TableContainer component={Paper}  style={{ width: 800 }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Prediction Type</TableCell>
              <TableCell align="right">Prediction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.map((prediction) => (
              <TableRow key={prediction.prediction_type}>
                <TableCell component="th" scope="row">
                  {prediction.prediction_type}
                </TableCell>
                <TableCell align="right">{prediction.prediction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }