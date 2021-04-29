import { useState } from 'react';
import logo from './logo.svg';
import { Heart } from './components/Heart.js'
import { BrowserRouter, Route, Link } from 'react-router-dom'

export const Dashboard=()=> {
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
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
    </ul>
  </div>
</nav>
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Heart Disease Prediction</h5>
        <p class="card-text">Model to predict Heart disease.</p>
        <Link to="/heart" class="btn btn-primary">Go</Link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Diabetes Prediction</h5>
        <p class="card-text">Model to predict Diabetes</p>
        <a href="#" class="btn btn-primary">Go</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">COVID 19 Prediction</h5>
        <p class="card-text">Model to predict Covid</p>
        <a href="#" class="btn btn-primary">Go</a>
      </div>
    </div>
  </div>
</div>
</div>
  );
}