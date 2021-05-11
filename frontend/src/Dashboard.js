import { useState } from 'react';
import logo from './logo.svg';
import { Heart } from './components/Heart.js'
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import './index.css'

export const Dashboard = () => {
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

    return (
        <div>
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CheckUpEase</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Home</a></li>
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
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Heart Disease Prediction</h5>
                            <p class="card-text">Model to predict Heart disease.</p>
                            <img src="https://images.unsplash.com/photo-1580508158643-4bf9f8da03c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"></img><br></br><br></br>
                            <Link to="/heart" class="btn btn-primary">Go</Link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Diabetes Prediction</h5>
                            <p class="card-text">Model to predict Diabetes</p>
                            <img src="https://images.unsplash.com/photo-1599814516142-dbecedc5eb32?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlhYmV0ZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"></img><br></br><br></br>
                            <Link to="/diabetes" class="btn btn-primary">Go</Link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Covid Prediction</h5>
                            <p class="card-text">Model to predict Covid</p>
                            <img src="https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y292aWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"></img><br></br>
                            <Link to="/covid" class="btn btn-primary">Go</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
  );
}