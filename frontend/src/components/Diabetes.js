import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../index.css'
import { Alert, AlertTitle } from '@material-ui/lab';
import {DiabetesNav} from '../views/DiabetesNav'
import axios from 'axios'

export const Diabetes = () => {
    
    const [show, setShow] = useState(false);
    const [age1, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [polyuria, setPolyuria] = useState("")
    const [polydipsia,setPolydipsia]=useState("")
    const [weight,setWeight]=useState("")
    const [poly,setPoly]=useState("")
    const [irritability,setIrritability]=useState("")
    const [paresis,setParesis]=useState("")
    const [alopecia,setAlopecia]=useState("")
    const [polyphagia,setPolyphagia]=useState("")
    const [visual,setVisualblurring]=useState("")
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

    const handleShow = (e) => {
        console.log(age1)
        axios.post('/api/predict_diabetes',{
               Age: age1,
               Gender: parseInt(gender),
               Polyuria: parseInt(polyuria),
               Polydipsia: parseInt(polydipsia),
               sudden_weight_loss: parseInt(weight),
               Polyphagia: parseInt(polyphagia),
               visual_blurring: parseInt(visual),
               Irritability: parseInt(irritability),
               partial_paresis: parseInt(paresis),
               Alopecia: parseInt(alopecia)
          },{
              headers: { Authorization: `Bearer ${window.localStorage.getItem('key')}` }
          }).then(response => {
            console.log(response);
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
            <DiabetesNav />
            <div class="content">
            <h1 variant="secondary">Diabetes Prediction</h1><br></br>
                <form onSubmit={handleShow}>
                <label> Age:</label><br></br>
                <input  type="value" onChange={(e) => {setAge(e.target.value)}}></input><br></br><br></br>
                <label>Gender:  </label><br></br>
                <input type="value" onChange={(e) => {setGender(e.target.value)}}></input><br></br><br></br>
                <label>Polyuria:  </label><br></br>
                <input type="value" onChange={(e) => {setPolyuria(e.target.value)}}></input><br></br><br></br>
                <label>Polydipsia:  </label><br></br>
                <input type="value" onChange={(e) => {setPolydipsia(e.target.value)}}></input><br></br><br></br>
                <label>sudden_weight_loss:  </label><br></br>
                <input type="value" onChange={(e) => {setWeight(e.target.value)}}></input><br></br><br></br>
                <label>Polyphagia:  </label><br></br>
                <input type="value" onChange={(e) => {setPolyphagia(e.target.value)}}></input><br></br><br></br>
                <label>Visual blurring:  </label><br></br>
                <input type="value" onChange={(e) => {setVisualblurring(e.target.value)}}></input><br></br><br></br>
                <label>Irritability:  </label><br></br>
                <input type="value" onChange={(e) => {setIrritability(e.target.value)}}></input><br></br><br></br>
                <label>Partial paresis:  </label><br></br>
                <input type="value" onChange={(e) => {setParesis(e.target.value)}}></input><br></br><br></br>
                <label>Alopecia:  </label><br></br>
                <input type="value" onChange={(e)=>{setAlopecia(e.target.value)}}></input><br></br><br></br>
                <button type="submit" class="btn btn-success">Submit</button>
               </form><br></br>
               <div className="Heart">{prediction == 1 ? <p>  <Alert severity="error" style={{fontSize:"20px"}}>
                    <AlertTitle>Get immediate checkup by doctor</AlertTitle>
                    <strong>Diabetes</strong>
                </Alert></p> : null}</div>
                <div className="Normal">{prediction == 0 ? <p>  <Alert severity="success" style={{fontSize:"20px"}}>
                    <AlertTitle>No need to worry</AlertTitle>
                    <strong>Normal</strong>
                </Alert></p> : null}</div>
            </div>
        </div>
    )
}