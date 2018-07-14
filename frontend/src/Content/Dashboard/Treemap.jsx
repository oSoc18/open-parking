import React, { Component } from 'react'; 
import * as d3 from "d3";
import './Treemap.css'


var data = 	{
    name: "Nederland",	
    children: [
        { name: "Noordwest-Nederland",  
        children: 
        [
            { name: "good", value: 11},
            { name: "average, value: 88"},
            { name: "bad", value: 445}
        ]
    },
        { name: "Zuidwest-Nederland",   children: 
        [
            { name: "good", value: 11},
            { name: "average, value: 88"},
            { name: "bad", value: 111}
        ] } ,
        { name: "Zuid-Nederland",   children: 
        [
            { name: "good", value: 111},
            { name: "average, value: 88"},
            { name: "bad", value: 445}
        ] },
        { name: "Noord-Nederland",   children: 
        [
            { name: "good", value: 311},
            { name: "average, value: 88"},
            { name: "bad", value: 123}
        ] }
    ]
}


class Treemap extends Component {

  constructor(props){
    super(props);
    this.state = {typeView: "" };
    this.root = d3.hierarchy(data);
  }

  componentDidMount(){
    this.createTreemap()
  }

  createTreemap(){
    var treemap = d3.treemap()

    treemap.size([400, 200])
  .paddingOuter(10);

    this.root.sum(function(d){
        return d.value;
    })

    treemap(this.root);

    d3.select('svg')
  .selectAll('rect')
  .data(this.root.descendants())
  .enter()  
  .append('rect')
  .attr('x', function(d) { return d.x0; })
  .attr('y', function(d) { return d.y0; })
  .attr('width', function(d) { return d.x1 - d.x0; })
  .attr('height', function(d) { return d.y1 - d.y0; })
  }

  render() {

    return (
      <svg className="TreemapData" >
           
      </svg> 
    );
  } 
}

export default Treemap;
