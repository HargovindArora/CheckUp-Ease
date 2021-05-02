import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'

export const Heart = () => {
    const [age1, setAge] = useState("")
    const [sex1, setSex] = useState("")
    const [cp, setCp] = useState("")
    const [heartRate, setHeartRate] = useState("")
    const [exerAng, setExerAng] = useState("")
    const [depExer, setDepExer] = useState("")
    const [vessels, setNumberOfVessels] = useState("")
    const [thal1, setThal] = useState("")
    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleSho = (e) => {
        console.log(age1)
        axios.post('/api/predict_heart', {
            age: parseInt(age1),
            sex: parseInt(sex1),
            chest_pain: parseInt(cp),
            max_heart_rate: parseInt(heartRate),
            exercise_angina: parseInt(exerAng),
            depression_by_exercise: parseInt(depExer),
            number_of_vessels: parseInt(vessels),
            thal: parseInt(thal1)
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e)
        });
        e.preventDefault();
    }
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
                    <li>Age in years</li>
                    <li>Sex <br></br>
                        1:Male <br></br>
                        0:Female </li>
                    <li> Chest Pain Type<br></br>
                      Value 1: typical angina<br></br>
                      Value 2: a typical angina<br></br>
                      Value 3: non-anginal pain<br></br>
                      Value 4: asymptomatic<br></br>
                    </li>
                    <li>Exercise angina <br></br>
                        1:Yes <br></br>
                        0:No
                      </li>
                    <li>Thal <br></br>
                      3 = normal <br></br>
                      6 = fixed defect <br></br>
                      7 = reversable defect <br></br>
                    </li>
                </ul>
            </div>
            <div class="content">
                <h1 className="hm" class="p-3 mb-2 bg-info text-white">Heart Disease Prediction</h1><br></br>
                <form onSubmit={handleSho}>
                    <label> Age:</label><br></br>
                    <input type="value" onChange={(e) => { setAge(e.target.value) }}></input><br></br><br></br>
                    <label>Sex:  </label><br></br>
                    <input type="value" onChange={(e) => { setSex(e.target.value) }}></input><br></br><br></br>
                    <label>Chest Pain:  </label><br></br>
                    <input type="value" onChange={(e) => { setCp(e.target.value) }}></input><br></br><br></br>
                    <label>Max Heart Rate:  </label><br></br>
                    <input type="value" onChange={(e) => { setHeartRate(e.target.value) }}></input><br></br><br></br>
                    <label>Exercise angina:  </label><br></br>
                    <input type="value" onChange={(e) => { setExerAng(e.target.value) }}></input><br></br><br></br>
                    <label>Depression by exercise:  </label><br></br>
                    <input type="value" onChange={(e) => { setDepExer(e.target.value) }}></input><br></br><br></br>
                    <label>Number of vessels:  </label><br></br>
                    <input type="value" onChange={(e) => { setNumberOfVessels(e.target.value) }}></input><br></br><br></br>
                    <label>Thal:  </label><br></br>
                    <input type="value" onChange={(e) => { setThal(e.target.value) }}></input><br></br><br></br>
                    <button type="submit" class="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}