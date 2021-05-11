import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab';

export const Covid = () => {
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
            <div class="sidenav">
                <ul>
                    <li>Upload lung CT scan image or X ray image</li>
                </ul>
            </div>
            <div class="content">
                <h1 className="hm" class="p-3 mb-2 bg-info text-white">Covid 19 Prediction</h1><br></br>
                <form onSubmit={handleSubmit}>
                    <p>
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg" onChange={handleImageChange} required />
                    </p>
                    <button type="submit" class="btn btn-success">Submit</button>
                </form><br></br>
                <div className="Covid-19">{prediction === "Covid-19" ? <p>  <Alert severity="error">
                    <AlertTitle>Get immediate checkup by doctor</AlertTitle>
                    <strong>Covid 19</strong>
                </Alert></p> : null}</div>
                <div className="Normal">{prediction === "Normal" ? <p>  <Alert severity="success">
                    <AlertTitle>No need to worry</AlertTitle>
                    <strong>Normal</strong>
                </Alert></p> : null}</div>
                <div className="Pneumonia">{prediction === "Pneumonia" ? <p>  <Alert severity="info">
                    <AlertTitle>Need to get an appointment with doctor early stage of Pneumonia</AlertTitle>
                    <strong>Pneumonia</strong>
                </Alert></p> : null}</div>
            </div>
        </div>
    );
}