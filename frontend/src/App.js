import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import {Heart} from './components/Heart'
import {Diabetes} from './components/Diabetes'
import {Covid} from './components/Covid'
import {Login} from './Login'
import {Dashboard} from './Dashboard'


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
        </div>
        </Router>
    )
  }
}

export default App