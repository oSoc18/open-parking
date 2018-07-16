import React, { Component } from 'react';
import MapContent from './MapContent';

import * as d3 from "d3";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Table } from 'reactstrap';
import './Dashboard.css'
import Treemap from './Dashboard/Treemap';

require('whatwg-fetch') //browser only!


const DATA = import('../data/data_index_1_3_sample.json')

const TESTJSON = [{
  "name": "parkingMuseum",
  "price": "5-25",
  "location": "2222",
  "owner": "available",
  "restrictions": "none",
  "capacity": "5000",
  "hours": "22222222222222222222"
},
{
  "name": "Parking2",
  "price": "",
  "location": null,
  "owner": "available",
  "restrictions": "none",
  "capacity": "5000"
}

]

const realJson = [

  
{
  "id": 520,
  "name": "Piet Heingarage (Amsterdam)",
  "uuid": "e08d6a7e-cfcf-4cbd-a59a-8821766c016c",
  "staticDataUrl": "https://npropendata.rdw.nl/parkingdata/v2/static/e08d6a7e-cfcf-4cbd-a59a-8821766c016c",
  "dynamicDataUrl": "http://opd.it-t.nl/Data/parkingdata/v1/amsterdam/dynamic/900000002_parkinglocation.json",
  "limitedAccess": false,
  "geoLocation": "[{'latitude': 52.377626, 'coordinatesType': 'WGS84', 'validityStartOfPeriod': 1414800000, 'longitude': 4.91488}]"
},
{
  "id": 69,
  "name": "Parpeergarage Stadhuisplein",
  "uuid": "fe644297-9f7e-4a47-9ed6-e0804788a523",
  "staticDataUrl": "https://npropendata.rdw.nl/parkingdata/v2/static/fe644297-9f7e-4a47-9ed6-e0804788a523",
  "dynamicDataUrl": "http://opd.it-t.nl/Data/parkingdata/v1/amersfoort/dynamic/fe644297-9f7e-4a47-9ed6-e0804788a523.json",
  "limitedAccess": false,
  "geoLocation": "{'latitude': '52.1559901', 'coordinatesType': 'WGS84', 'longitude': '5.3853387'}"
},
{
  "id": 19,
  "name": "Parkeerterrein Gedempte Haven",
  "uuid": "ffa8ca84-94c7-46e2-9f5d-0fbe5d485810",
  "staticDataUrl": "https://npropendata.rdw.nl/parkingdata/v2/static/ffa8ca84-94c7-46e2-9f5d-0fbe5d485810",
  "dynamicDataUrl": "http://opd.it-t.nl/data/parkingdata/v1/veere/dynamic/8f1b501e-4681-494b-bbf4-39c00a41e129.json",
  "limitedAccess": false,
  "geoLocation": null
}

]

const levels = [ "land", "region", "province", "city", "facility"];


class Dashboard extends Component {

  constructor(props) {
    super(props);

   
    this.requiredAttr = ["longitude", "tariffs", "contactPersons", "parkingRestrictions", "capacity", "openingTimes"]
    this.state = ({level: 0, treemapData: null})  // default = land
  }

  componentDidMount() {
    //this.generateTable()
    this.setNodesTreemap()
  }

  changeLevel(up){
    let highCoef = up ? 1 : -1
    let current = this.state.level 
    this.setState({level: current + highCoef })
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

  notEmptyArray(v){
  

    return (v!== "[]" )
  }

  onZoomChange(){
    let sub = "region/Noordwest-Nederland"
    let url = "http://localhost:8000/parkingdata/summary/" + sub
    let thiss = this
    fetch(url) 
    .then(response => response.json())
    .then(json => {
      thiss.setTreeMap(json)
  }    )
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
  

     

    /**
     * TO DO: Catch wrong response / time out
     */
    async setAllParkings(tbody, column){

       
      let allP = []

      for(let i = 1; i < 0; i++){
        let url = "http://localhost:8000/parkingdata"
        let resultJson = null
        url += "/id/" + i + "?format=json"
      await fetch(url) 
        .then(response => response.json())
        .then(json => {
        console.log(json);
        resultJson = json
        this.generateRow(tbody, column, resultJson )
      }    )
    allP.push(resultJson)

    }
   
    }

  generateTable() {

    var table = d3.select('.heatMap')
    var thead = table.append('thead') // create the header
    var tbody = table.append('tbody');
   
    

    let columns = ["name"].concat(this.requiredAttr)

    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .text(function (column) { return column; });

      this.setAllParkings(tbody, columns)
      /*for(let i = 0; i < allParking.length; i++){
        this.generateRow(tbody, columns, allParking[i] )
      }*/
    /*for (let i = 0; i < TESTJSON.length; i++) {

      this.generateRow(tbody, columns )
      let tr = tbody.append('tr')*/

     /* for (let j = 0; j < columns.length; j++) {

        let nameCell = ""
        let colorClass = "invalidCell"

        if (TESTJSON[i][columns[j]]) {
          colorClass = "validCell"
        }

        if (j === 0) {
          nameCell = "Name"
          colorClass = ""
        }

        tr.append('td')
          .attr("class", "heatCell" + nameCell + " " + colorClass)
          .text(TESTJSON[i][columns[j]])*/
      
    }


    getTable(){
      
      let debug = false
      if(debug){
        return <Table className="heatMap" width={0}>
        </Table>
      }
      else{
        return <div/>
      }
    }

    getTreemapNode(){}

     /**
     * TO DO: Catch wrong response / time out
     */
     setNodesTreemap(){

       
      let allP = []
      let thiss = this
      let url = "http://localhost:8000/parkingdata/summary/country/nl/"
      let resultJson = null
       fetch(url) 
        .then(response => response.json())
        .then(json => {
          thiss.setTreeMap(json)
      }    )

    }

    setTreeMap(json){
      if(this.state.treemapData !== json)
          this.setState({treemapData: json})
    }

    onZoomChange2(name){
        this.onZoomChange()
    }

  render() {
    //set headers
    // for each selected facility
    // get the six (if selected) headers
    // show data or show a red (NOT AVAILABLE)
    let getTable = this.getTable()
    return (
      
        <Treemap level={this.state.level} data={this.state.treemapData} onZoomChange={this.onZoomChange2.bind(this)}/>
    
      
    );
  }
}

export default Dashboard;
