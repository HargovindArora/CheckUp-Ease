import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../index.css'
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import {HeartNav} from '../views/HeartNav'
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
    const [prediction,setPrediction]=useState(3)

    const history=useHistory();

    const handler=(e)=>{
        axios({
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
        },{
            headers: { Authorization: `Bearer ${window.localStorage.getItem('key')}` }
        }).then(response => {
            console.log(response.data.Prediction.[1]);
            setPrediction(response.data.Prediction.[1])
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
            <HeartNav />
            <div class="content">
            <h1 variant="secondary">Heart Disease Prediction</h1><br></br>
                <Form onSubmit={handleSho}>
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
                </Form><br></br>
                <div className="Heart">{prediction[0] == 1 ? <p>  <Alert severity="error" style={{fontSize:"20px"}}>
                    <AlertTitle>Get immediate checkup by doctor</AlertTitle>
                    <strong>Heart Disease</strong>
                </Alert></p> : null}</div>
                <div className="Normal">{prediction[0] == 0 ? <p>  <Alert severity="success" style={{fontSize:"20px"}}>
                    <AlertTitle>No need to worry</AlertTitle>
                    <strong>Normal</strong>
                </Alert></p> : null}</div>
            </div>
        </div>
    )
}