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

  onOptionsChanged(values){
    alert(values)

  }


  render() {
    return (
      <div className="App">
     


<div>
        <SideBar onChangeOptions={this.onOptionsChanged.bind(this)} /> 
        <MainContent tab={this.state.mainContent} /> 
        </div>
      </div>
    );
  }
}

export default App;