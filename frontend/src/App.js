import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


import {Heart} from './components/Heart'
import {Diabetes} from './components/Diabetes'
import {Covid} from './components/Covid'
import {Login} from './user/Login'
import {Signup} from './user/Signup'
import {Dashboard} from './Dashboard'
import  {Profiles} from './user/Profiles'
class App extends Component {

  render() {
    return (
        <Router>
          <div>
          <Route path="/" exact render={
            ()=>{
                return ( <Login /> )
            }
        }/>
        <Route path="/signup" exact render={
            ()=>{
                return ( <Signup /> )
            }
        }/>
        <Route path="/dashboard" exact render={
            ()=>{
                return ( <Dashboard /> )
            }
        }/>
        <Route path="/heart" exact render={
            ()=>{
                return ( <Heart /> )
            }
        }/>
        <Route path="/diabetes" exact render={
            ()=>{
                return ( <Diabetes /> )
            }
        }/>
        <Route path="/covid" exact render={
            ()=>{
                return ( <Covid /> )
            }
        }/>
        <Route path="/profile" exact render={
            ()=>{
                return ( <Profiles /> )
            }
        }/>
        </div>
        </Router>
    )
  }
}

export default App