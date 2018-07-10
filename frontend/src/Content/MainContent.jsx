import React, { Component } from 'react';
import MapContent from './MapContent';
import Dashboard from './Dashboard'

import './MainContent.css'


class MainContent extends Component {

  constructor(props){
    super(props);


    this.state = {typeView: "Dashboard" }
  }

  render() {
    let contentVis = (<MapContent/>)
    if(this.state.typeView === "Dashboard"){
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
