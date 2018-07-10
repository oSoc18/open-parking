import React, { Component } from 'react';
import MapContent from './MapContent';
import d3 from 'd3'

const  DATA = import('../data/data_index_1_3_sample.json')

class Dashboard extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render() {

    return (
      <div className="heatMap" >
        
      </div> 
    );
  } 
}

export default Dashboard;
