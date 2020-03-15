import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import InGameScreen from './Views/InGameScreen/InGameScreen';
import WelcomeScreen from './Views/WelcomeScreen/WelcomeScreen';

function Screens() {
  return (
    <Switch>
      <Route exact path="/" component={WelcomeScreen} />
      <Route exact path="/ingame" render={props => <InGameScreen {...props} />} />
      <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><Screens /></BrowserRouter>, rootElement);
// ReactDOM.render(<InGameScreen current_player={newPlayer} />, rootElement);

// ReactDOM.render(<WelcomeScreen current_player={newPlayer} />, document.getElementById('root'));