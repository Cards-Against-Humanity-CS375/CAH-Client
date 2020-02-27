import React, { Component } from "react";
import './App.css';
import InGameScreen from './InGameScreen/InGameScreen'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="center">
        <InGameScreen />
      </div>
    );
  }
}

export default App;