import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import InGameScreen from './Views/InGameScreen/InGameScreen';
import WelcomeScreen from './Views/WelcomeScreen/WelcomeScreen';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Player from './Models/Player'
import Welcome from './Views/WelcomeScreen/WelcomeScreen';

const newPlayer = new Player("123", "Quang Luong")//will be created using welcome screen

function Screens()
{
  return (
    <Switch>
      <Route exact path="/" component={WelcomeScreen} />
      <Route exact path="/ingame" render={props => <InGameScreen {...props} />}/>
      <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><Screens /></BrowserRouter>, rootElement);
// ReactDOM.render(<InGameScreen current_player={newPlayer} />, rootElement);

// ReactDOM.render(<WelcomeScreen current_player={newPlayer} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
