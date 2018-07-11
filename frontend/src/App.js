import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar/SideBar';
import MainContent from './Content/MainContent'
import MainNav from './MainNav/MainNav'; 
import  {Container} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props){
    super(props)
    //this.handleNavigation = this.handleNavigation.bind(this)
    this.state = { mainContent: "map"}
  }

  handleNavigation(value){
    this.setState({mainContent: value})


  }

  render() {
    return (
      <div className="App">
        <MainNav onChangeContent={this.handleNavigation.bind(this)} />


<div>
        <SideBar  /> 
        <MainContent tab={this.state.mainContent} /> 
        </div>
      </div>
    );
  }
}

export default App;