import React, { Component } from 'react';
import MapContent from './MapContent';
import * as d3 from "d3";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Table } from 'reactstrap';
import './Dashboard.css'
const  DATA = import('../data/data_index_1_3_sample.json')

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
