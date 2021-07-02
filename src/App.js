import React from "react";
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";

import Create from "./Components/Create";
import Create2 from "./Components/Create2";
import Create3 from "./Components/Create3";
import Projects from "./Components/Projects";
import Home from "./Components/Home";
import View from "./Components/View";
import Finish from "./Components/finish";
import NotFound from "./Components/notfound";


export default class App extends React.Component {
  componentDidMount(){
    var session_id = localStorage.getItem("session_id");
    if(!session_id){
      localStorage.setItem("session_id", this.makeSessionID(32));
    }
  }

  makeSessionID(length){
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }


  render(){
  return (
<div>
    <Router>
        
        <Switch>

          <Route path="/" component={Home} exact>
          </Route>

          <Route path="/create" component={Create} exact>
          </Route>

          <Route path="/create2" component={Create2} exact>
          </Route>

          <Route path="/create3" component={Create3} exact>
          </Route>

          <Route path="/projects" component={Projects} exact>
          </Route>

          <Route path="/u" component={View} exact>
          </Route>

          <Route path="/finish" component={Finish} exact>
          </Route>

          <Route path="/nouser" component={NotFound} exact>
          </Route>

        </Switch>
    </Router>
  </div>
  );
}
}
