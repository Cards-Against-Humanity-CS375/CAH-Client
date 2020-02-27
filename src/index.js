import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InGameScreen from './InGameScreen/InGameScreen';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Player from './Models/Player'

const newPlayer = new Player("123", "Quang Luong")//will be created using welcome screen


ReactDOM.render(<InGameScreen current_player={newPlayer} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
