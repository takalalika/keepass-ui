import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import '../css/Mainstream.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Keepass</h1>
        </header>
        <p className="App-intro">
          那是真的牛皮。
        </p>
      </div>
    );
  }
}

export default App;
