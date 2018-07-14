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
            { name: "average", value: 88},
            { name: "bad", value: 445}
        ]
    },
        { name: "Zuidwest-Nederland",   children: 
        [
            { name: "good", value: 11},
            { name: "average", value: 88},
            { name: "bad", value: 111}
        ] } ,
        { name: "Zuid-Nederland",   children: 
        [
            { name: "good", value: 111},
            { name: "average", value: 88},
            { name: "bad", value: 445}
        ] },
        { name: "Noord-Nederland",   children: 
        [
            { name: "good", value: 311},
            { name: "average", value: 88},
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
    treemap.tile(d3.treemapSquarify)

    treemap.size([960, 570])
    .paddingTop(20)
    .paddingInner(2);

    this.root.sum(function(d){
        return d.value;
    })

    treemap(this.root);

   let nodes = d3.select('svg g')
   .selectAll('g')
   .data(this.root.descendants())
   .enter()
   .append('g')
   .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})

   nodes
  .append('rect')
  .attr('width', function(d) { return d.x1 - d.x0; })
  .attr('height', function(d) { return d.y1 - d.y0; })

  nodes
  .append('text')
  .attr('dx', 4)
  .attr('dy', 14)
  .text(function(d) {
    return d.data.name;
  })
  }

  

  render() {

    return (
      <svg className="TreemapData" >
           <g></g>
      </svg> 
    );
  } 
}

export default Treemap;
