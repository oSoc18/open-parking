import React, { Component } from 'react';
import MapContent from './MapContent';
import * as d3 from "d3";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Table } from 'reactstrap';
import './Dashboard.css'
const  DATA = import('../data/data_index_1_3_sample.json')

const TESTJSON = [{
<<<<<<< HEAD
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
=======
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
>>>>>>> staticvisuals

] 


class Dashboard extends Component {

  constructor(props){
    super(props);

    this.requiredAttr = ["price", "location", "owner", "restrictions", "capacity", "hours"]
  }

  componentDidMount(){
    this.generateTable()
  }


  generateTable(){

    var table = d3.select('.heatMap').append('table')
      var thead = table.append('thead') // create the header
      var	tbody = table.append('tbody');

      let columns = ["name"].concat(this.requiredAttr)     
 
      thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
        .text(function (column) { return column; });

      for(let i = 0; i < TESTJSON.length; i++){
         let tr = tbody.append('tr')

        for(let j = 0; j < columns.length; j++){

          let nameCell = ""
          let colorClass = "invalidCell"
       
            if(TESTJSON[i][columns[j]]){
              colorClass = "validCell"
            }
            
            if(j === 0){
              nameCell = "Name"
              colorClass = ""
            }
          
            tr.append('td')
              .attr("class", "heatCell" + nameCell + " " + colorClass )
              .text(TESTJSON[i][columns[j]])
                            
        }
      }
   

  }

  render() { 
 //set headers
        // for each selected facility
        // get the six (if selected) headers
        // show data or show a red (NOT AVAILABLE)
    return (
      <Table className="heatMap" width={0}>
    
      </Table>
    );
  } 
}

export default Dashboard;
