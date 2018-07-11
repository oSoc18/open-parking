import React, { Component } from 'react';
import MapContent from './MapContent';
import Dashboard from './Dashboard'


class MainContent extends Component {

  constructor(props){
    super(props);


    this.state = {typeView: "" }
  }

  componentDidMount(){
    
  }

  render() {
    let contentVis = (<MapContent/>);
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
