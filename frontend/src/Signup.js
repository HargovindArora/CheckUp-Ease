import React, { useState } from 'react'
import { Redirect,Link } from 'react-router-dom'
import Axios from 'axios'
import './index.css';

import { useHistory } from 'react-router-dom';

export const Signup=()=>{

    const history = useHistory();
    const [susername, setSignupUsername] = useState('')
    const [spassword, setSignupPassword] = useState('')
    const [name, setName] = useState('')


  const onSubmit = (e) => {
    console.log("You pressed signup")
    let optss = {
      'name': name,
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
  const handleSignupUsernameChange = (e) => {
    setSignupUsername(e.target.value)
  }

  const handleSignupPasswordChange = (e) => {
    setSignupPassword(e.target.value)
  }
  const handlenameChange = (e) => {
    setName(e.target.value)
  }
  return (
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
      <Link to="/">Already have an account? Login</Link>
    </form>
  </div> 
  )
}