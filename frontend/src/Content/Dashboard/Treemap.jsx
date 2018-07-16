import React, { Component } from 'react'; 
import * as d3 from "d3";
import './Treemap.css'

var colorDict = {
    "good": "goodBG",
    "average": "avgBG",
    "bad": "badBG"
}

var zwnl =  {
    name: "Zuidwest-Nederland",    
    children: [
        { name: "Zuid-Holland",  
        children: 
        [
            { name: "good", value: 8},
            { name: "average", value: 15},
            { name: "bad", value: 222}
        ]
    },
        { name: "Zeeland",   children: 
        [
            { name: "good", value: 54},
            { name: "average", value: 1},
            { name: "bad", value: 333}
        ] }  
    ]
    }
    
var zuidHolland = {
    name: "Zuid-Holland",
    children: [
        {name: "Aardam",
        children: [
            {name: "good", value: 44 },
            {name: "average", value: 44 },
            {name: "bad", value: 546 } 
        ]},
        {name: "Bloklan",
        children: [
            {name: "good", value: 252 },
            {name: "average", value: 55 },
            {name: "bad", value: 15 } 
        ]}

    ]
}
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
    //this.root = d3.hierarchy(data);
  }

  componentDidMount(){
    if(this.props.data){
        this.root = d3.hierarchy(this.props.data);
        this.drawMap(this.root)
    }
  }

  drawMap(data){
      this.root = data

      if(!this.root)
        return

 
    let svgGroup = d3.select('svg g')
    svgGroup.selectAll("*").remove();
    let thiss = this
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
   .on('click', d => thiss.listenForZooms("region/" + d.data.name))

   nodes
  .append('rect')
  .attr('width', function(d) { return d.x1 - d.x0; })
  .attr('height', function(d) { return d.y1 - d.y0; })
  .attr('class', d => thiss.getColorByName(d.data.name))
  .on('click', d => thiss.listenForZooms("region/" + d.data.name))

  nodes
  .append('text')
  .attr('dx', 4)
  .attr('dy', 14)
  .text(function(d) {
    return d.data.name;
  })
  }

  createTreemap(){
    let thiss = this
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
   .on('click', () => alert("HIER"))

   nodes
  .append('rect')
  .attr('width', function(d) { return d.x1 - d.x0; })
  .attr('height', function(d) { return d.y1 - d.y0; })
  .attr('class', d => thiss.getColorByName(d.data.name))
  .on('click', d => alert(d.name)  )
 

  nodes
  .append('text')
  .attr('dx', 4)
  .attr('dy', 14)
  .text(function(d) {
    return d.data.name;
  })
  }

getColorByName(name){
    return colorDict[name]
}  

listenForZooms(name){

    alert(name)
    if(this.props.onZoomChange){
        this.props.onZoomChange(name)
    }
}


  render() {


   /* if(this.props.data && !(this.root) ){
        this.root = d3.hierarchy(this.props.data);
       // this.setState({force: "State"})
       console.log("TEST")
        
    }*/

    if(this.props.data){
        this.drawMap(d3.hierarchy(this.props.data))
    }


    return (
      <svg className="TreemapData" >
           <g></g>
      </svg> 
    );
  } 
}

export default Treemap;
