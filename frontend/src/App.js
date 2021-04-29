import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import {Heart} from './components/Heart'
import {Dashboard} from './Dashboard'


class App extends Component {

  render() {
    return (
        <Router>
          <div>
        <Route path="/" exact render={
            ()=>{
                return ( <Dashboard /> )
            }
        }/>
        <Route path="/heart" exact render={
            ()=>{
                return ( <Heart /> )
            }
        }/>
        </div>
        </Router>
    )
  }
}

export default App