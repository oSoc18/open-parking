import React, { Component } from 'react'; 
import * as d3 from "d3";
import './Treemap.css'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Table } from 'reactstrap';
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
    this.requiredAttr = ["longitude", "tariffs", "contactPersons", "parkingRestrictions", "capacity", "openingTimes"]
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

 
        d3.select('svg').selectAll("*").remove()
        d3.select('svg').append('g')
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

    // "parent"-rectangles
   let nodes = d3.select('svg g') 
   .selectAll('g')
   .data(this.root.descendants())
   .enter()
   .append('g')
   .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
   .on('click', d => thiss.listenForZooms( d.data.name))

   let dict = {}
   //children
   let childnodes = nodes
  .append('rect')
  .attr('width', function(d) { 
    dict[d.data.name] = d.x1 - d.x0  
    return d.x1 - d.x0; })
  .attr('height', function(d) { return d.y1 - d.y0; })
  .attr('class', d => thiss.getColorByName(d.data.name))
  
  //.on('click', d => thiss.listenForZooms(d.data.name))

  nodes
  .append('text')
  .attr('dx', 4)
  .attr('dy', 14)
  .attr('width', function(d) { return dict[d]; })
  .attr('height', function(d) { return d.y1 - d.y0; })
  .text(function(d) {
    
      if(["bad", "average", "good"].indexOf(d.data.name) < 0){
        
        let dataname = d.data.name
        if(d.data.name === null)
            dataname = "Unknown"
        while(thiss.textSize(dataname).width > dict[d.data.name]){
            dataname = dataname.substring(0, dataname.length - 1)
        }
        return dataname;
      }
       else 
            return ""
  })/*.each(function(d){
      let width = dict[d]  
      let padding = 0
    var self = d3.select(this),
    textLength = self.node().getComputedTextLength(),
    text = self.text();
while (textLength > (width - 2 * padding) && text.length > 0) {
    text = text.slice(0, -1);
    self.text(text + '...');
    textLength = self.node().getComputedTextLength();*/
}
  

wrap(width, padding) {
    var self = d3.select(this),
        textLength = self.node().getComputedTextLength(),
        text = self.text();
    while (textLength > (width - 2 * padding) && text.length > 0) {
        text = text.slice(0, -1);
        self.text(text + '...');
        textLength = self.node().getComputedTextLength();
    }
} 

textSize(text) {
    if (!d3) return;
    var container = d3.select('body').append('div').append('svg');
    container.append('text').attr( "x", -0).attr( "y", -0 ).text(text);
    var size = container.node().getBBox();
    container.remove();
    return { width: size.width, height: size.height };
}


getColorByName(name){
    return colorDict[name]
}  

listenForZooms(name){

    if(this.props.onZoomChange ){
        if(this.props.level !== 3)
            this.props.onZoomChange(name)
        else
            this.props.onZoomChange(name, 3)
    
    }
}

drawMapView(data){
        this.generateTable(data)
}


  render() {


   /* if(this.props.data && !(this.root) ){
        this.root = d3.hierarchy(this.props.data);
       // this.setState({force: "State"})
       console.log("TEST")
        
    }*/

    if(this.props.data /*&& this.props.level && this.props.level !== 3*/){


        if(!this.props.level || this.props.level !== 3 )
            this.drawMap(d3.hierarchy(this.props.data))
        else if (this.props.level && this.props.level === 3) {
            alert("Ici")
            this.drawMapView(this.props.data)
        }
  
    }


    return (
       <div>
           <Table className="heatMap" width={0}/>
      <svg className="TreemapData" >
        
      </svg> 
      </div>
    );
  } 


  generateTable(data) {

    
    var table = d3.select('.heatMap')
    var thead = table.append('thead') // create the header
    var tbody = table.append('tbody');
   
    var thead = table.append('thead') // create the header
    var tbody = table.append('tbody');
   

    let columns = ["name"].concat(this.requiredAttr)

    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .text(function (column) { return column; });

      this.setAllParkings(tbody, columns, data)
  }

    /**
     * TO DO: Catch wrong response / time out
     */
    async setAllParkings(tbody, column, data){

       
        let allP = []
  
        for(let i = 1; i < data.length; i++){
          let resultJson = data[i]
            
          this.generateRow(tbody, column, resultJson )
          
      allP.push(resultJson)
  
      }
     
      }

      
  async  generateRow(tbody, columns, node){

    let tr = tbody.append('tr')


    for (let j = 0; j < columns.length; j++) {
      let classN = ""

      if(columns[j] === "name"){
        classN += " heatCellName"//normal cell

        tr.append('td')
        .attr("class", classN)
        .text(node[columns[j]])
      }
      else if(columns[j] === "longitude"){
        classN += " heatCell"//colored heatcell
        classN += ((node["longitude"])? " validCell" : " invalidCell") // is this field in the json?

        tr.append('td')
        .attr("class", classN)
        .text(node[columns[j]])
      }
      else {
        let resultJson = null
        classN += " heatCell"//colored heatcell
        // get json 
        await fetch(node["staticDataUrl"])
          .then(response => response.json())
          .then(json => {
          console.log(json);
          resultJson = json

          let v = this.getValueJsonResult(columns[j], resultJson)
          console.log("V==" + v)

          if(v && this.notEmptyArray(v)){
            classN += " validCell"  // is this field in the json?
          }
          else{
           classN += " invalidCell"  // is this field in the json?
          }

          tr.append('td')
          .attr("class", classN)
          .text(v)
      });



       
      }
    } // close for
  }

  getValueJsonResult(key, node){

    //capacity is a special one
  


      if(key === "capacity" && node["parkingFacilityInformation"] && node["parkingFacilityInformation"]["specifications"] && node["parkingFacilityInformation"]["specifications"].length > 0){
          let nodeCapacity = node["parkingFacilityInformation"]["specifications"][0]

          if(!nodeCapacity )
            return null

          if (nodeCapacity["capacity"]) {
            return nodeCapacity["capacity"]

          }
          return null // No capacity found
      
        }
      else {

        try{
          
            return (JSON.stringify(node["parkingFacilityInformation"][key]))
        }
        catch(e){
          console.log(e)
          return null // not found
        }
      }
    }
}

export default Treemap;
