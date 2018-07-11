import React, { Component } from 'react';
import MapContent from './MapContent';
import Dashboard from './Dashboard'

import './MainContent.css'
 

class MainContent extends Component {

  constructor(props){
    super(props);
    //this.state = {typeView: "map" }
  }

  componentDidMount(){
    
  }

  render() {
    let tab = "map"
    if(this.props.tab){
      tab = this.props.tab
         }
    let contentVis = (<MapContent/>)
    if(tab === "dash"){
      contentVis = <Dashboard/>
    }
    return (
      <div className="MainContent" >
        {contentVis}
      </div> 
    );
  } 
}

export default MainContent;
