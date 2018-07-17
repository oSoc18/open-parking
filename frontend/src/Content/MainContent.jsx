import React, { Component } from 'react';
import MapContent from './MapContent';
import Dashboard from './Dashboard'
import MainNav from '../MainNav/MainNav'; 
import './MainContent.css'
 

class MainContent extends Component {

  constructor(props){
    super(props);


    this.state = {typeView: "" }

  }

  componentDidMount(){
    
  }

  render() {

    let tab = "map"
    if(this.state.tab){
      tab = this.state.tab
         }
    let contentVis = (<MapContent/>)
    if(tab === "dash"){
      contentVis = <Dashboard/>
    }
    return (
      <div className="MainContent" >
    
        <MainNav onChangeContent={this.handleNavigation.bind(this)} />
  
        <div className="mainChild">
        {contentVis}
        </div>
      </div> 
    );
  }
  
  handleNavigation(value){
    this.setState({tab: value})


  }
}

export default MainContent;
