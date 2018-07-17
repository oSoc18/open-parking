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

    //lol, i know it's ugly
    let contentVis = (<MapContent filters={this.props.filters}/>)
    if(tab === "dash"){
      contentVis = <Dashboard filters={this.props.filters}/>
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
