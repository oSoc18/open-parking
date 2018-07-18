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

const QUALITYDATA = ["bad", "average", "good"]
const LEVELS = ["country", "region", "province", "city"]

class Treemap extends Component {

  constructor(props){
    super(props);
    this.state = {typeView: "" };
    this.prev = {
        "country": "The Netherlands",
        "region": null,
        "province": null,
        "city": null
    }
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
   .attr('transform', function(d) {  return 'translate(' + [ d.x0 , d.y0 ] + ')'})
   .on('click', d => thiss.listenForZooms( d.data.name, d.parent))

   //.on('mouseOn', d => thiss.setHover(d.data.name, d.parent))
   //.onmouseout, deletehover   

   let dict = {}
   //children
   let childnodes = nodes
  .append('rect')
  .attr('width', function(d) { 
    dict[d.data.name] = d.x1 - d.x0  
    return d.x1 - d.x0; })
  .attr('height', function(d) {  return d.y1 - d.y0 ; })
  .attr('class', d => thiss.getColorByName(d.data.name))
  .attr('id', d => d.data.name)
  .on("mouseover", d => {thiss.handleMouseOverNode(null, d.data.name, d.parent)})
  .on("mouseout", d => thiss.handleMouseOutNode(null, d.data.name, d.parent))
 // .on('click', d => /*thiss.listenForZooms(d.data.name)*/ console.log( d))

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
  
handleMouseOverNode (obj, name, parent) {

    let rect = d3.select("#"+ name)

    if(QUALITYDATA.indexOf(name) > -1 && parent !== null && parent.data !== null && parent.data.name !== null){
        // handle parent
        rect = d3.select("#"+ parent.data.name)
    }
   
    
    rect.attr("stroke", "green")
        .attr("stroke-width", 5)
        .attr("font-weight", "bold")


}

handleMouseOutNode(obj, name, parent) {

    let rect = d3.select("#"+ name.replace(/ /g,"_"))

    if(QUALITYDATA.indexOf(name) > -1 && parent !== null && parent.data !== null && parent.data.name !== null){
        // handle parent
        rect = d3.select("#"+ parent.data.name)
    }
   
    
    rect.attr("stroke-width", 0)


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
    var container0 = d3.select('body').append('div')
    var container = container0.append('svg');
    container.append('text').attr( "x", -0).attr( "y", -0 ).text(text);
    var size = container.node().getBBox();
    container0.remove();
    return { width: size.width, height: size.height };
}


notEmptyArray(v){
  

    return (v!== "[]" )
  }


getColorByName(name){
    return colorDict[name]
}  

listenForZooms(name, parent = null){

    if(["bad", "average", "good"].indexOf(name) > -1){
        name = parent.data.name
    }
    if(this.props.onZoomChange ){
        if(this.props.level !== 3){
            this.props.onZoomChange(name)
        }
        else
            this.props.onZoomChange(name, 3)
    
    }
}

drawMapView(data){
        this.generateTable(data)
}

generateBreadCrums(data, level){

    
    this.prev[LEVELS[level]] = data.name
    
}

  render() {


    let breadCrums = "Loading data..."
    console.log(this.props.data)
    if(this.props.data /*&& this.props.level && this.props.level !== 3*/){

        if(this.props.data.name = null)
            this.props.data.name = "Unknown"

        if(!this.props.level || this.props.level !== 3 ){
            breadCrums = this.generateBreadCrums(this.props.data, this.props.level)
            this.drawMap(d3.hierarchy(this.props.data))
        }
        else if (this.props.level && this.props.level === 3) {
         
            
            this.drawMapView(this.props.data) //heatmap
        }

        if(this.props.data.name){
            breadCrums = this.props.data.name
        }
        
  
    }



    return (
       <div>
           <h1>{breadCrums}</h1>
           <Table className="heatMap" width={0}/>
      <svg className="TreemapData"  >
        
      </svg> 
      </div>
    );
  } 


  generateTable(data) {

    
    var table = d3.select('.heatMap')
    var thead = table.append('thead') // create the header
    var tbody = table.append('tbody');
    d3.select('svg').selectAll("*").remove()


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

  
        for(let i = 1; i < data.length; i++){

        if(data[i].mark === "onstreet")
            continue

          let resultJson = data[i]["staticData"]
    
         /* alert(resultJson["mark"])*/
          
  

          //resultJson["name"] = data[i]["name"]

          //generate row
          this.generateRow(tbody, column, resultJson, data[i]["longitude"], data[i].mark )

      }
     
      }

      generateRow(tbody, columns, data, longitude, mark = ""){
          data = JSON.parse(data)
        let tr = tbody.append('tr')
        let v = ""

        for (let j = 0; j < columns.length; j++) {
            let classN = ""
            if(columns[j] === "name"){
                classN += " heatCellName"//normal cell
                classN += " nameBorder" + mark
            tr.append('td')
                .attr("class", classN)
                .text(data[columns[j]])

            }
            else if (columns[j] === "longitude"){
        
                    classN += " heatCell"//colored heatcell
                    classN += ((longitude !== null)? " validCell" : " invalidCell") // is this field in the json?
                    tr.append('td')
                    .attr("class", classN)
                    
                    .text("" + longitude)
            }
            else {
                classN += " heatCell "
                v = this.getValueJsonResult(columns[j], data)
             
        
                if(v && this.notEmptyArray(v)){
                  classN += " validCell"  // is this field in the json?
                }
                else{
                 classN += " invalidCell"  // is this field in the json?
                }
                tr.append('td')
                .attr("class", classN)
                .text(v)

        }
      
      }

      }


  getValueJsonResult(key, node){

      if(key === "capacity" && node && node["specifications"] && node["specifications"].length > 0){
          let nodeCapacity = node["specifications"][0]

          if(!nodeCapacity )
            return null

          if (nodeCapacity["capacity"]) {
            return nodeCapacity["capacity"]

          }
          return null // No capacity found
      
        }
      else {

        try{
          
            return (JSON.stringify(node[key]))
        }
        catch(e){
          console.log(e)
          return null // not found
        }
      }
    }
}

export default Treemap;
