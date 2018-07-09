import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar/SideBar';
import MainContent from './Content/MainContent'
import MainNav from './MainNav/MainNav';
import Test from './test'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
    
        <MainNav/>
        <SideBar/> 
        <Test />
       /* <Test/>*/
      </div>
    );
  }
}

export default App;
