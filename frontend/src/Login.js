import React, { useState } from 'react'
import { Redirect,Link } from 'react-router-dom'
import Axios from 'axios'
import './index.css';

import { useHistory } from 'react-router-dom';



export const Login = (props) => {

  const history = useHistory();

  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [susername, setSignupUsername] = useState('')
  const [spassword, setSignupPassword] = useState('')
  const [name, setName] = useState('')
  

  

  const [check, setCheck] = useState(false)

  const onSubmitClick = (e) => {
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
  if (check == true) {
    <Redirect to="/dashboard" />
  }


  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }




  return (
    <div>
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
          <Link to="/signup">Dont't have an account? Signup</Link>
        </form>
      </div>
    </div>
  )
}
