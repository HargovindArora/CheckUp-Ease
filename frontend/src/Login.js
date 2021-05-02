import React,{ useState } from 'react'
import { Redirect} from 'react-router-dom'
import Axios from 'axios'
import './index.css';

import { useHistory } from 'react-router-dom';

import axios from 'axios';

export const Login=(props)=> {

  const history = useHistory();

    const [accessToken, setaccessToken] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [susername, setSignupUsername] = useState('')
    const [spassword, setSignupPassword] = useState('')
    const [name,setName]=useState('')
    const [age,setAge]=useState('')

    const [check, setCheck] = useState(false)

    const onSubmitClick = (e)=>{
      console.log("You pressed login")
      let opts = {
        'username': username,
        'password': password
      }
      console.log(opts)
      Axios({
        method: 'post',
        url: '/api/login',
        data: opts
      }).then(response => {
        console.log(response)
        setCheck(true)
        window.localStorage.setItem('key', response.data.token);
        console.log(window.localStorage.getItem('key'))
        history.push("/dashboard")
    }).catch(error => {
        console.log(error);
        return;
    })
        e.preventDefault()
    }
   if(check==true)
   {
    <Redirect to="/dashboard"/>
   }

    const onSubmit = (e)=>{
      console.log("You pressed signup")
      let optss = {
        'name': name,
        'age': age,
        'username': susername,
        'password': spassword
      }
      console.log(optss)
      Axios({
        method: 'post',
        url: '/api/signup',
        data: optss
      }).then(response => {
        console.log(response)
    })
        e.preventDefault()
    }
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value)
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }
    const handleSignupUsernameChange = (e) => {
      setSignupUsername(e.target.value)
    }
  
    const handleSignupPasswordChange = (e) => {
      setSignupPassword(e.target.value)
    }
    const handlenameChange = (e) => {
      setName(e.target.value)
    }
  
    const handleAge = (e) => {
      setAge(e.target.value)
    }

   
    return (
      <div>
      <div class="signup-form">
    <form onSubmit={onSubmit}>
        <h2 class="text-center">Signup</h2> 
        <div class="form-group">
            <input type="text" onChange={handlenameChange} class="form-control" placeholder="name" required="required"></input>
        </div><br></br>     
        <div class="form-group">
            <input type="text" onChange={handleSignupUsernameChange} class="form-control" placeholder="Username" required="required"></input>
        </div><br></br>
        <div class="form-group">
            <input type="password" onChange={handleSignupPasswordChange} class="form-control" placeholder="Password" required="required"></input>
        </div><br></br>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Signup</button>
        </div>       
    </form>
</div>
      <div class="login-form">
    <form onSubmit={onSubmitClick}>
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" onChange={handleUsernameChange} class="form-control" placeholder="Username" required="required"></input>
        </div><br></br>
        <div class="form-group">
            <input type="password" onChange={handlePasswordChange} class="form-control" placeholder="Password" required="required"></input>
        </div><br></br>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Log in</button>
        </div>
        <div class="clearfix">
            <label class="float-left form-check-label"><input type="checkbox" /> Remember me</label>
        </div>        
    </form>
</div>
</div>
    )
  }
