import React, { Component } from 'react';
import MapContent from './MapContent';

import * as d3 from "d3";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Table } from 'reactstrap';
import './Dashboard.css'
import Treemap from './Dashboard/Treemap';


import Filterfields from '../helpclasses/FilterFields';
import FilterFields from '../helpclasses/FilterFields';


require('whatwg-fetch') //browser only!


const DATA = import('../data/data_index_1_3_sample.json')

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

const levels = ["country", "region", "province", "city", "facility"];

var LEVEL_ENUM = Object.freeze({ "country": 0, "region": 1, "province": 2, "city": 3, "facility": 4 })




class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.level = 0
    this.noLocation = false
    this.treemapData = []

    this.requiredAttr = ["longitude", "tariffs", "contactPersons", "parkingRestrictions", "capacity", "openingTimes"]
    this.state = ({ level: 0, treemapData: null, stackedTree: [] })  // default = land
  }

  componentDidMount() {
    //this.generateTable()
    this.setNodesTreemap()
  }

  getPrev() {
    //lower level

  }

  changeLevel(up) {
    let highCoef = up ? 1 : -1
    let current = this.state.level
    this.setState({ level: current + highCoef })
  }


  generateRow(tbody, columns, node) {

    let tr = tbody.append('tr')


    for (let j = 0; j < columns.length; j++) {
      let classN = ""

      if (columns[j] === "name") {
        classN += " heatCellName"//normal cell

        tr.append('td')
          .attr("class", classN)
          .text(node[columns[j]])
      }
      else if (columns[j] === "longitude") {
        classN += " heatCell"//colored heatcell
        classN += ((node["longitude"]) ? " validCell" : " invalidCell") // is this field in the json?

        tr.append('td')
          .attr("class", classN)
          .text(node[columns[j]])
      }
      else {
        let resultJson = null
        classN += " heatCell"//colored heatcell
        // get json 
         fetch(/*node["staticDataUrl"]*/ "http://localhost:8000/parkingdata/request/staticurl/" + node["uuid"])
          .then(response => response.json())
          .then(json => {
            resultJson = json

            let v = this.getValueJsonResult(columns[j], resultJson)


            if (v && this.notEmptyArray(v)) {
              classN += " validCell"  // is this field in the json?
            }
            else {
              classN += " invalidCell"  // is this field in the json?
            }

            tr.append('td')
              .attr("class", classN)
              .text(v)
          });




      }
    } // close for
  }

  notEmptyArray(v) {


    return (v !== "[]")
  }

  componentWillReceiveProps(nextProps){

    let name = this.state.treemapData["name"]

    let levelIndex = this.level
    let level =  levels[levelIndex] + "/"
    let summaryStr = this.level === 3 ? "" : "summary/"
    let city = this.level === 3 ? name : null // no summary of city
    let sub = level  + name
    let url = "http://localhost:8000/parkingdata/" + summaryStr + sub + "/?" + this.getParameters()

let thiss = this
    fetch(url)
    .then(response => response.json())
    .then(json => {

  
      //this.handleFilters is not used until a solution is found
      //json = thiss.filterEntries(json)
      thiss.setTreeMap(json, city)
    })
  }

  onZoomChange(name, forceLevel) {
    let levelIndex = ++(this.level)


    let tempHistory = this.state.stackedTree
    tempHistory.push(this.state.treemapData)

    if (forceLevel) {
      this.level = 3
    }
    let level =  levels[levelIndex] + "/"

    if("region/none" === name){
        level = ""
    } 

    let summaryStr = this.level === 3 ? "" : "summary/"
    let city = this.level === 3 ? name : null // no summary of city
    let sub = level  + name
    let url = "http://localhost:8000/parkingdata/" + summaryStr + sub + "/?" + this.getParameters()

    let thiss = this
    fetch(url)
      .then(response => response.json())
      .then(json => {

        console.log(json)
        //this.handleFilters is not used until a solution is found
        //json = thiss.filterEntries(json)
        thiss.setTreeMap(json, city)
      })
  }

  getParameters(){

    let params = ""
    if(this.props.filters.visFacilities){

      for(let visF of this.props.filters.visFacilities){
        params += "&" + visF + "=true"
      }
    }


    if(this.props.filters.information){ 
      for(let key in this.props.filters.information){
        params += "&" + key + "=" + this.props.filters.information[key]
      }
    }
    
    return params
  }

  FILTERFUNCTION = {
    "capacity": FilterFields.checkCapacity,
    "restrictions": Filterfields.checkRestrictions,
    "contactData" : FilterFields.checkContactData,
    "tariffs": Filterfields.checkTarrifs,
    "openingHours": Filterfields.checkOpeningHours,
    "accessPoint": Filterfields.checkOpeningHours
  }

  filterEntries(parkings) {
    
  /*  let newParkings = parkings

    let city = parkings["name"]
    if (this.level === LEVEL_ENUM.city) {
      //foreach filter
      console.log(this.props.filters.information)

      for (let option of this.props.filters.information) {
   
        //if (this.props.filters.information.includes("capacity")) 
          //newParkings = parkings.filter(parking => Filterfields.checkCapacity(staticData))
          newParkings = newParkings.filter(parking => this.FILTERFUNCTION[option](JSON.parse(parking["staticData"])))
          //
      }
      newParkings["name"] = city
      

    }*/
    return parkings
  }

  allFieldsIncluded(parking) {
   /* if (this.props.filters && this.props.filters.information && this.props.filters.information.length > 0) {
      console.log(this.props.filters.information)
      if (this.props.filters.information.indexOf("capacity") > -1) {

        return Filterfields.checkCapacity(parking)
      }
    }*/
    return true
  }

  specialFieldsIncluded(parking) {

  }


  getValueJsonResult(key, node) {

    //capacity is a special one



    if (key === "capacity" && node["parkingFacilityInformation"] && node["parkingFacilityInformation"]["specifications"] && node["parkingFacilityInformation"]["specifications"].length > 0) {
      let nodeCapacity = node["parkingFacilityInformation"]["specifications"][0]

      if (!nodeCapacity)
        return null

      if (nodeCapacity["capacity"]) {
        return nodeCapacity["capacity"]

      }
      return null // No capacity found

    }
    else {

      try {

        return (JSON.stringify(node["parkingFacilityInformation"][key]))
      }
      catch (e) {
        console.log(e)
        return null // not found
      }
    }
  }




  /**
   * TO DO: Catch wrong response / time out
   */
  async setAllParkings(tbody, column) {


    let allP = []

    for (let i = 1; i < 0; i++) {
      let url = "http://localhost:8000/parkingdata"
      let resultJson = null
      url += "/id/" + i + "?format=json"
      await fetch(url)
        .then(response => response.json())
        .then(json => {
          resultJson = json
          this.generateRow(tbody, column, resultJson)
        })
      allP.push(resultJson)

    }

  }

  generateTable() {
    return
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

  }


  getTable() {

    let debug = false
    if (debug) {
      return <Table className="heatMap" width={0}>
      </Table>
    }
    else {
      return <div />
    }
  }

  getTreemapNode() { }

  /**
  * TO DO: Catch wrong response / time out
  */
  setNodesTreemap() {


    let thiss = this
    let url = "http://localhost:8000/parkingdata/summary/country/nl/" + "?" + this.getParameters()
    let resultJson = null
    fetch(url)
      .then(response => response.json())
      .then(json => {
        // json = thiss.handleFilters(json)
        thiss.setTreeMap(json)
      })

  }

  handleFilters(json) {
    let url = "http://localhost:8000/parkingdata/country/nl/" + "?" + this.getParameters()
    let thiss = this

    fetch(url)
      .then(response => response.json())
      .then(json => {

        let parent = {}
        parent["name"] = "nl"
        parent["children"] = thiss.getChildrenTree(json, "region")
        return parent
      })

  }

  getChildrenTree(json, childField) {

    let result = []
    for (let i = 0; i < json.length; i++) {
      let node = json[i]
      let alreadyIncluded = false

      if (json[i][childField] !== null) { // if the field exists && parking has all required checkboxfields

        for (let r = 0; r < result.length; r++) {
          if (result[r]["name"] === json[i][childField]) {//already included?
            result[r]["value"] = result[r]["value"] + 1
            alreadyIncluded = true
          }
        }

        // if not included1
        if (!alreadyIncluded)
          result.push({ name: json[i][childField], value: 1 })


      }
      return result

    }

    //field is already in there?
    //just ++
    //else: add field and initialize on 1
  }

  setTreeMap(json, cityname = null) {
    if (this.state.treemapData !== json) { //only update if it's not the same

      if (cityname !== null) { // give parent a name
        json["name"] = cityname
      }

      
      this.setState({ treemapData: json })

    }

  }

  onZoomChange2(name, jumpToLevel = false) {
    let tempHistory = this.state.stackedTree

    this.onZoomChange(name, jumpToLevel)

  }

  render() {
    //set headers
    // for each selected facility
    // get the six (if selected) headers
    // show data or show a red (NOT AVAILABLE)
    let getTable = this.getTable()

    return (


      <Treemap level={this.level} setReset={this.setReset.bind(this)} filters={this.props.filters} data={this.getFilteredData()} onZoomChange={this.onZoomChange2.bind(this)} onDezoom={this.onDezoom.bind(this)} />


    );
  }

  setReset(){
    this.onZoomChange("region/none", true)
  }

  getFilteredData(){
   /* if(this.level === LEVEL_ENUM.city){
      return this.filterEntries(this.state.treemapData)
    }
    else{
      return this.state.treemapData
    }*/

    return this.state.treemapData
  }

  onDezoom(val = false) {
    if(val === true){
    this.level = this.level - 1
    }
    let prev = null

    
    alert(val + " in DEZOOM")
    if (val === true) {
      this.level = this.state.stackedTree.length - 1; // back to whole overview
    }


    if (this.state.stackedTree.length > 0) {
      let temp = this.state.stackedTree
      prev = temp.pop()
      this.setState({
        treemapData: prev,
        stackedTree: temp
      })
    }
  }

  onNoLocation() {
    // set level to city
    // set unknownView to true
    this.noLocation = true
  }

}

export default Dashboard;
