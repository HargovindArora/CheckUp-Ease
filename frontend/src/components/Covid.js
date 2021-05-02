import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export const Covid =()=> {
const [image, setImage]=useState(0)


 const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    let form_data = new FormData();
    form_data.append('image', image);
    let url = '/api/predict_covid';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };

    return (
      <div>
          <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CheckUpEase</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/">Home</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
                    </ul>
                </div>
            </nav>
            <div class="sidenav">
                <ul>
                    <li>Upload lung CT scan image</li>
                </ul>
            </div>
            <div class="content">
            <h1 className="hm" class="p-3 mb-2 bg-info text-white">Covid 19 Prediction</h1><br></br>
        <form onSubmit={handleSubmit}>
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={handleImageChange} required/>
          </p>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
        </div>
      </div>
    );
    }