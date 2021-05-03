import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../index.css'

import { Button, Modal } from 'react-bootstrap'
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
                        <li class="active"><Link to="/dashboard">Home</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a onClick={handler}><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
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
                <h1 className="hm" class="p-3 mb-2 bg-info text-white">Diabetes Prediction</h1><br></br>
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
               </form>
            </div>
        </div>
    )
}