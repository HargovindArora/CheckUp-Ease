import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {Covidnav} from "../views/Covidnav"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Covid = () => {
    const classes=useStyles()
    const [image, setImage] = useState(0)
    const [prediction, setPrediction] = useState("")

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };
    const history = useHistory();
    const handler = (e) => {
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

    const handleSubmit = (e) => {

        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image', image);
        let url = '/api/predict_covid';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${window.localStorage.getItem('key')}`
            }
        }).then(res => {
            console.log(res.data.Prediction);
            setPrediction(res.data.Prediction)
        })
            .catch(err => console.log(err))
    };
    if (prediction != "") {
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
    This is an error alert — <strong>check it out!</strong>
        </Alert>
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
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/profile" class="nav-link d-sm-flex align-items-sm-center" href="#">
                                <strong class="d-none d-sm-block ms-1">Profile</strong>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
           <Covidnav />
            <div class="content">
            <h1 variant="secondary">Covid 19 Prediction</h1><br></br>
                <form onSubmit={handleSubmit}>
                    <p>
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg" onChange={handleImageChange} required />
                    </p>
                    <button type="submit" class="btn btn-success">Submit</button>
                </form><br></br>
                <div className="Covid-19">{prediction === "Covid-19" ? <p>  <Alert severity="error" style={{fontSize:"20px"}}>
                    <AlertTitle>Get immediate checkup by doctor</AlertTitle>
                    <strong>Covid 19</strong>
                </Alert></p> : null}</div>
                <div className="Normal">{prediction === "Normal" ? <p>  <Alert severity="success" style={{fontSize:"20px"}}>
                    <AlertTitle>No need to worry</AlertTitle>
                    <strong>Normal</strong>
                </Alert></p> : null}</div>
                <div className="Pneumonia">{prediction === "Pneumonia" ? <p>  <Alert severity="info" style={{fontSize:"20px"}}>
                    <AlertTitle>Need to get an appointment with doctor early stage of Pneumonia</AlertTitle>
                    <strong>Pneumonia</strong>
                </Alert></p> : null}</div>
            </div>
        </div>
    );
}