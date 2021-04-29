import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import Axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'

export const Heart = () => {
    const [show, setShow] = useState(false);
    const [age1, setAge] = useState(0)
    const [sex1, setSex] = useState(0)
    const [cp, setCp] = useState(0)
    const [heartRate,setHeartRate]=useState(0)
    const [exerAng,setExerAng]=useState(0)
    const [depExer,setDepExer]=useState(0)
    const [vessels,setNumberOfVessels]=useState(0)
    const [thal1,setThal]=useState(0)
   
    const handleShow = (e) => {
        console.log(age1)
        Axios({
            method: 'post',
            url: '/api/predict_heart',
            data: {
               age: age1,
               sex: sex1,
               chest_pain: cp,
               max_heart_rate: heartRate,
               exercise_angina: exerAng,
               depression_by_exercise: depExer,
               number_of_vessels: vessels,
               thal: thal1
            }
          }).then((response) => {
            console.log(response);
          }, (e) => {
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
                <form onSubmit={handleShow}>
                <label> Age:</label><br></br>
                <input type="number" onChange={setAge}></input><br></br><br></br>
                <label>Sex:  </label><br></br>
                <input type="number" onChange={setSex}></input><br></br><br></br>
                <label>Chest Pain:  </label><br></br>
                <input type="number" onChange={setCp}></input><br></br><br></br>
                <label>Max Heart Rate:  </label><br></br>
                <input type="number" onChange={setHeartRate}></input><br></br><br></br>
                <label>Exercise angina:  </label><br></br>
                <input type="number" onChange={setExerAng}></input><br></br><br></br>
                <label>Depression by exercise:  </label><br></br>
                <input type="number" onChange={setDepExer}></input><br></br><br></br>
                <label>Number of vessels:  </label><br></br>
                <input type="number" onChange={setNumberOfVessels}></input><br></br><br></br>
                <label>Thal:  </label><br></br>
                <input type="number" onChange={setThal}></input><br></br><br></br>
                <button type="submit" class="btn btn-success">Submit</button>
               </form>
            </div>
        </div>
    )
}